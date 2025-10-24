<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 1: 中継機の設置</h2>
		<div class="badge bg-primary mb-3">手順 1/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-geo-alt me-2"></i>
				中継機本体を親機に近い位置で設置する
			</h5>
			<div class="alert alert-info mt-3">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>ポイント：</strong>
				設定時は親機の近くに設置します。設定完了後に最適な位置に移動します。
			</div>
			<ul class="mt-3">
				<li>親機から2〜3メートル程度の位置に中継機を設置してください</li>
				<li>電源コンセントに接続し、電源を入れてください</li>
				<li>中継機のランプが点灯するまで待ちます</li>
			</ul>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={() => goto(`${base}/relay-extender-step2`)}
		>
			設置完了・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
