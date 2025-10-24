<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';

	let lampStatus = $state<string | null>(null);
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 6: 接続確認</h2>
		<div class="badge bg-primary mb-3">手順 6/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-lightbulb me-2"></i>
				中継機のWPS（AOSS）ランプを確認する
			</h5>

			<div class="alert alert-warning mt-3">
				<i class="bi bi-exclamation-triangle me-2"></i>
				<strong>確認ポイント：</strong>
				WPS（AOSS）ランプが消灯している場合は、接続に失敗しています。
			</div>

			<div class="mt-4">
				<h6>ランプの状態を確認してください</h6>
				<ul>
					<li><strong>消灯</strong>：接続失敗（エラー）</li>
					<li><strong>緑点灯または点滅</strong>：正常（接続成功）</li>
				</ul>
			</div>

			<div class="mt-4 text-center">
				<div class="btn-group-vertical w-75" role="group">
					<button
						type="button"
						class="btn {lampStatus === 'error' ? 'btn-danger' : 'btn-outline-danger'} mb-2"
						onclick={() => (lampStatus = 'error')}
					>
						<i class="bi bi-x-circle me-2"></i>
						消灯している（失敗）
					</button>
					<button
						type="button"
						class="btn {lampStatus === 'normal' ? 'btn-success' : 'btn-outline-success'}"
						onclick={() => (lampStatus = 'normal')}
					>
						<i class="bi bi-check-circle me-2"></i>
						緑点灯または点滅（正常）
					</button>
				</div>
			</div>
		</div>
	</div>

	{#if lampStatus === 'error'}
		<div class="alert alert-danger">
			<i class="bi bi-exclamation-triangle me-2"></i>
			<strong>接続エラーが発生しました</strong>
			<p class="mb-0 mt-2">もう一度試すか、それでも解決しない場合はサポートへご連絡ください。</p>
		</div>
	{/if}

	{#if lampStatus !== null}
		<div class="text-center mt-4">
			<button
				type="button"
				class="btn btn-primary btn-lg"
				onclick={() =>
					goto(
						lampStatus === 'error'
							? `${base}/relay-extender-retry`
							: `${base}/relay-extender-position`
					)}
			>
				次へ
				<i class="bi bi-arrow-right ms-2"></i>
			</button>
		</div>
	{/if}
</FlowLayout>
