# フローキャプチャプログラム

このプログラムは、中継機接続フローを自動的にブラウザで操作し、各ステップのスクリーンショットを撮影します。

## 使用方法

### 1. プレビューサーバーを起動

別のターミナルで以下のコマンドを実行してください：

```bash
npm run preview
```

サーバーが `http://localhost:4173/support-flow` で起動します。

### 2. キャプチャプログラムを実行

```bash
npm run capture
```

### 3. スクリーンショットの確認

`screenshots/` ディレクトリに以下のファイルが保存されます：

#### WPS接続フロー（正常系）
- `01_top.png` - トップページ
- `02_setup-method.png` - 設定方法選択
- `03_product-input.png` - 製品入力画面
- `04_product-confirmed.png` - 製品確認
- `05_usage.png` - 利用方法選択
- `06_relay.png` - 中継機として使用
- `07_relay-setup.png` - 中継機設定開始
- `08_extender-start.png` - 準備するもの
- `09_extender-step1.png` - ステップ1: 中継機の設置
- `10_extender-step2.png` - ステップ2: EasyMeshスイッチOFF
- `11_extender-step3.png` - ステップ3: Resetボタン
- `12_extender-step4.png` - ステップ4: 親機確認
- `13_extender-step4-wps-selected.png` - WPSボタンあり選択
- `14_extender-wps.png` - ステップ5: WPS接続
- `15_extender-wps-check.png` - ステップ6: 接続確認
- `16_extender-wps-check-success.png` - 接続成功
- `17_extender-position.png` - 位置調整
- `18_setup-complete.png` - 設定完了
- `19_nps.png` - NPS入力
- `20_nps-score-selected.png` - NPSスコア選択
- `21_final-complete.png` - 最終完了

#### マニュアル接続フロー
- `22_extender-step4-manual-selected.png` - WPSボタンなし選択
- `23_extender-manual.png` - 手動接続設定
- `24_extender-manual-login.png` - ログイン画面
- `25_extender-manual-check.png` - ランプ確認
- `26_extender-manual-check-success.png` - 接続成功
- `27_extender-position-manual.png` - 位置調整

#### エラーケース
- `28_extender-retry.png` - 再試行画面
- `29_extender-support.png` - サポート連絡画面

## カスタマイズ

`scripts/capture-flow.ts` を編集することで、以下をカスタマイズできます：

- キャプチャするフロー
- スクリーンショットのタイミング
- 画面サイズ
- 待機時間
- ヘッドレスモード（現在は `headless: false` で実際のブラウザが表示されます）

## トラブルシューティング

### ポート4173が使用中の場合

```bash
# プレビューサーバーを停止して再起動
Ctrl + C
npm run preview
```

### スクリーンショットが撮影されない場合

- プレビューサーバーが起動していることを確認
- `http://localhost:4173/support-flow` にアクセスできることを確認
- ブラウザのコンソールにエラーがないか確認

### 自動操作が失敗する場合

- 待機時間を増やす（`wait()` の引数を大きくする）
- セレクターが正しいか確認
- フローが変更されていないか確認
