<script lang="ts">
	import { goto } from '$app/navigation';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { flowStore } from '$lib/stores/flow';

	function handlePrevious(used: boolean) {
		flowStore.setPreviousSmartMoving(used);
		if (used) {
			goto('/smart-moving');
		} else {
			goto('/main-unit-setup');
		}
	}
</script>

<FlowLayout>
	<div>
		<h2 class="mb-4">前回の設定確認</h2>
		<p class="lead mb-4">前回「スマート引っ越し」機能を使用しましたか？</p>
		<div class="d-flex gap-2">
			<button class="btn btn-success btn-lg" onclick={() => handlePrevious(true)}>
				<i class="bi bi-check-circle"></i>
				はい、使用しました
			</button>
			<button class="btn btn-danger btn-lg" onclick={() => handlePrevious(false)}>
				<i class="bi bi-x-circle"></i>
				いいえ、使用していません
			</button>
		</div>
	</div>
</FlowLayout>
