<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">スマート引っ越し設定</h2>
		<div class="alert alert-success">
			<i class="bi bi-check-circle-fill"></i>
			<h4>スマート引っ越し機能を使用します</h4>
			<p class="mb-0">
				古いWi-Fiルーターの設定を新しいルーターに自動的に移行します。
				手順に従って設定を進めてください。
			</p>
		</div>
		<div class="card">
			<div class="card-body">
				<h5>設定手順</h5>
				<ol class="text-start">
					<li>古いWi-Fiルーターの電源を入れたままにします</li>
					<li>新しいルーターの「スマート引っ越し」ボタンを押します</li>
					<li>画面の指示に従って設定を完了します</li>
				</ol>
			</div>
		</div>

		<div class="text-center mt-4">
			<button
				type="button"
				class="btn btn-success btn-lg"
				on:click={() => goto(`${base}/setup-complete`)}
			>
				設定完了
				<i class="bi bi-check ms-2"></i>
			</button>
		</div>
	</div>
</FlowLayout>
