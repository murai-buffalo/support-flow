<script lang="ts">
	import { goto } from '$app/navigation';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { flowStore } from '$lib/stores/flow';

	function handleSupport(supported: boolean) {
		flowStore.setSmartMovingSupported(supported);
		if (supported) {
			goto('/smart-moving');
		} else {
			goto('/wireless-moving');
		}
	}
</script>

<FlowLayout>
	<div>
		<h2 class="mb-4">スマート引っ越し対応確認</h2>
		<p class="lead mb-4">お使いの古いWi-Fiルーターは「スマート引っ越し」機能に対応していますか？</p>
		<div class="alert alert-info">
			<i class="bi bi-info-circle"></i>
			スマート引っ越し機能があると、設定が簡単に移行できます。
		</div>
		<div class="d-flex gap-2">
			<button class="btn btn-success btn-lg" onclick={() => handleSupport(true)}>
				<i class="bi bi-check-circle"></i>
				はい、対応しています
			</button>
			<button class="btn btn-danger btn-lg" onclick={() => handleSupport(false)}>
				<i class="bi bi-x-circle"></i>
				いいえ、対応していません
			</button>
		</div>
	</div>
</FlowLayout>
