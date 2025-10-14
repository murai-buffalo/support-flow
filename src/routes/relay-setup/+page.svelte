<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">中継機接続設定</h2>
		<div class="alert alert-info">
			<i class="bi bi-wifi me-2"></i>
			従来の中継機として設定
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-gear me-2"></i>
				中継機設定手順
			</h5>

			<ol class="list-group list-group-numbered">
				<li class="list-group-item">
					<strong>中継機の電源を入れる</strong>
					<p class="mb-0 text-muted small">
						新しい中継機をコンセントに接続し、電源を入れてください。
					</p>
				</li>
				<li class="list-group-item">
					<strong>設定画面にアクセス</strong>
					<p class="mb-0 text-muted small">
						スマートフォンまたはPCで中継機の設定画面を開いてください。
					</p>
				</li>
				<li class="list-group-item">
					<strong>親機を検索して接続</strong>
					<p class="mb-0 text-muted small">
						既存の親機のWi-Fiネットワークを選択し、パスワードを入力してください。
					</p>
				</li>
				<li class="list-group-item">
					<strong>中継機の設置場所を調整</strong>
					<p class="mb-0 text-muted small">親機と接続したい機器の中間地点に設置してください。</p>
				</li>
				<li class="list-group-item">
					<strong>接続テスト</strong>
					<p class="mb-0 text-muted small">
						中継機経由でインターネットに接続できることを確認してください。
					</p>
				</li>
			</ol>
		</div>
	</div>

	<div class="alert alert-warning">
		<i class="bi bi-exclamation-triangle me-2"></i>
		<strong>注意：</strong>
		中継機接続では、手動での設定が必要です。詳細は製品のマニュアルをご確認ください。
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-success btn-lg me-3"
			on:click={() => goto(`${base}/setup-complete`)}
		>
			設定完了
			<i class="bi bi-check ms-2"></i>
		</button>
		<button
			type="button"
			class="btn btn-outline-secondary"
			on:click={() => goto(`${base}/relay-connection-type`)}
		>
			戻る
		</button>
	</div>
</FlowLayout>
