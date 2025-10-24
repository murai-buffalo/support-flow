<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';

	let hasWpsButton = $state<boolean | null>(null);
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 4: 親機の確認</h2>
		<div class="badge bg-primary mb-3">手順 4/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-question-circle me-2"></i>
				親機にWPS（AOSS）ボタンがあるか確認する
			</h5>

			<div class="alert alert-info mt-3">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>WPS（AOSS）ボタンとは：</strong>
				無線接続を簡単に設定できるボタンです。親機本体に「WPS」または「AOSS」と書かれたボタンがあります。
			</div>

			<div class="mt-4">
				<h6>確認方法</h6>
				<ol>
					<li>親機（既存のWi-Fiルーター）本体を確認します</li>
					<li>「WPS」または「AOSS」と書かれたボタンを探します</li>
					<li>ボタンの有無を下記で選択してください</li>
				</ol>
			</div>

			<div class="mt-4 text-center">
				<div class="btn-group" role="group">
					<button
						type="button"
						class="btn {hasWpsButton === true ? 'btn-success' : 'btn-outline-success'}"
						onclick={() => (hasWpsButton = true)}
					>
						<i class="bi bi-check-circle me-2"></i>
						WPS（AOSS）ボタンがある
					</button>
					<button
						type="button"
						class="btn {hasWpsButton === false ? 'btn-warning' : 'btn-outline-warning'}"
						onclick={() => (hasWpsButton = false)}
					>
						<i class="bi bi-x-circle me-2"></i>
						WPS（AOSS）ボタンがない
					</button>
				</div>
			</div>
		</div>
	</div>

	{#if hasWpsButton !== null}
		<div class="text-center mt-4">
			<button
				type="button"
				class="btn btn-primary btn-lg"
				onclick={() =>
					goto(hasWpsButton ? `${base}/relay-extender-wps` : `${base}/relay-extender-manual`)}
			>
				次へ
				<i class="bi bi-arrow-right ms-2"></i>
			</button>
		</div>
	{/if}
</FlowLayout>
