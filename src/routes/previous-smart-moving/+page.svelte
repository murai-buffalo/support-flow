<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { flowStore } from '$lib/stores/flow';

	function handlePrevious(used: boolean) {
		flowStore.setPreviousSmartMoving(used);
		if (used) {
			goto(`${base}/smart-moving`);
		} else {
			goto(`${base}/wireless-moving`);
		}
	}
</script>

<FlowLayout>
	<div>
		<h2 class="mb-4">前回の設定確認</h2>
		<p class="lead mb-4">前回「スマート引っ越し」機能を使用しましたか？</p>

		<div class="alert alert-info mb-4">
			<i class="bi bi-info-circle"></i>
			前回の設定時に「スマート引っ越し」機能を使用していた場合、同じ方法で設定できます。
		</div>

		<div class="d-flex gap-3 flex-wrap">
			<button class="btn btn-success btn-lg flex-fill" onclick={() => handlePrevious(true)}>
				<i class="bi bi-check-circle d-block mb-2" style="font-size: 2rem;"></i>
				<strong>はい、使用しました</strong>
				<div class="small mt-1">スマート引っ越しで設定</div>
			</button>
			<button class="btn btn-secondary btn-lg flex-fill" onclick={() => handlePrevious(false)}>
				<i class="bi bi-x-circle d-block mb-2" style="font-size: 2rem;"></i>
				<strong>いいえ、使用していません</strong>
				<div class="small mt-1">無線引っ越しで設定</div>
			</button>
		</div>

		<div class="alert alert-warning mt-4">
			<strong><i class="bi bi-question-circle"></i> わからない場合</strong><br />
			前回の設定方法が不明な場合は「いいえ」を選択してください。
		</div>
	</div>
</FlowLayout>

<style>
	.btn-lg {
		min-height: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
