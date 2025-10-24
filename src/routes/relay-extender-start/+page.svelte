<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継接続開始</h2>
		<div class="alert alert-info">
			<i class="bi bi-info-circle me-2"></i>
			中継機の接続設定を開始します
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-list-check me-2"></i>
				準備するもの
			</h5>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					<i class="bi bi-pin me-2 text-primary"></i>
					<strong>先が細いもの</strong>（つまようじなど）
					<p class="mb-0 text-muted small">Resetボタンを押すために使用します</p>
				</li>
				<li class="list-group-item">
					<i class="bi bi-phone me-2 text-success"></i>
					<strong>端末</strong>（スマートフォンまたはPC）
					<p class="mb-0 text-muted small">設定画面にアクセスするために使用します</p>
				</li>
			</ul>
		</div>
	</div>

	<div class="alert alert-warning">
		<i class="bi bi-exclamation-triangle me-2"></i>
		<strong>ご注意：</strong>
		これから中継機の設定を行います。手順に従って慎重に操作してください。
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			onclick={() => goto(`${base}/relay-extender-step1`)}
		>
			準備完了・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
