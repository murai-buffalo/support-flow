<script lang="ts">
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継設定</h2>
		<div class="alert alert-info">
			<i class="bi bi-broadcast"></i>
			<h4>中継機として設定します</h4>
			<p class="mb-0">既存のWi-Fiネットワークの電波を中継して、カバーエリアを拡大します。</p>
		</div>
		<div class="card">
			<div class="card-body">
				<h5>設定手順</h5>
				<ol class="text-start">
					<li>中継機の電源を入れます</li>
					<li>親機のWPSボタンを押します</li>
					<li>中継機のWPSボタンを押します</li>
					<li>接続が完了するまで待ちます</li>
				</ol>
			</div>
		</div>
	</div>
</FlowLayout>
