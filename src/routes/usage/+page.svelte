<script lang="ts">
	import { goto } from '$app/navigation';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { flowStore } from '$lib/stores/flow';

	function handleUsage(usage: string) {
		flowStore.setUsage(usage);
		if (usage === '今までのWi-Fiルーターと交換') {
			goto('/smart-moving-support');
		} else if (usage === '故障して買い替え') {
			goto('/previous-smart-moving');
		} else if (usage === '新規に設置') {
			goto('/main-unit-setup');
		} else if (usage === '中継機として使用') {
			goto('/relay');
		}
	}
</script>

<FlowLayout>
	<div>
		<h2 class="mb-4">利用方法を選択してください</h2>
		<div class="row g-3">
			<div class="col-md-6">
				<button
					class="btn btn-outline-info btn-lg w-100 h-100"
					onclick={() => handleUsage('今までのWi-Fiルーターと交換')}
				>
					<i class="bi bi-arrow-repeat d-block mb-2" style="font-size: 1.5rem;"></i>
					今までのWi-Fiルーターと交換
				</button>
			</div>
			<div class="col-md-6">
				<button
					class="btn btn-outline-warning btn-lg w-100 h-100"
					onclick={() => handleUsage('故障して買い替え')}
				>
					<i class="bi bi-exclamation-triangle d-block mb-2" style="font-size: 1.5rem;"></i>
					故障して買い替え
				</button>
			</div>
			<div class="col-md-6">
				<button
					class="btn btn-outline-success btn-lg w-100 h-100"
					onclick={() => handleUsage('新規に設置')}
				>
					<i class="bi bi-plus-circle d-block mb-2" style="font-size: 1.5rem;"></i>
					新規に設置
				</button>
			</div>
			<div class="col-md-6">
				<button
					class="btn btn-outline-primary btn-lg w-100 h-100"
					onclick={() => handleUsage('中継機として使用')}
				>
					<i class="bi bi-broadcast d-block mb-2" style="font-size: 1.5rem;"></i>
					中継機として使用
				</button>
			</div>
		</div>
	</div>
</FlowLayout>
