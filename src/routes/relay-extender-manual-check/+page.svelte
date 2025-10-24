<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';

	let lampStatus = $state<string | null>(null);
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 7: ランプ確認</h2>
		<div class="badge bg-primary mb-3">手順 7/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-lightbulb me-2"></i>
				ランプの状態を確認する
			</h5>

			<div class="alert alert-success mt-3">
				<i class="bi bi-check-circle me-2"></i>
				<strong>正常な状態：</strong>
			</div>
			<ul>
				<li><strong>電源ランプ</strong> = 緑点灯</li>
				<li><strong>親機接続ランプ</strong> = 緑点灯（または点滅）</li>
			</ul>

			<div class="alert alert-warning mt-3">
				<i class="bi bi-exclamation-triangle me-2"></i>
				<strong>失敗の状態：</strong>
			</div>
			<ul>
				<li><strong>親機接続ランプ</strong>が消灯している場合は接続に失敗しています</li>
			</ul>

			<div class="mt-4">
				<h6>中継機本体のランプを確認してください</h6>
				<p class="text-muted">
					両方のランプが点灯または点滅していれば、親機との接続が成功しています。
				</p>
			</div>

			<div class="mt-4 text-center">
				<div class="btn-group-vertical w-75" role="group">
					<button
						type="button"
						class="btn {lampStatus === 'success' ? 'btn-success' : 'btn-outline-success'} mb-2"
						onclick={() => (lampStatus = 'success')}
					>
						<i class="bi bi-check-circle me-2"></i>
						両方とも点灯または点滅（正常）
					</button>
					<button
						type="button"
						class="btn {lampStatus === 'error' ? 'btn-danger' : 'btn-outline-danger'}"
						onclick={() => (lampStatus = 'error')}
					>
						<i class="bi bi-x-circle me-2"></i>
						消灯している（失敗）
					</button>
				</div>
			</div>
		</div>
	</div>

	{#if lampStatus === 'error'}
		<div class="alert alert-danger">
			<i class="bi bi-exclamation-triangle me-2"></i>
			<strong>接続に問題がある可能性があります</strong>
			<p class="mb-0 mt-2">もう一度試すか、サポートへご連絡ください。</p>
		</div>
	{/if}

	{#if lampStatus !== null}
		<div class="text-center mt-4">
			<button
				type="button"
				class="btn btn-primary btn-lg"
				onclick={() =>
					goto(
						lampStatus === 'success'
							? `${base}/relay-extender-position`
							: `${base}/relay-extender-retry`
					)}
			>
				次へ
				<i class="bi bi-arrow-right ms-2"></i>
			</button>
		</div>
	{/if}
</FlowLayout>
