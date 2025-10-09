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
			{#if state.modelNumber || state.productType || state.selectedUsage || state.newDeviceSmartMovingSupported || state.oldDeviceSmartMovingSupported || state.previouslyUsedSmartMoving !== null}
				<div class="card mt-3">
					<div class="card-body">
						<h6 class="card-title">現在の状態</h6>
						<div class="d-flex flex-wrap gap-2 align-items-center">
							{#if state.modelNumber}
								<span class="badge bg-secondary">型番: {state.modelNumber}</span>
							{/if}
							{#if state.productType}
								<span class="badge bg-secondary">タイプ: {state.productType}</span>
							{/if}
							{#if state.selectedUsage}
								<span class="badge bg-secondary">用途: {state.selectedUsage}</span>
							{/if}
							{#if state.newDeviceSmartMovingSupported}
								<span class="badge bg-secondary">
									新機器: {state.newDeviceSmartMovingSupported}
								</span>
							{/if}
							{#if state.oldModelNumber}
								<span class="badge bg-secondary">旧型番: {state.oldModelNumber}</span>
							{/if}
							{#if state.oldDeviceSmartMovingSupported}
								<span class="badge bg-secondary">
									旧機器: {state.oldDeviceSmartMovingSupported}
								</span>
							{/if}
							{#if state.previouslyUsedSmartMoving !== null}
								<span class="bg-secondary">
									前回スマート引っ越し: {state.previouslyUsedSmartMoving ? '使用' : '未使用'}
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
