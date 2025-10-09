<script lang="ts">
	import { MODELS, determineProductType, hasSmartMovingFeature } from '$lib/data/models';

	let testModel = $state('WSR-5400AX6S');
	let testResult = $derived({
		hasSmartMoving: hasSmartMovingFeature(testModel),
		productType: determineProductType(testModel)
	});
</script>

<div class="container my-5">
	<h1 class="mb-4">型番データテスト</h1>

	<!-- テスト入力 -->
	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">型番テスト</h5>
			<div class="mb-3">
				<label for="test-input" class="form-label">型番を入力</label>
				<input
					type="text"
					id="test-input"
					class="form-control"
					bind:value={testModel}
					placeholder="例: WSR-5400AX6S"
				/>
			</div>
			<div class="alert alert-info">
				<strong>判定結果:</strong><br />
				型番: {testModel}<br />
				製品タイプ: {testResult.productType || '不明'}<br />
				スマート引っ越し: {testResult.hasSmartMoving ? '対応' : '非対応'}
			</div>
		</div>
	</div>

	<!-- 型番リスト -->
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">全型番リスト ({MODELS.length}件)</h5>
			<div class="table-responsive">
				<table class="table table-sm table-striped">
					<thead>
						<tr>
							<th>型番</th>
							<th>製品タイプ</th>
							<th>スマート引っ越し</th>
						</tr>
					</thead>
					<tbody>
						{#each MODELS as model}
							<tr>
								<td><code>{model.model}</code></td>
								<td>
									{#if determineProductType(model.model) === '親機'}
										<span class="badge bg-primary">親機</span>
									{:else if determineProductType(model.model) === '中継機'}
										<span class="badge bg-success">中継機</span>
									{:else}
										<span class="badge bg-secondary">不明</span>
									{/if}
								</td>
								<td>
									{#if model.hasSmartMoving}
										<span class="badge bg-success">対応</span>
									{:else}
										<span class="badge bg-warning">非対応</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- 統計 -->
	<div class="row mt-4">
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h6 class="card-title">製品タイプ別</h6>
					<ul class="list-unstyled mb-0">
						<li>
							親機: {MODELS.filter((m) => determineProductType(m.model) === '親機').length}件
						</li>
						<li>
							中継機: {MODELS.filter((m) => determineProductType(m.model) === '中継機').length}件
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h6 class="card-title">スマート引っ越し対応</h6>
					<ul class="list-unstyled mb-0">
						<li>対応: {MODELS.filter((m) => m.hasSmartMoving).length}件</li>
						<li>非対応: {MODELS.filter((m) => !m.hasSmartMoving).length}件</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
