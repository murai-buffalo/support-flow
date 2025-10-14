<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { hasEasyMeshFeature } from '$lib/data/models';
	import { flowStore } from '$lib/stores/flow';

	function handleStart() {
		const state = $flowStore;

		// 中継機自体のEasyMesh対応状況をチェック
		const newDeviceSupportsEasyMesh = hasEasyMeshFeature(state.modelNumber);

		if (newDeviceSupportsEasyMesh) {
			// EasyMesh対応の場合は、EasyMesh用の旧機器確認画面へ
			goto(`${base}/old-router-input-easymesh`);
		} else {
			// EasyMesh非対応の場合は、直接中継機設定へ
			goto(`${base}/relay-setup`);
		}
	}
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継機として使用</h2>
		<p class="text-muted mb-4">既存のWi-Fi親機の電波を延長して、Wi-Fi範囲を拡大します。</p>
	</div>

	<div class="row justify-content-center">
		<div class="col-md-8">
			<div class="card">
				<div class="card-body text-center">
					<i class="bi bi-wifi fs-1 text-info mb-3"></i>
					<h5 class="card-title">中継機設定を開始</h5>
					<p class="card-text">お使いの機器に応じて、最適な接続方法をご案内します。</p>
					<button type="button" class="btn btn-primary btn-lg" on:click={handleStart}>
						設定を開始する
						<i class="bi bi-arrow-right ms-2"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</FlowLayout>
