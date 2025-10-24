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

`screenshots/` ディレクトリにシナリオごとにファイルが保存されます：

#### シナリオ1: WPS接続フロー（21枚）

完全な成功パスのキャプチャ：

- `scenario1-01_top.png` - トップページ
- `scenario1-02_product-input.png` - 製品入力画面
- `scenario1-03_product-confirmed.png` - 製品確認
- `scenario1-04_usage.png` - 利用方法選択
- `scenario1-05_relay.png` - 中継機として使用
- `scenario1-06_old-router-input.png` - 既存機器入力
- `scenario1-07_relay-setup.png` - 中継機設定開始
- `scenario1-08_extender-start.png` - 準備するもの
- `scenario1-09_extender-step1.png` - ステップ1: 中継機の設置
- `scenario1-10_extender-step2.png` - ステップ2: EasyMeshスイッチOFF
- `scenario1-11_extender-step3.png` - ステップ3: Resetボタン
- `scenario1-12_extender-step4.png` - ステップ4: 親機確認
- `scenario1-13_extender-step4-wps-selected.png` - WPSボタンあり選択
- `scenario1-14_extender-wps.png` - ステップ5: WPS接続
- `scenario1-15_extender-wps-check.png` - ステップ6: 接続確認
- `scenario1-16_extender-wps-check-success.png` - 接続成功
- `scenario1-17_extender-position.png` - 位置調整
- `scenario1-18_setup-complete.png` - 設定完了
- `scenario1-19_nps.png` - NPS入力
- `scenario1-20_nps-score-selected.png` - NPSスコア選択
- `scenario1-21_final-complete.png` - 最終完了

#### シナリオ2: マニュアル接続フロー（6枚）

WPSボタンがない場合の手動設定フロー：

- `scenario2-01_extender-step4-manual-selected.png` - WPSボタンなし選択
- `scenario2-02_extender-manual.png` - 手動接続設定
- `scenario2-03_extender-manual-login.png` - ログイン画面
- `scenario2-04_extender-manual-check.png` - ランプ確認
- `scenario2-05_extender-manual-check-success.png` - 接続成功
- `scenario2-06_extender-position-manual.png` - 位置調整

#### シナリオ3: エラーケース（2枚）

エラー発生時の画面：

- `scenario3-01_extender-retry.png` - 再試行画面
- `scenario3-02_extender-support.png` - サポート連絡画面

**合計: 29枚**

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
