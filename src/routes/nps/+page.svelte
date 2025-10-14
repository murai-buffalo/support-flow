<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';

	let selectedScore = $state<number | null>(null);
	let feedback = $state('');

	function selectScore(score: number) {
		selectedScore = score;
	}

	function handleSubmit() {
		if (selectedScore === null) return;

		// NPSスコアと詳細フィードバックを保存
		// TODO: 実際のアプリケーションでは、これらのデータをサーバーに送信
		console.log('NPS Score:', selectedScore);
		console.log('Feedback:', feedback);

		// 最終完了画面へ遷移
		goto(`${base}/final-complete`);
	}

	function getScoreLabel(score: number): string {
		if (score <= 6) return '批判者';
		if (score <= 8) return '中立者';
		return '推奨者';
	}

	function getScoreColor(score: number): string {
		if (score <= 6) return 'text-danger';
		if (score <= 8) return 'text-warning';
		return 'text-success';
	}
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">お客様満足度調査</h2>
		<p class="text-muted mb-2">バッファローのWi-Fi製品とサポートについて、お聞かせください。</p>
		<div class="alert alert-primary">
			<small
				><i class="bi bi-info-circle me-1"
				></i>より良いサービス提供のため、評価をお聞かせください（必須）</small
			>
		</div>
	</div>

	<div class="card">
		<div class="card-body">
			<h5 class="card-title mb-4">
				<i class="bi bi-star me-2"></i>
				バッファローの製品を友人や同僚にどの程度お勧めしたいと思いますか？
			</h5>

			<div class="mb-4">
				<div class="d-flex justify-content-between align-items-center mb-2">
					<small class="text-muted">全くお勧めしない</small>
					<small class="text-muted">非常にお勧めしたい</small>
				</div>

				<div class="row g-2">
					{#each Array(11).fill(0) as _, i}
						<div class="col">
							<button
								type="button"
								class="btn w-100 {selectedScore === i ? 'btn-primary' : 'btn-outline-secondary'}"
								onclick={() => selectScore(i)}
							>
								{i}
							</button>
						</div>
					{/each}
				</div>

				{#if selectedScore !== null}
					<div class="mt-3 text-center">
						<span class="badge bg-light text-dark fs-6">
							{selectedScore}点 -
							<span class={getScoreColor(selectedScore)}>
								{getScoreLabel(selectedScore)}
							</span>
						</span>
					</div>
				{/if}
			</div>

			<div class="mb-4">
				<label for="feedback" class="form-label">
					<i class="bi bi-chat-text me-2"></i>
					詳細なご意見・ご感想（任意）
				</label>
				<textarea
					id="feedback"
					class="form-control"
					rows="4"
					placeholder="設定過程で困ったこと、改善してほしい点、良かった点など、自由にお書きください。"
					bind:value={feedback}
				></textarea>
				<div class="form-text">
					いただいたご意見は、製品・サービスの改善に活用させていただきます。
				</div>
			</div>

			<div class="text-center">
				<button
					type="button"
					class="btn btn-primary btn-lg"
					disabled={selectedScore === null}
					onclick={handleSubmit}
				>
					送信して完了
					<i class="bi bi-check ms-2"></i>
				</button>
			</div>
		</div>
	</div>

	<div class="mt-4 text-center">
		<small class="text-muted">
			<i class="bi bi-shield-check me-1"></i>
			お客様の情報は適切に保護され、品質向上の目的のみに使用されます。
		</small>
	</div>
</FlowLayout>
