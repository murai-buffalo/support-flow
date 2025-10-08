<script lang="ts">
	import { onMount } from 'svelte';

	// フロー状態管理
	let currentStep = 'start';
	let selectedProduct = '';
	let selectedUsage = '';
	let smartMovingSupported = null;
	let previouslyUsedSmartMoving = null;

	// Bootstrap JSを動的にインポート
	onMount(async () => {
		if (typeof window !== 'undefined') {
			await import('bootstrap/dist/js/bootstrap.bundle.min.js');
		}
	});

	// フロー制御関数
	function goToStep(step: string) {
		currentStep = step;
	}

	function handleProductInput() {
		if (selectedProduct === '親機') {
			currentStep = 'usage';
		} else if (selectedProduct === '子機') {
			currentStep = 'relay';
		}
	}

	function handleUsageSelection(usage: string) {
		selectedUsage = usage;
		if (usage === '今までのWi-Fiルーターと交換') {
			currentStep = 'smartMovingSupport';
		} else if (usage === '故障して買い替え') {
			currentStep = 'previousSmartMoving';
		} else if (usage === '新規に設置') {
			currentStep = 'mainUnitSetup';
		} else if (usage === '中継機として使用') {
			currentStep = 'relay';
		}
	}

	function handleSmartMovingSupport(supported: boolean) {
		smartMovingSupported = supported;
		if (supported) {
			currentStep = 'smartMoving';
		} else {
			currentStep = 'wirelessMoving';
		}
	}

	function handlePreviousSmartMoving(used: boolean) {
		previouslyUsedSmartMoving = used;
		if (used) {
			currentStep = 'smartMoving';
		} else {
			currentStep = 'mainUnitSetup';
		}
	}

	function restart() {
		currentStep = 'start';
		selectedProduct = '';
		selectedUsage = '';
		smartMovingSupported = null;
		previouslyUsedSmartMoving = null;
	}
</script>

