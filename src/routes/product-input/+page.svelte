<script lang="ts">
	import { goto } from '$app/navigation';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { MODEL_LIST, determineProductType } from '$lib/data/models';
	import { flowStore } from '$lib/stores/flow';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';

	let modelNumber = $state('');
	let productType = $state('');
	let inputMethod = $state<'manual' | 'qr'>('manual');
	let isScanning = $state(false);
	let qrScanner: Html5Qrcode | null = null;
	let scanError = $state('');
	let cameras = $state<{ id: string; label: string }[]>([]);
	let selectedCamera = $state('');
	let cameraPermissionError = $state('');
	let suggestions = $state<string[]>([]);
	let showSuggestions = $state(false);
	let selectedSuggestionIndex = $state(-1);

	onMount(async () => {
		// HTTPSでない場合の警告
		if (
			typeof window !== 'undefined' &&
			window.location.protocol !== 'https:' &&
			window.location.hostname !== 'localhost'
		) {
			cameraPermissionError = 'カメラを使用するにはHTTPS接続が必要です。手動入力をご利用ください。';
			return;
		}

		// 利用可能なカメラを取得
		try {
			const devices = await Html5Qrcode.getCameras();
			if (devices.length === 0) {
				cameraPermissionError =
					'カメラが見つかりません。デバイスにカメラが接続されているか、ブラウザのカメラ権限を確認してください。';
			} else {
				cameras = devices.map((device) => ({
					id: device.id,
					label: device.label || `カメラ ${device.id}`
				}));
				// 背面カメラを優先（通常、最後のカメラが背面カメラ）
				selectedCamera = cameras[cameras.length - 1].id;
			}
		} catch (err: any) {
			console.error('カメラの取得に失敗しました:', err);
			if (err.name === 'NotAllowedError' || err.message?.includes('Permission')) {
				cameraPermissionError =
					'カメラへのアクセスが拒否されました。ブラウザの設定でカメラの使用を許可してください。';
			} else if (err.name === 'NotFoundError') {
				cameraPermissionError =
					'カメラが見つかりません。デバイスにカメラが接続されているか確認してください。';
			} else {
				cameraPermissionError = `カメラの初期化に失敗しました: ${err.message || 'エラー詳細不明'}`;
			}
		}
	});

	onDestroy(() => {
		stopScanning();
	});

	async function startScanning() {
		if (!selectedCamera) {
			scanError = 'カメラが選択されていません';
			return;
		}

		try {
			scanError = '';
			qrScanner = new Html5Qrcode('qr-reader');

			await qrScanner.start(
				selectedCamera,
				{
					fps: 10,
					qrbox: { width: 250, height: 250 }
				},
				(decodedText) => {
					// QRコードを読み取ったら型番を抽出
					const extractedModel = extractModelNumber(decodedText);

					// 型番が認識可能かチェック
					const detectedType = determineProductType(extractedModel);

					if (detectedType) {
						// 認識できた場合は型番をセットしてスキャン停止
						modelNumber = extractedModel;
						stopScanning();
					} else {
						// 認識できない場合はエラーメッセージを表示して継続スキャン
						scanError = `型番 "${extractedModel}" は認識できません。対応製品のQRコードを読み取ってください。`;
						// 3秒後にエラーメッセージをクリア
						setTimeout(() => {
							if (scanError.includes(extractedModel)) {
								scanError = '';
							}
						}, 3000);
					}
				},
				(errorMessage) => {
					// エラーは無視（スキャン中は常にエラーが出る）
				}
			);

			isScanning = true;
		} catch (err) {
			console.error('QRコードスキャンの開始に失敗しました:', err);
			scanError = 'カメラの起動に失敗しました';
			isScanning = false;
		}
	}

	async function stopScanning() {
		if (qrScanner && isScanning) {
			try {
				await qrScanner.stop();
				qrScanner.clear();
			} catch (err) {
				console.error('スキャンの停止に失敗しました:', err);
			}
		}
		isScanning = false;
		qrScanner = null;
	}

	function extractModelNumber(qrText: string): string {
		// QRコードから型番を抽出
		// 形式: "p=XXXXXX&" のXXXXXX部分が型番
		const match = qrText.match(/p=([^&]+)&/);
		if (match) {
			return match[1];
		}
		// マッチしない場合は、QRコード全体を型番として扱う
		return qrText;
	}

	function handleNext() {
		if (!modelNumber || !productType) return;

		flowStore.setModelNumber(modelNumber);
		flowStore.setProductType(productType);

		if (productType === '親機') {
			goto('/usage');
		} else if (productType === '中継機') {
			goto('/relay');
		}
	}

	function switchInputMethod(method: 'manual' | 'qr') {
		if (inputMethod === 'qr' && isScanning) {
			stopScanning();
		}
		inputMethod = method;
		suggestions = [];
		showSuggestions = false;
	}

	function handleModelInput(event: Event) {
		const input = (event.target as HTMLInputElement).value;
		modelNumber = input;

		// 3文字以上入力されたら候補を表示
		if (input.length >= 3) {
			const upperInput = input.toUpperCase();
			suggestions = MODEL_LIST.filter((model) => model.toUpperCase().startsWith(upperInput));
			showSuggestions = suggestions.length > 0;
			selectedSuggestionIndex = -1;
		} else {
			suggestions = [];
			showSuggestions = false;
		}
	}

	function selectSuggestion(model: string) {
		modelNumber = model;
		suggestions = [];
		showSuggestions = false;
		selectedSuggestionIndex = -1;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!showSuggestions || suggestions.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
				break;
			case 'Enter':
				event.preventDefault();
				if (selectedSuggestionIndex >= 0) {
					selectSuggestion(suggestions[selectedSuggestionIndex]);
				}
				break;
			case 'Escape':
				showSuggestions = false;
				selectedSuggestionIndex = -1;
				break;
		}
	}

	function handleBlur() {
		// 少し遅延させて、候補クリックを可能にする
		setTimeout(() => {
			showSuggestions = false;
			selectedSuggestionIndex = -1;
		}, 200);
	}

	// 型番が入力されたら自動的に製品タイプを判定
	$effect(() => {
		if (modelNumber && modelNumber.trim().length >= 3) {
			// 3文字以上の場合のみ判定
			const detectedType = determineProductType(modelNumber);
			productType = detectedType; // 判定結果をセット（空文字列の可能性あり）
		} else {
			// 3文字未満または空の場合はリセット
			productType = '';
		}
	});
