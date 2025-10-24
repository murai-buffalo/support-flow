<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">サポートへのお問い合わせ</h2>
		<div class="alert alert-warning">
			<i class="bi bi-exclamation-triangle me-2"></i>
			設定に問題が発生しました
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-headset me-2"></i>
				バッファローサポートへご連絡ください
			</h5>

			<div class="mt-4">
				<h6>サポート窓口</h6>
				<ul class="list-unstyled">
					<li class="mb-3">
						<i class="bi bi-telephone me-2 text-primary"></i>
						<strong>電話サポート：</strong>
						<p class="text-muted small mb-0">0120-buffalo (0120-283-340)</p>
						<p class="text-muted small">受付時間：9:00〜19:00（年中無休）</p>
					</li>
					<li class="mb-3">
						<i class="bi bi-envelope me-2 text-success"></i>
						<strong>メールサポート：</strong>
						<p class="text-muted small mb-0">
							<a href="https://www.buffalo.jp/support/" target="_blank" rel="noopener noreferrer">
								バッファローサポートサイト
								<i class="bi bi-box-arrow-up-right ms-1"></i>
							</a>
						</p>
					</li>
					<li class="mb-3">
						<i class="bi bi-chat-dots me-2 text-info"></i>
						<strong>チャットサポート：</strong>
						<p class="text-muted small mb-0">公式サイトよりご利用いただけます</p>
					</li>
				</ul>
			</div>

			<div class="alert alert-info mt-4">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>お問い合わせ時にご用意いただくもの：</strong>
				<ul class="mb-0 mt-2">
					<li>製品の型番</li>
					<li>製造番号（製品ラベルに記載）</li>
					<li>発生している問題の詳細</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-outline-primary"
			on:click={() => goto(`${base}/relay-extender-start`)}
		>
			<i class="bi bi-arrow-clockwise me-2"></i>
			もう一度試す
		</button>
	</div>
</FlowLayout>
