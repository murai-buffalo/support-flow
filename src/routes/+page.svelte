<script lang="ts">
	import { goto } from '$app/navigation';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (typeof window !== 'undefined') {
			await import('bootstrap/dist/js/bootstrap.bundle.min.js' as any);
		}
	});
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">サポートを開始します</h2>
		<p class="lead mb-4">
			Wi-Fiルーターの設定や問題解決をお手伝いします。<br />
			まずは、お困りの内容を選択してください。
		</p>
		<div class="row g-3">
			<div class="col-md-6">
				<button
					class="btn btn-outline-primary btn-lg w-100 h-100"
					onclick={() => goto('/product-selection')}
				>
					<i class="bi bi-gear-fill d-block mb-2" style="font-size: 2rem;"></i>
					商品の選び方・仕様
				</button>
			</div>
			<div class="col-md-6">
				<button
					class="btn btn-outline-success btn-lg w-100 h-100"
					onclick={() => goto('/product-input')}
				>
					<i class="bi bi-tools d-block mb-2" style="font-size: 2rem;"></i>
					設定方法
				</button>
			</div>
		</div>
	</div>
</FlowLayout>
