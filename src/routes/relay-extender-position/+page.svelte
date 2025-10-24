<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継機の位置を調整</h2>
		<div class="alert alert-success">
			<i class="bi bi-check-circle me-2"></i>
			中継機の接続が完了しました！
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-geo-alt me-2"></i>
				最適な設置場所に移動する
			</h5>

			<div class="alert alert-info mt-3">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>最適な設置位置：</strong>
				親機と接続したい機器のちょうど中間地点に設置するのが理想的です。
			</div>

			<div class="mt-4">
				<h6>設置のポイント</h6>
				<ul>
					<li>
						<strong>親機と接続機器の中間地点</strong>
						<p class="text-muted small">親機からの電波と、中継機からの電波の両方が届く位置</p>
					</li>
					<li>
						<strong>障害物を避ける</strong>
						<p class="text-muted small">壁やドア、家具などの障害物が少ない場所</p>
					</li>
					<li>
						<strong>高い位置に設置</strong>
						<p class="text-muted small">床から1〜2メートルの高さが理想的</p>
					</li>
					<li>
						<strong>親機接続ランプを確認</strong>
						<p class="text-muted small">
							緑点灯（または点滅）であれば良好、橙の場合は親機に近づける
						</p>
					</li>
				</ul>
			</div>

			<div class="alert alert-warning mt-4">
				<i class="bi bi-exclamation-triangle me-2"></i>
				<strong>注意：</strong>
				位置を変更した後は、親機接続ランプが緑であることを確認してください。
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-success btn-lg"
			on:click={() => goto(`${base}/setup-complete`)}
		>
			位置調整完了・設定を終了
			<i class="bi bi-check ms-2"></i>
		</button>
	</div>
</FlowLayout>
