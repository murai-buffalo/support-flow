<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 3: Resetボタンを押す</h2>
		<div class="badge bg-primary mb-3">手順 3/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-arrow-clockwise me-2"></i>
				ランプを確認してResetボタンを押す
			</h5>

			<div class="alert alert-info mt-3">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>確認するランプの状態：</strong>
			</div>
			<ul>
				<li><strong>電源ランプ</strong> = 緑点灯</li>
			</ul>

			<div class="mt-4">
				<h6>Resetボタンの押し方</h6>
				<ol>
					<li>ランプが上記の状態になるまで待ちます</li>
					<li>準備した先が細いもの（つまようじなど）を用意します</li>
					<li>中継機本体のResetボタンを押します</li>
					<li>ボタンを押したら離してください（長押し不要）</li>
				</ol>
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={() => goto(`${base}/relay-extender-step4`)}
		>
			Reset完了・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
