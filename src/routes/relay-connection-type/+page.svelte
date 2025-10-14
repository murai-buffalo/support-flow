<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
	import { hasEasyMeshFeature } from '$lib/data/models';
	import { flowStore } from '$lib/stores/flow';
	import { onMount } from 'svelte';

	let connectionType = '';
	let newDeviceSupportsEasyMesh = false;
	let oldDeviceSupportsEasyMesh = false;
	let recommendedType = '';

	onMount(() => {
		const state = $flowStore;

		// 新機器のEasyMesh対応状況をチェック
		newDeviceSupportsEasyMesh = hasEasyMeshFeature(state.modelNumber);

		// 旧機器のEasyMesh対応状況をチェック（旧機器情報がある場合）
		if (state.oldModelNumber && state.oldDeviceType === 'buffalo-with-model') {
			oldDeviceSupportsEasyMesh = hasEasyMeshFeature(state.oldModelNumber);
		}

		// 推奨接続方法を決定
		if (newDeviceSupportsEasyMesh && oldDeviceSupportsEasyMesh) {
			recommendedType = 'easymesh';
		} else {
			recommendedType = 'relay';
		}

		connectionType = recommendedType;
	});

	function handleNext() {
		if (connectionType === 'easymesh') {
			goto(`${base}/easymesh-setup`);
		} else {
			goto(`${base}/relay-setup`);
		}
	}
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継器の接続方法</h2>
		<p class="text-muted mb-4">お使いの機器に応じて、最適な接続方法をお選びください。</p>
	</div>

	{#if $flowStore.modelNumber}
		<div class="card mb-4">
			<div class="card-header">
				<i class="fas fa-info-circle me-2"></i>機器の対応状況
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-md-6">
						<h6>新機器（中継機）</h6>
						<p class="mb-1">
							<strong>{$flowStore.modelNumber}</strong>
						</p>
						<span class="badge {newDeviceSupportsEasyMesh ? 'bg-success' : 'bg-secondary'}">
							EasyMesh: {newDeviceSupportsEasyMesh ? '対応' : '非対応'}
						</span>
					</div>
					{#if $flowStore.oldModelNumber && $flowStore.oldDeviceType === 'buffalo-with-model'}
						<div class="col-md-6">
							<h6>既存機器（親機）</h6>
							<p class="mb-1">
								<strong>{$flowStore.oldModelNumber}</strong>
							</p>
							<span class="badge {oldDeviceSupportsEasyMesh ? 'bg-success' : 'bg-secondary'}">
								EasyMesh: {oldDeviceSupportsEasyMesh ? '対応' : '非対応'}
							</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<div class="card">
		<div class="card-body">
			<div
				class="form-check mb-3 p-3 border rounded {connectionType === 'easymesh'
					? 'border-primary bg-light'
					: ''}"
			>
				<input
					class="form-check-input"
					type="radio"
					name="connectionType"
					id="easymesh"
					value="easymesh"
					bind:group={connectionType}
					disabled={!newDeviceSupportsEasyMesh || !oldDeviceSupportsEasyMesh}
				/>
				<label class="form-check-label w-100" for="easymesh">
					<div class="d-flex justify-content-between align-items-center">
						<div>
							<strong>EasyMesh接続</strong>
							{#if recommendedType === 'easymesh'}
								<span class="badge bg-success ms-2">推奨</span>
							{/if}
						</div>
						<i class="bi bi-diagram-3 fs-2 text-primary"></i>
					</div>
					<small class="text-muted">
						自動でメッシュネットワークを構築し、最適な接続を維持します。
						{#if !newDeviceSupportsEasyMesh || !oldDeviceSupportsEasyMesh}
							<br /><span class="text-warning">※ 両方の機器がEasyMesh対応である必要があります</span>
						{/if}
					</small>
				</label>
			</div>

			<div
				class="form-check mb-3 p-3 border rounded {connectionType === 'relay'
					? 'border-primary bg-light'
					: ''}"
			>
				<input
					class="form-check-input"
					type="radio"
					name="connectionType"
					id="relay"
					value="relay"
					bind:group={connectionType}
				/>
				<label class="form-check-label w-100" for="relay">
					<div class="d-flex justify-content-between align-items-center">
						<div>
							<strong>中継機接続</strong>
							{#if recommendedType === 'relay'}
								<span class="badge bg-success ms-2">推奨</span>
							{/if}
						</div>
						<i class="bi bi-wifi fs-2 text-info"></i>
					</div>
					<small class="text-muted"> 従来の中継機として動作し、Wi-Fi電波を延長します。 </small>
				</label>
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={handleNext}
			disabled={!connectionType}
		>
			次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
