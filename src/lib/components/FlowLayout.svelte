<script lang="ts">
	import { goto } from '$app/navigation';
	import { flowStore } from '$lib/stores/flow';

	let { children } = $props();
	const state = $derived($flowStore);

	function restart() {
		flowStore.reset();
		goto('/');
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
					{@render children()}
				</div>
			</div>

			<!-- フロー状態表示 -->
			{#if state.modelNumber || state.selectedProduct || state.selectedUsage || state.smartMovingSupported !== null || state.previouslyUsedSmartMoving !== null}
				<div class="card mt-3">
					<div class="card-body">
						<h6 class="card-title">現在の状態</h6>
						<div class="d-flex flex-wrap gap-2 align-items-center">
							{#if state.modelNumber}
								<span class="badge bg-secondary">型番: {state.modelNumber}</span>
							{/if}
							{#if state.productType}
								<span class="badge bg-primary">タイプ: {state.productType}</span>
							{/if}
							{#if state.selectedProduct}
								<span class="badge bg-primary">製品: {state.selectedProduct}</span>
							{/if}
							{#if state.selectedUsage}
								<span class="badge bg-success">用途: {state.selectedUsage}</span>
							{/if}
							{#if state.smartMovingSupported !== null}
								<span class="badge bg-info">
									スマート引っ越し対応: {state.smartMovingSupported ? 'あり' : 'なし'}
								</span>
							{/if}
							{#if state.previouslyUsedSmartMoving !== null}
								<span class="badge bg-warning">
									前回スマート引っ越し使用: {state.previouslyUsedSmartMoving ? 'あり' : 'なし'}
								</span>
							{/if}
							<button class="btn btn-sm btn-outline-secondary ms-auto" onclick={restart}>
								最初に戻る
							</button>
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
