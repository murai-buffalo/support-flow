<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlowLayout from '$lib/components/FlowLayout.svelte';
</script>

<FlowLayout>
	<div class="text-center">
		<h2 class="mb-4">ステップ 6: 親機に接続</h2>
		<div class="badge bg-primary mb-3">手順 6/7</div>
	</div>

	<div class="card mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<i class="bi bi-box-arrow-in-right me-2"></i>
				ログインして親機のSSIDに接続する
			</h5>

			<div class="mt-4">
				<h6>操作手順</h6>
				<ol>
					<li>
						<strong>ログイン</strong>
						<p class="text-muted small">
							ログイン用のユーザー名・パスワードを入力してログインします<br />
							（初期設定の場合、通常は <code>admin</code> / <code>password</code> または製品ラベルに記載）
						</p>
					</li>
					<li>
						<strong>「Wi-Fiルーターを選択してつなぐ」を選択</strong>
						<p class="text-muted small">設定画面のメニューから選択します</p>
					</li>
					<li>
						<strong>親機のSSIDを探す</strong>
						<p class="text-muted small">
							検出されたWi-Fiネットワークの一覧から、親機（既存のWi-Fiルーター）のSSIDを選択します
						</p>
					</li>
					<li>
						<strong>パスワードを入力</strong>
						<p class="text-muted small">親機のWi-Fiパスワードを入力して接続します</p>
					</li>
				</ol>
			</div>

			<div class="alert alert-info mt-4">
				<i class="bi bi-clock me-2"></i>
				接続処理には1〜2分程度かかる場合があります。
			</div>
		</div>
	</div>

	<div class="text-center mt-4">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			on:click={() => goto(`${base}/relay-extender-manual-check`)}
		>
			設定完了・次へ
			<i class="bi bi-arrow-right ms-2"></i>
		</button>
	</div>
</FlowLayout>
