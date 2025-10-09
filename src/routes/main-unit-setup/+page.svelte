<script lang="ts">
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">親機設定</h2>
		<div class="alert alert-primary">
			<i class="bi bi-gear-fill"></i>
			<h4>親機の初期設定を行います</h4>
			<p class="mb-0">新しいWi-Fiルーターの基本設定を行います。</p>
		</div>
		<div class="card">
			<div class="card-body">
				<h5>設定手順</h5>
				<ol class="text-start">
					<li>ルーターをインターネット回線に接続します</li>
					<li>電源を入れて、設定画面にアクセスします</li>
					<li>インターネット接続設定を行います</li>
					<li>Wi-Fi設定（SSID、パスワード）を設定します</li>
				</ol>
			</div>
		</div>
	</div>
</FlowLayout>
