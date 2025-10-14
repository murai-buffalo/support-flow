<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">EasyMesh接続設定</h2>
		<div class="alert alert-success">
			<i class="bi bi-check-circle me-2"></i>
			自動メッシュネットワーク構築
		</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-diagram-3 me-2"></i>
				EasyMesh設定手順
			</h5>

			<ol class="list-group list-group-numbered">
				<li class="list-group-item">
					<strong>中継機の電源を入れる</strong>
					<p class="mb-0 text-muted small">
						新しい中継機をコンセントに接続し、電源を入れてください。
					</p>
				</li>
				<li class="list-group-item">
					<strong>親機のEasyMeshボタンを押す</strong>
					<p class="mb-0 text-muted small">
						既存の親機にあるEasyMeshボタン（またはWPSボタン）を長押ししてください。
					</p>
				</li>
				<li class="list-group-item">
					<strong>中継機のEasyMeshボタンを押す</strong>
					<p class="mb-0 text-muted small">2分以内に、中継機のEasyMeshボタンを押してください。</p>
				</li>
				<li class="list-group-item">
					<strong>接続完了を確認</strong>
					<p class="mb-0 text-muted small">LEDが安定した緑色になれば設定完了です。</p>
				</li>
			</ol>
		</div>
	</div>

	<div class="alert alert-info">
		<i class="bi bi-lightbulb me-2"></i>
		<strong>ポイント：</strong>
		EasyMeshでは、親機と中継機が自動的に最適な設定で接続されます。複雑な設定は不要です。
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
