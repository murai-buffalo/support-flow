<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">接続エラー - 再試行</h2>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-arrow-repeat me-2"></i>
				再度試してください
			</h5>

			<div class="alert alert-info mt-3">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>トラブルシューティング：</strong>
				接続に失敗した場合、以下の点を確認してください。
			</div>

			<ul class="mt-3">
				<li>親機と中継機が近い位置にあるか確認</li>
				<li>両方の機器の電源が入っているか確認</li>
				<li>WPS（AOSS）ボタンを確実に長押ししたか確認</li>
				<li>他のWi-Fi機器との干渉がないか確認</li>
			</ul>

			<div class="alert alert-warning mt-4">
				<i class="bi bi-exclamation-triangle me-2"></i>
				<strong>それでも解決しない場合：</strong>
				<p class="mb-0 mt-2">何度試しても接続できない場合は、サポートへお問い合わせください。</p>
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg me-3"
			on:click={() => goto(`${base}/relay-extender-start`)}
		>
			<i class="bi bi-arrow-clockwise me-2"></i>
			最初からやり直す
		</button>
		<button
			type="button"
			class="btn btn-outline-danger"
			on:click={() => goto(`${base}/relay-extender-support`)}
		>
			サポートへ連絡
			<i class="bi bi-headset ms-2"></i>
		</button>
	</div>
</FlowLayout>
