<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 5: WPS接続</h2>
		<div class="badge bg-primary mb-3">手順 5/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-wifi me-2"></i>
				親機と中継機のWPS（AOSS）ボタンを長押しする
			</h5>

			<div class="alert alert-success mt-3">
				<i class="bi bi-check-circle me-2"></i>
				<strong>WPSボタンで簡単接続：</strong>
				ボタンを押すだけで自動的に接続設定が完了します。
			</div>

			<div class="mt-4">
				<h6>操作手順</h6>
				<ol>
					<li><strong>親機</strong>のWPS（AOSS）ボタンを長押しします</li>
					<li>WPSランプが<strong>2回点滅</strong>になるまで押し続けます</li>
					<li>続いて<strong>中継機</strong>のWPS（AOSS）ボタンも同様に長押しします</li>
					<li>中継機のWPSランプも<strong>2回点滅</strong>になるまで押し続けます</li>
				</ol>
			</div>

			<div class="alert alert-info mt-4">
				<i class="bi bi-clock me-2"></i>
				接続には1〜2分程度かかる場合があります。ランプの状態が変わるまでお待ちください。
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={() => goto(`${base}/relay-extender-wps-check`)}
		>
			ボタン操作完了・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
