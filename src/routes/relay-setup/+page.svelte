<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継機接続設定</h2>
		<div class="alert alert-info">
			<i class="bi bi-wifi me-2"></i>
			従来の中継機として設定します
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-info-circle me-2"></i>
				中継機設定について
			</h5>

			<p class="mt-3">
				中継機として使用することで、既存のWi-Fiルーター（親機）の電波を延長し、Wi-Fi範囲を拡大できます。
			</p>

			<div class="alert alert-success mt-4">
				<i class="bi bi-check-circle me-2"></i>
				<strong>このガイドでサポートする内容：</strong>
				<ul class="mb-0 mt-2">
					<li>中継機の準備と初期設定</li>
					<li>親機への接続（WPSまたは手動）</li>
					<li>接続確認とトラブルシューティング</li>
					<li>最適な設置位置の調整</li>
				</ul>
			</div>

			<div class="alert alert-warning mt-3">
				<i class="bi bi-clock me-2"></i>
				<strong>所要時間：</strong>約5〜10分
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg me-3"
			on:click={() => goto(`${base}/relay-extender-start`)}
		>
			詳細な手順を見る
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
		<button
			type="button"
			class="btn btn-outline-secondary"
			on:click={() => goto(`${base}/relay-connection-type`)}
		>
			戻る
		</button>
	</div>
</FlowLayout>
