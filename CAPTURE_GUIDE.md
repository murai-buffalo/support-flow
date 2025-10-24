# フローキャプチャツールの使用手順

## 概要

中継機接続フローを自動的にブラウザで操作し、各画面のスクリーンショットを撮影するツールです。

## 実行手順

### ステップ1: アプリケーションをビルド

```bash
npm run build
```

### ステップ2: プレビューサーバーを起動

**新しいターミナルを開いて**以下を実行：

```bash
npm run preview
```

✅ サーバーが起動したことを確認（`https://localhost:4173/support-flow` が表示される）

**重要**: プレビューサーバーは **HTTPS** で起動します。

### ステップ3: 接続テスト（オプション）

問題がある場合は、まず接続テストを実行：

```bash
npm run test-connection
```

### ステップ4: キャプチャプログラムを実行

**元のターミナルで**以下を実行：

```bash
npm run capture
```

### ステップ5: 結果を確認

`screenshots/` フォルダに29枚の画像が保存されます。

## 撮影される画面一覧

### シナリオ1: WPS接続フロー（21枚）

完全な成功パスのキャプチャ：

1. `scenario1-01_top.png` - トップページ
2. `scenario1-02_product-input.png` - 製品入力画面
3. `scenario1-03_product-confirmed.png` - 製品確認
4. `scenario1-04_usage.png` - 利用方法選択
5. `scenario1-05_relay.png` - 中継機選択
6. `scenario1-06_old-router-input.png` - 既存機器入力
7. `scenario1-07_relay-setup.png` - 中継機設定画面
8. `scenario1-08_extender-start.png` - 準備画面
9. `scenario1-09_extender-step1.png` - ステップ1: 設置
10. `scenario1-10_extender-step2.png` - ステップ2: EasyMeshスイッチOFF
11. `scenario1-11_extender-step3.png` - ステップ3: Resetボタン
12. `scenario1-12_extender-step4.png` - ステップ4: 親機確認
13. `scenario1-13_extender-step4-wps-selected.png` - WPSボタンあり選択
14. `scenario1-14_extender-wps.png` - WPS接続
15. `scenario1-15_extender-wps-check.png` - WPS接続確認
16. `scenario1-16_extender-wps-check-success.png` - 接続成功
17. `scenario1-17_extender-position.png` - 位置調整
18. `scenario1-18_setup-complete.png` - 設定完了
19. `scenario1-19_nps.png` - NPS入力
20. `scenario1-20_nps-score-selected.png` - NPSスコア選択
21. `scenario1-21_final-complete.png` - 最終完了

### シナリオ2: マニュアル接続フロー（6枚）

WPSボタンがない場合の手動設定フロー：

1. `scenario2-01_extender-step4-manual-selected.png` - WPSボタンなし選択
2. `scenario2-02_extender-manual.png` - 手動接続設定
3. `scenario2-03_extender-manual-login.png` - ログイン画面
4. `scenario2-04_extender-manual-check.png` - ランプ確認
5. `scenario2-05_extender-manual-check-success.png` - 接続成功
6. `scenario2-06_extender-position-manual.png` - 位置調整

### シナリオ3: エラーケース（2枚）

エラー発生時の画面：

1. `scenario3-01_extender-retry.png` - 再試行画面
2. `scenario3-02_extender-support.png` - サポート連絡画面

**合計: 29枚**

## カスタマイズ

`scripts/capture-flow.ts` を編集して以下をカスタマイズできます：

- **ブラウザ表示**: `headless: false` → `headless: true` で非表示に
- **画面サイズ**: `viewport: { width: 1280, height: 800 }`
- **待機時間**: `wait(1000)` の数値を変更（ミリ秒）
- **製品型番**: `'WXR-6000AX12S'` を変更
- **NPSスコア**: `'9'` を変更

## トラブルシューティング

### エラー: ERR_CONNECTION_REFUSED

**原因**: プレビューサーバーが起動していません

**解決策**: 
1. 別のターミナルで `npm run preview` を実行
2. ブラウザで `https://localhost:4173/support-flow` にアクセスできることを確認
   - 自己署名証明書の警告が出る場合は「続行」をクリック
3. 再度 `npm run capture` を実行

### エラー: HTTPS証明書エラー

**原因**: 自己署名証明書を使用しているため

**解決策**: 
- スクリプト内で `ignoreHTTPSErrors: true` が設定されているため、自動的に無視されます
- 手動でブラウザテストする場合は証明書警告を承認してください

### エラー: 要素が見つからない

**原因**: ページの読み込みが遅い、またはUIが変更された

**解決策**:
1. `wait()` の時間を増やす（例: `wait(2000)`）
2. セレクターを確認・修正
3. `waitUntil: 'networkidle'` オプションが適切に動作しているか確認

### スクリーンショットが途中で止まる

**原因**: JavaScriptエラーまたはタイムアウト

**解決策**:
1. ブラウザのコンソールでエラーを確認
2. プレビューサーバーを再起動
3. キャッシュをクリア

## 実行例

```bash
# ターミナル1
npm run build
npm run preview

# ターミナル2（新しいウィンドウ/タブで開く）
npm run capture
```

実行中、Chromiumブラウザが自動的に開き、フローを操作する様子が表示されます。
すべての操作が完了すると、ブラウザは自動的に閉じます。
