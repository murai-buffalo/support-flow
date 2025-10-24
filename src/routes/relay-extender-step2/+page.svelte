<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 2: EasyMeshスイッチをOFFに</h2>
		<div class="badge bg-primary mb-3">手順 2/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-toggle-off me-2"></i>
				EasyMeshスイッチをOFFにする
			</h5>
			<div class="alert alert-warning mt-3">
				<i class="bi bi-exclamation-triangle me-2"></i>
				<strong>重要：</strong>
				中継機モードで使用する場合は、EasyMeshスイッチを必ずOFFにしてください。
			</div>
			<ol class="mt-3">
				<li>中継機本体のEasyMeshスイッチを確認します</li>
				<li>スイッチをOFF側にスライドします</li>
				<li>スイッチがOFFの位置にあることを確認します</li>
			</ol>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={() => goto(`${base}/relay-extender-step3`)}
		>
			スイッチOFF完了・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
