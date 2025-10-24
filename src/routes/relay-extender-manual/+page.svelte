<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 5: 手動接続設定</h2>
		<div class="badge bg-primary mb-3">手順 5/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-gear me-2"></i>
				端末を中継機に接続して設定する
			</h5>

			<div class="alert alert-info mt-3">
				<i class="bi bi-lightbulb me-2"></i>
				<strong>手動設定の流れ：</strong>
				端末を中継機のセットアップ用SSIDに接続し、ブラウザから設定を行います。
			</div>

			<div class="mt-4">
				<h6>操作手順</h6>
				<ol>
					<li>
						<strong>端末のWi-Fi設定を開く</strong>
						<p class="text-muted small">スマートフォンまたはPCのWi-Fi設定画面を開きます</p>
					</li>
					<li>
						<strong>中継機のSSIDに接続</strong>
						<p class="text-muted small">
							<code>!Setup-xxxx</code> という名前のSSIDを探して接続します<br />
							（パスワードは不要です）
						</p>
					</li>
					<li>
						<strong>ブラウザを開く</strong>
						<p class="text-muted small">ChromeやSafariなどのブラウザを起動します</p>
					</li>
					<li>
						<strong>URLを入力</strong>
						<p class="text-muted small">
							アドレスバーに <code>192.168.11.210</code> を入力してアクセスします
						</p>
					</li>
				</ol>
			</div>

			<div class="alert alert-warning mt-4">
				<i class="bi bi-exclamation-triangle me-2"></i>
				<strong>注意：</strong>
				設定画面が表示されない場合は、端末が中継機のWi-Fiに正しく接続されているか確認してください。
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={() => goto(`${base}/relay-extender-manual-login`)}
		>
			設定画面を開いた・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
