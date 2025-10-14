<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">設定完了</h2>
		<div class="alert alert-success">
			<i class="bi bi-check-circle-fill me-2"></i>
			設定が完了しました！
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body text-center">
			<i class="bi bi-wifi fs-1 text-success mb-3"></i>
			<h5 class="card-title">接続完了</h5>
			<p class="card-text">
				Wi-Fi機器の設定が正常に完了しました。<br />
				快適なインターネット環境をお楽しみください。
			</p>
		</div>
	</div>

	<div class="alert alert-info">
		<i class="bi bi-info-circle me-2"></i>
		<strong>次のステップ：</strong>
		<p class="mb-0">
			設定は完了しましたが、より良いサービス提供のため、簡単な満足度調査にご協力ください。
		</p>
	</div>

	<div class="text-center mt-4">
		<button type="button" class="btn btn-primary btn-lg" on:click={() => goto(`${base}/nps`)}>
			満足度調査へ進む
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