<div class="container mt-4">
	<div class="row justify-content-center">
		<div class="col-lg-8">
			<div class="card shadow">
				<div class="card-header bg-primary text-white">
					<h1 class="card-title mb-0">
						<i class="bi bi-router"></i>
						Wi-Fi ルーター サポートフロー
					</h1>
				</div>
				<div class="card-body">
					<!-- スタート画面 -->
					{#if currentStep === 'start'}
						<div class="text-center">
							<h2 class="mb-4">サポートを開始します</h2>
							<p class="lead mb-4">
								Wi-Fiルーターの設定や問題解決をお手伝いします。<br />
								まずは、お困りの内容を選択してください。
							</p>
							<div class="row g-3">
								<div class="col-md-6">
									<button
										class="btn btn-outline-primary btn-lg w-100 h-100"
										on:click={() => goToStep('productSelection')}
									>
										<i class="bi bi-gear-fill d-block mb-2" style="font-size: 2rem;"></i>
										商品の選び方・仕様
									</button>
								</div>
								<div class="col-md-6">
									<button
										class="btn btn-outline-success btn-lg w-100 h-100"
										on:click={() => goToStep('productInput')}
									>
										<i class="bi bi-tools d-block mb-2" style="font-size: 2rem;"></i>
										設定方法
									</button>
								</div>
							</div>
						</div>

						<!-- 商品選択画面 -->
					{:else if currentStep === 'productSelection'}
						<div class="text-center">
							<h2 class="mb-4">商品の選び方・仕様</h2>
							<div class="alert alert-info">
								<i class="bi bi-info-circle"></i>
								商品の選び方や仕様についての情報をご案内します。
							</div>
							<button class="btn btn-secondary" on:click={restart}>最初に戻る</button>
						</div>

						<!-- 製品入力画面 -->
					{:else if currentStep === 'productInput'}
						<div>
							<h2 class="mb-4">購入製品を入力してください</h2>
							<div class="mb-4">
								<label class="form-label">製品タイプを選択してください：</label>
								<div class="row g-3">
									<div class="col-md-6">
										<div class="form-check">
											<input
												class="form-check-input"
												type="radio"
												name="product"
												id="product-main"
												value="親機"
												bind:group={selectedProduct}
											/>
											<label class="form-check-label" for="product-main">
												<strong>親機</strong>（メインルーター）
											</label>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-check">
											<input
												class="form-check-input"
												type="radio"
												name="product"
												id="product-sub"
												value="子機"
												bind:group={selectedProduct}
											/>
											<label class="form-check-label" for="product-sub">
												<strong>子機</strong>（サブユニット）
											</label>
										</div>
									</div>
								</div>
							</div>
							<div class="d-flex gap-2">
								<button
									class="btn btn-primary"
									disabled={!selectedProduct}
									on:click={handleProductInput}
								>
									次へ
								</button>
								<button class="btn btn-secondary" on:click={restart}>最初に戻る</button>
							</div>
						</div>

						<!-- 利用方法選択画面 -->
					{:else if currentStep === 'usage'}
						<div>
							<h2 class="mb-4">利用方法を選択してください</h2>
							<div class="row g-3">
								<div class="col-md-6">
									<button
										class="btn btn-outline-info btn-lg w-100 h-100"
										on:click={() => handleUsageSelection('今までのWi-Fiルーターと交換')}
									>
										<i class="bi bi-arrow-repeat d-block mb-2" style="font-size: 1.5rem;"></i>
										今までのWi-Fiルーターと交換
									</button>
								</div>
								<div class="col-md-6">
									<button
										class="btn btn-outline-warning btn-lg w-100 h-100"
										on:click={() => handleUsageSelection('故障して買い替え')}
									>
										<i class="bi bi-exclamation-triangle d-block mb-2" style="font-size: 1.5rem;"
										></i>
										故障して買い替え
									</button>
								</div>
								<div class="col-md-6">
									<button
										class="btn btn-outline-success btn-lg w-100 h-100"
										on:click={() => handleUsageSelection('新規に設置')}
									>
										<i class="bi bi-plus-circle d-block mb-2" style="font-size: 1.5rem;"></i>
										新規に設置
									</button>
								</div>
								<div class="col-md-6">
									<button
										class="btn btn-outline-primary btn-lg w-100 h-100"
										on:click={() => handleUsageSelection('中継機として使用')}
									>
										<i class="bi bi-broadcast d-block mb-2" style="font-size: 1.5rem;"></i>
										中継機として使用
									</button>
								</div>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>

						<!-- スマート引っ越し対応確認 -->
					{:else if currentStep === 'smartMovingSupport'}
						<div>
							<h2 class="mb-4">スマート引っ越し対応確認</h2>
							<p class="lead mb-4">
								お使いの古いWi-Fiルーターは「スマート引っ越し」機能に対応していますか？
							</p>
							<div class="alert alert-info">
								<i class="bi bi-info-circle"></i>
								スマート引っ越し機能があると、設定が簡単に移行できます。
							</div>
							<div class="d-flex gap-2">
								<button
									class="btn btn-success btn-lg"
									on:click={() => handleSmartMovingSupport(true)}
								>
									<i class="bi bi-check-circle"></i>
									はい、対応しています
								</button>
								<button
									class="btn btn-danger btn-lg"
									on:click={() => handleSmartMovingSupport(false)}
								>
									<i class="bi bi-x-circle"></i>
									いいえ、対応していません
								</button>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>

						<!-- 前回スマート引っ越し使用確認 -->
					{:else if currentStep === 'previousSmartMoving'}
						<div>
							<h2 class="mb-4">前回の設定確認</h2>
							<p class="lead mb-4">前回「スマート引っ越し」機能を使用しましたか？</p>
							<div class="d-flex gap-2">
								<button
									class="btn btn-success btn-lg"
									on:click={() => handlePreviousSmartMoving(true)}
								>
									<i class="bi bi-check-circle"></i>
									はい、使用しました
								</button>
								<button
									class="btn btn-danger btn-lg"
									on:click={() => handlePreviousSmartMoving(false)}
								>
									<i class="bi bi-x-circle"></i>
									いいえ、使用していません
								</button>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>

						<!-- スマート引っ越し設定 -->
					{:else if currentStep === 'smartMoving'}
						<div class="text-center">
							<h2 class="mb-4">スマート引っ越し設定</h2>
							<div class="alert alert-success">
								<i class="bi bi-check-circle-fill"></i>
								<h4>スマート引っ越し機能を使用します</h4>
								<p class="mb-0">
									古いWi-Fiルーターの設定を新しいルーターに自動的に移行します。
									手順に従って設定を進めてください。
								</p>
							</div>
							<div class="card">
								<div class="card-body">
									<h5>設定手順</h5>
									<ol class="text-start">
										<li>古いWi-Fiルーターの電源を入れたままにします</li>
										<li>新しいルーターの「スマート引っ越し」ボタンを押します</li>
										<li>画面の指示に従って設定を完了します</li>
									</ol>
								</div>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>

						<!-- 無線引っ越し設定 -->
					{:else if currentStep === 'wirelessMoving'}
						<div class="text-center">
							<h2 class="mb-4">無線引っ越し設定</h2>
							<div class="alert alert-warning">
								<i class="bi bi-exclamation-triangle-fill"></i>
								<h4>無線引っ越し機能を使用します</h4>
								<p class="mb-0">
									手動で設定を移行します。既存のWi-Fi設定を新しいルーターに設定してください。
								</p>
							</div>
							<div class="card">
								<div class="card-body">
									<h5>設定手順</h5>
									<ol class="text-start">
										<li>古いWi-Fiルーターの設定情報（SSID、パスワード）を確認します</li>
										<li>新しいルーターの設定画面にアクセスします</li>
										<li>同じSSIDとパスワードを新しいルーターに設定します</li>
									</ol>
								</div>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>

						<!-- 親機設定 -->
					{:else if currentStep === 'mainUnitSetup'}
						<div class="text-center">
							<h2 class="mb-4">親機設定</h2>
							<div class="alert alert-primary">
								<i class="bi bi-gear-fill"></i>
								<h4>親機の初期設定を行います</h4>
								<p class="mb-0">新しいWi-Fiルーターの基本設定を行います。</p>
							</div>
							<div class="card">
								<div class="card-body">
									<h5>設定手順</h5>
									<ol class="text-start">
										<li>ルーターをインターネット回線に接続します</li>
										<li>電源を入れて、設定画面にアクセスします</li>
										<li>インターネット接続設定を行います</li>
										<li>Wi-Fi設定（SSID、パスワード）を設定します</li>
									</ol>
								</div>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>

						<!-- 中継設定 -->
					{:else if currentStep === 'relay'}
						<div class="text-center">
							<h2 class="mb-4">中継設定</h2>
							<div class="alert alert-info">
								<i class="bi bi-broadcast"></i>
								<h4>中継機として設定します</h4>
								<p class="mb-0">
									既存のWi-Fiネットワークの電波を中継して、カバーエリアを拡大します。
								</p>
							</div>
							<div class="card">
								<div class="card-body">
									<h5>設定手順</h5>
									<ol class="text-start">
										<li>中継機の電源を入れます</li>
										<li>親機のWPSボタンを押します</li>
										<li>中継機のWPSボタンを押します</li>
										<li>接続が完了するまで待ちます</li>
									</ol>
								</div>
							</div>
							<button class="btn btn-secondary mt-3" on:click={restart}>最初に戻る</button>
						</div>
					{/if}
				</div>
			</div>

			<!-- フロー状態表示 -->
			{#if currentStep !== 'start'}
				<div class="card mt-3">
					<div class="card-body">
						<h6 class="card-title">現在の状態</h6>
						<div class="d-flex flex-wrap gap-2">
							{#if selectedProduct}
								<span class="badge bg-primary">製品: {selectedProduct}</span>
							{/if}
							{#if selectedUsage}
								<span class="badge bg-success">用途: {selectedUsage}</span>
							{/if}
							{#if smartMovingSupported !== null}
								<span class="badge bg-info">
									スマート引っ越し対応: {smartMovingSupported ? 'あり' : 'なし'}
								</span>
							{/if}
							{#if previouslyUsedSmartMoving !== null}
								<span class="badge bg-warning">
									前回スマート引っ越し使用: {previouslyUsedSmartMoving ? 'あり' : 'なし'}
								</span>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.btn) {
		transition: all 0.2s ease-in-out;
	}

	:global(.btn:hover) {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	:global(.card) {
		border: none;
		border-radius: 12px;
	}

	:global(.card-header) {
		border-radius: 12px 12px 0 0 !important;
	}

	:global(.alert) {
		border-radius: 8px;
	}
</style>
