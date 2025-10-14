<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { MODEL_LIST, hasEasyMeshFeature } from '$lib/data/models';
	import { flowStore } from '$lib/stores/flow';

	type DeviceType = 'buffalo-with-model' | 'buffalo-unknown' | 'other' | '';

	let deviceType = $state<DeviceType>('');
	let oldModelNumber = $state('');
	let suggestions = $state<string[]>([]);
	let showSuggestions = $state(false);
	let selectedSuggestionIndex = $state(-1);

	// EasyMesh対応状況を計算
	let easyMeshStatus = $derived.by(() => {
		if (!deviceType) {
			return { isSupported: false, message: '' };
		}

		if (deviceType === 'buffalo-with-model') {
			if (!oldModelNumber.trim()) {
				return { isSupported: false, message: '' };
			}
			const isSupported = hasEasyMeshFeature(oldModelNumber);
			return {
				isSupported: isSupported,
				message: isSupported ? 'EasyMesh対応：あり' : 'EasyMesh対応：なし'
			};
		} else if (deviceType === 'buffalo-unknown') {
			return {
				isSupported: false,
				message: 'EasyMesh対応：なし（型番不明）'
			};
		} else {
			return {
				isSupported: false,
				message: 'EasyMesh対応：なし（他社製品）'
			};
		}
	});

	function handleDeviceTypeChange(type: DeviceType) {
		deviceType = type;
		// 型番入力以外の選択肢の場合、型番をクリア
		if (type !== 'buffalo-with-model') {
			oldModelNumber = '';
			suggestions = [];
			showSuggestions = false;
		}
	}

	function handleModelInput(event: Event) {
		const input = (event.target as HTMLInputElement).value;
		oldModelNumber = input;

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
		oldModelNumber = model;
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

	function handleNext() {
		if (!deviceType) return;

		// バッファロー製品（型番入力）の場合は型番も必須
		if (deviceType === 'buffalo-with-model' && !oldModelNumber.trim()) return;

		// 旧機器の情報を保存
		flowStore.setOldDevice(deviceType, oldModelNumber);

		// 新機器と旧機器のEasyMesh対応状況を確認
		const newDeviceSupportsEasyMesh = hasEasyMeshFeature($flowStore.modelNumber || '');
		let oldDeviceSupportsEasyMesh = false;

		if (deviceType === 'buffalo-with-model') {
			oldDeviceSupportsEasyMesh = hasEasyMeshFeature(oldModelNumber);
			const statusMessage = oldDeviceSupportsEasyMesh ? 'EasyMesh対応：あり' : 'EasyMesh対応：なし';
			flowStore.setOldDeviceSmartMovingSupported(statusMessage);
		} else {
			const statusMessage =
				deviceType === 'buffalo-unknown'
					? 'EasyMesh対応：なし（型番不明）'
					: 'EasyMesh対応：なし（他社製品）';
			flowStore.setOldDeviceSmartMovingSupported(statusMessage);
		}

		// 両方がEasyMesh対応ならEasyMesh設定、そうでなければ中継機設定
		if (newDeviceSupportsEasyMesh && oldDeviceSupportsEasyMesh) {
			goto(`${base}/easymesh-setup`);
		} else {
			goto(`${base}/relay-setup`);
		}
	}
</script>

<FlowLayout>
	<div>
		<h2 class="mb-4">既存のWi-Fi機器について教えてください</h2>

		<div class="alert alert-info mb-4">
			<i class="bi bi-info-circle"></i>
			両方の機器がEasyMesh対応の場合、自動でメッシュネットワークを構築できます。
		</div>

		<!-- 新機器のEasyMesh対応状況表示 -->
		<div class="card mb-4">
			<div class="card-header">
				<i class="bi bi-router"></i> 新機器の対応状況
			</div>
			<div class="card-body">
				<p class="mb-1">
					<strong>{$flowStore.modelNumber}</strong>
				</p>
				<span
					class="badge {hasEasyMeshFeature($flowStore.modelNumber || '')
						? 'bg-success'
						: 'bg-secondary'}"
				>
					EasyMesh: {hasEasyMeshFeature($flowStore.modelNumber || '') ? '対応' : '非対応'}
				</span>
			</div>
		</div>

		<!-- デバイスタイプ選択 -->
		<div class="mb-4">
			<fieldset>
				<legend class="form-label">既存機器のタイプを選択してください</legend>
				<div class="row g-3">
					<!-- バッファロー製品（型番入力） -->
					<div class="col-12">
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="deviceType"
								id="device-buffalo-with-model"
								value="buffalo-with-model"
								checked={deviceType === 'buffalo-with-model'}
								onchange={() => handleDeviceTypeChange('buffalo-with-model')}
							/>
							<label class="form-check-label" for="device-buffalo-with-model">
								<strong>バッファロー製品</strong>
								<div class="small text-muted">型番がわかる場合はこちら</div>
							</label>
						</div>

						<div class="mt-2 position-relative">
							<input
								type="text"
								class="form-control"
								id="old-model-input"
								placeholder="例: WSR-1166DHP4"
								value={oldModelNumber}
								oninput={handleModelInput}
								onkeydown={handleKeyDown}
								onblur={handleBlur}
								autocomplete="off"
								disabled={deviceType !== 'buffalo-with-model'}
							/>
							<div class="form-text small">型番を入力してください（3文字以上で候補を表示）</div>

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
					</div>

					<!-- バッファロー製品（型番不明） -->
					<div class="col-12">
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="deviceType"
								id="device-buffalo-unknown"
								value="buffalo-unknown"
								checked={deviceType === 'buffalo-unknown'}
								onchange={() => handleDeviceTypeChange('buffalo-unknown')}
							/>
							<label class="form-check-label" for="device-buffalo-unknown">
								<strong>バッファロー製品（型番不明）</strong>
								<div class="small text-muted">型番がわからない場合はこちら</div>
							</label>
						</div>
					</div>

					<!-- 他社製品 -->
					<div class="col-12">
						<div class="form-check">
							<input
								class="form-check-input"
								type="radio"
								name="deviceType"
								id="device-other"
								value="other"
								checked={deviceType === 'other'}
								onchange={() => handleDeviceTypeChange('other')}
							/>
							<label class="form-check-label" for="device-other">
								<strong>他社製品</strong>
								<div class="small text-muted">バッファロー以外のメーカー製品</div>
							</label>
						</div>
					</div>
				</div>
			</fieldset>
		</div>

		<!-- 次へボタン -->
		<div class="d-flex gap-2">
			<button
				class="btn btn-primary"
				disabled={!deviceType || (deviceType === 'buffalo-with-model' && !oldModelNumber.trim())}
				onclick={handleNext}
			>
				次へ
			</button>
		</div>

		<!-- EasyMesh対応状況の表示 -->
		{#if easyMeshStatus.message}
			<div class="alert mt-3 {easyMeshStatus.isSupported ? 'alert-success' : 'alert-warning'}">
				<i class="bi {easyMeshStatus.isSupported ? 'bi-check-circle' : 'bi-exclamation-triangle'}"
				></i>
				{easyMeshStatus.message}
				{#if !easyMeshStatus.isSupported}
					<br />
					従来の中継機設定での接続となります。
				{/if}
			</div>
		{/if}
	</div>
</FlowLayout>

<style>
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