</script>

<FlowLayout>
	<div>
		<h2 class="mb-4">購入製品を入力してください</h2>

		<!-- 入力方法選択 -->
		<div class="mb-4">
			<div class="btn-group w-100" role="group">
				<button
					type="button"
					class="btn {inputMethod === 'manual' ? 'btn-primary' : 'btn-outline-primary'}"
					onclick={() => switchInputMethod('manual')}
				>
					<i class="bi bi-keyboard"></i>
					手動入力
				</button>
				<button
					type="button"
					class="btn {inputMethod === 'qr' ? 'btn-primary' : 'btn-outline-primary'}"
					onclick={() => switchInputMethod('qr')}
				>
					<i class="bi bi-qr-code-scan"></i>
					QRコード読み取り
				</button>
			</div>
		</div>

		{#if inputMethod === 'manual'}
			<!-- 手動入力 -->
			<div class="mb-4 position-relative">
				<label for="model-input" class="form-label">型番を入力してください</label>
				<input
					type="text"
					class="form-control"
					id="model-input"
					placeholder="例: WSR-5400AX6S"
					value={modelNumber}
					oninput={handleModelInput}
					onkeydown={handleKeyDown}
					onblur={handleBlur}
					autocomplete="off"
				/>
				<div class="form-text">
					製品本体または箱に記載されている型番を入力してください（3文字以上で候補を表示）
				</div>

				<!-- オートコンプリート候補リスト -->
				{#if showSuggestions && suggestions.length > 0}
					<div class="autocomplete-suggestions">
						{#each suggestions as suggestion, index}
							<button
								type="button"
								class="autocomplete-item {index === selectedSuggestionIndex ? 'active' : ''}"
								onclick={() => selectSuggestion(suggestion)}
							>
								{suggestion}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<!-- QRコード読み取り -->
			<div class="mb-4">
				{#if cameraPermissionError}
					<div class="alert alert-warning">
						<i class="bi bi-exclamation-triangle"></i>
						<strong>カメラが利用できません</strong>
						<p class="mb-0 mt-2">{cameraPermissionError}</p>
						{#if typeof window !== 'undefined' && window.location.protocol !== 'https:'}
							<hr />
							<p class="mb-0">
								<small>
									<strong>解決方法:</strong><br />
									• HTTPSでアクセスする<br />
									• または手動入力をご利用ください
								</small>
							</p>
						{/if}
					</div>
				{:else if cameras.length === 0}
					<div class="alert alert-warning">
						<i class="bi bi-exclamation-triangle"></i>
						カメラが見つかりません。手動入力をご利用ください。
					</div>
				{:else}
					<div class="mb-3">
						<label for="camera-select" class="form-label">カメラを選択</label>
						<select class="form-select" id="camera-select" bind:value={selectedCamera}>
							{#each cameras as camera}
								<option value={camera.id}>{camera.label}</option>
							{/each}
						</select>
					</div>

					{#if !isScanning}
						<button class="btn btn-success btn-lg w-100 mb-3" onclick={startScanning}>
							<i class="bi bi-camera"></i>
							スキャンを開始
						</button>
					{:else}
						<button class="btn btn-danger btn-lg w-100 mb-3" onclick={stopScanning}>
							<i class="bi bi-stop-circle"></i>
							スキャンを停止
						</button>
					{/if}

					{#if scanError}
						<div class="alert alert-danger">
							<i class="bi bi-exclamation-circle"></i>
							{scanError}
						</div>
					{/if}

					<div id="qr-reader" class="qr-reader-container"></div>

					{#if modelNumber}
						<div class="alert alert-success mt-3">
							<i class="bi bi-check-circle"></i>
							読み取り成功: <strong>{modelNumber}</strong>
						</div>
					{/if}
				{/if}
			</div>
		{/if}

		<!-- 製品タイプ自動判別結果 -->
		{#if modelNumber && modelNumber.trim().length >= 3}
			<div class="mb-4">
				{#if productType}
					<div class="alert alert-info">
						<h5 class="alert-heading mb-2">
							<i class="bi bi-info-circle"></i>
							製品タイプ判別結果
						</h5>
						<p class="mb-2">
							型番: <strong class="text-primary">{modelNumber}</strong>
						</p>
						<p class="mb-0">
							製品タイプ: <strong class="text-success">{productType}</strong>
							{#if productType === '親機'}
								<span class="text-muted">（ルーター）</span>
							{:else if productType === '中継機'}
								<span class="text-muted">（リピーター）</span>
							{/if}
						</p>
					</div>
				{:else}
					<div class="alert alert-warning">
						<i class="bi bi-exclamation-triangle"></i>
						<strong>型番を判別できませんでした</strong>
						<p class="mb-0 mt-2">
							型番: <strong>{modelNumber}</strong><br />
							この型番は認識されていません。型番が正しいか確認してください。
						</p>
					</div>
				{/if}
			</div>

			<div class="d-flex gap-2">
				<button
					class="btn btn-primary"
					disabled={!modelNumber || !productType}
					onclick={handleNext}
				>
					次へ
				</button>
			</div>
		{/if}
	</div>
</FlowLayout>

<style>
	.qr-reader-container {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		border: 2px solid #dee2e6;
		border-radius: 8px;
		overflow: hidden;
	}

	:global(#qr-reader video) {
		width: 100%;
		height: auto;
	}

	:global(#qr-reader__dashboard) {
		display: none !important;
	}

	.btn-group {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.autocomplete-suggestions {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 1000;
		max-height: 300px;
		overflow-y: auto;
		background-color: white;
		border: 1px solid #ced4da;
		border-radius: 0.375rem;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		margin-top: 0.25rem;
	}

	.autocomplete-item {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		text-align: left;
		border: none;
		background-color: white;
		cursor: pointer;
		transition: background-color 0.15s ease-in-out;
		font-family: monospace;
		font-size: 0.95rem;
	}

	.autocomplete-item:hover,
	.autocomplete-item.active {
		background-color: #0d6efd;
		color: white;
	}

	.autocomplete-item:not(:last-child) {
		border-bottom: 1px solid #e9ecef;
	}
</style>
