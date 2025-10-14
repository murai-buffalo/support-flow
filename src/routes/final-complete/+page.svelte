<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { flowStore } from '$lib/stores/flow';

	function restart() {
		flowStore.reset();
		goto(`${base}/`);
	}
</script>

<FlowLayout>
	<div class="text-center">
		<div class="mb-4">
			<i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
		</div>

		<h2 class="mb-4 text-success">設定完了！</h2>

		<p class="lead mb-4">
			Wi-Fi設定が正常に完了しました。<br />
			貴重なご意見をありがとうございました。
		</p>
	</div>

	<div class="row justify-content-center">
		<div class="col-md-8">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">
						<i class="bi bi-lightbulb me-2"></i>
						設定後のヒント
					</h5>

					<ul class="list-unstyled">
						<li class="mb-2">
							<i class="bi bi-wifi text-primary me-2"></i>
							<strong>Wi-Fi接続確認：</strong>
							端末がWi-Fiに正常に接続できることを確認してください。
						</li>
						<li class="mb-2">
							<i class="bi bi-speedometer2 text-info me-2"></i>
							<strong>速度テスト：</strong>
							インターネット速度が期待通りか確認することをお勧めします。
						</li>
						<li class="mb-2">
							<i class="bi bi-shield-check text-success me-2"></i>
							<strong>セキュリティ設定：</strong>
							WPA3などの最新セキュリティが有効になっています。
						</li>
						<li class="mb-2">
							<i class="bi bi-question-circle text-warning me-2"></i>
							<strong>サポート：</strong>
							ご不明な点がございましたら、バッファローサポートサイトをご利用ください。
						</li>
					</ul>
				</div>
			</div>

			<div class="text-center mt-4">
				<button type="button" class="btn btn-outline-primary" on:click={restart}>
					<i class="bi bi-arrow-clockwise me-2"></i>
					別の設定を開始
				</button>
			</div>
		</div>
	</div>

	<div class="mt-5 text-center">
		<small class="text-muted">
			<i class="bi bi-heart-fill text-danger me-1"></i>
			バッファロー製品をご利用いただき、ありがとうございます。
		</small>
	</div>
</FlowLayout>
