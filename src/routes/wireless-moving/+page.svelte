<script lang="ts">
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">無線引っ越し設定</h2>
		<div class="alert alert-warning">
			<i class="bi bi-exclamation-triangle-fill"></i>
			<h4>無線引っ越し機能を使用します</h4>
			<p class="mb-0">
				手動で設定を移行します。既存のWi-Fi設定を新しいルーターに設定してください。
			</p>
		</div>
		<div class="card">
			<div class="card-body">
				<h5>設定手順</h5>
				<ol class="text-start">
					<li>古いWi-Fiルーターの設定情報（SSID、パスワード）を確認します</li>
					<li>新しいルーターの設定画面にアクセスします</li>
					<li>同じSSIDとパスワードを新しいルーターに設定します</li>
				</ol>
			</div>
		</div>
	</div>
</FlowLayout>
