# Wi-Fi ルーター サポートフロー

Wi-Fiルーターの設定や問題解決をサポートするWebアプリケーションです。

## フローチャート

```mermaid
---
config:
  layout: dagre
---
flowchart LR
    start["start"] --> n1["商品の選び方・仕様"] & n2["設定方法"]
    n2 --> n14["購入製品入力"]
    n3["今までのWi-Fiルーターと交換"] --> n10["スマート引っ越し対応"]
    n10 -- Yes --> n8["スマート引っ越し"]
    n10 -- No --> n9["無線引っ越し"]
    n4["故障して買い替え"] --> n11["前回スマート<br>引っ越し使用"]
    n11 -- Yes --> n8
    n11 -- No --> n12["親機設定"]
    n5["新規に設置"] --> n12
    n6["中継機として使用"] --> n13["中継設定"]
    n14 -- 親機 --> n15["利用方法"]
    n14 -- 子機 --> n6
    n15 --> n6 & n4 & n3
    n15 --> n5
    n2@{ shape: diam}
    n14@{ shape: manual-input}
    n10@{ shape: diam}
    n8@{ shape: subproc}
    n9@{ shape: subproc}
    n11@{ shape: diam}
    n12@{ shape: subproc}
    n13@{ shape: subproc}
    n15@{ shape: manual-input}
```

## 技術仕様

- **フレームワーク**: SvelteKit (TypeScript)
- **CSSフレームワーク**: Bootstrap 5
- **アイコン**: Bootstrap Icons
- **デプロイ**: 静的サイト（@sveltejs/adapter-static）

## 開発環境のセットアップ

### 依存関係のインストール

```sh
npm install
```

### 開発サーバーの起動

```sh
npm run dev
```

開発サーバーは http://localhost:5173/ で起動します。

## ビルド・デプロイ

### 静的サイトのビルド

```sh
npm run build
```

ビルドされたファイルは `build` ディレクトリに生成されます。

### プレビュー

ビルドされた静的サイトをローカルでプレビューできます：

```sh
npm run preview
```

プレビューサーバーは http://localhost:4173/ で起動します。

## デプロイ方法

このアプリケーションは静的サイトとしてビルドされるため、以下のホスティングサービスにデプロイできます：

### GitHub Pages

1. `build` ディレクトリの内容をgh-pagesブランチにプッシュ
2. GitHub PagesでそのブランチをWebサイトとして公開

または、GitHubリポジトリにプッシュすると自動的にGitHub Actionsでビルド・デプロイされます（`.github/workflows/deploy.yml`を参照）。

### その他のホスティングサービス

- Firebase Hosting
- AWS S3 + CloudFront
- Cloudflare Pages
- 任意のWebサーバー（Apache、Nginx等）

`build` ディレクトリの内容をWebサーバーのドキュメントルートにアップロードするだけで動作します。

## 機能

- **レスポンシブデザイン**: デスクトップ・タブレット・モバイル対応
- **直感的なナビゲーション**: フローチャートに基づいた段階的なガイド
- **状態管理**: 現在の選択状況の表示
- **アクセシビリティ**: 適切なセマンティックHTML

## コントリビューション

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/new-feature`)
3. 変更をコミット (`git commit -am 'Add new feature'`)
4. ブランチをプッシュ (`git push origin feature/new-feature`)
5. プルリクエストを作成
