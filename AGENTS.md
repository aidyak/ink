# Repository Guidelines

## プロジェクト構成と配置
- `src/app/layout.tsx`: 全体レイアウトとGeistフォントの適用。`globals.css`を読み込み、ルートのメタデータを定義。
- `src/app/page.tsx` → `src/app/ink/page.tsx` を委譲。実質的なトップページは `src/app/ink` ディレクトリ。
- `globals.css`: Tailwind v4のレイヤー宣言とテーマ変数（`--background`, `--foreground`）。全体のトーンをここで統一。
- `public/`: 画像や静的アセット置き場。ビルド時にそのまま公開される。
- `next.config.ts`: `output: "export"` で静的書き出し。`NEXT_PUBLIC_BASE_PATH` による `basePath/assetPrefix` 制御を確認してからデプロイ。

## 開発・ビルド・検証コマンド
- `pnpm dev`: 開発サーバーを `localhost:3000` で起動。`/ink` 配下がメインビュー。
- `pnpm build`: 本番用に静的エクスポート（デフォルトは `out/`）。`basePath` 設定を反映して出力。
- `pnpm start`: ビルド成果物をローカルでプレビュー（Nodeサーバー形式）。
- `pnpm lint`: Biomeによる静的解析とスタイルチェック。
- `pnpm format`: Biomeで自動整形。PR前に必ず実行。

## コーディングスタイルと命名
- 言語は TypeScript + React 19 + Next.js 16（App Router）。コンポーネントは関数コンポーネントで記述し、サーバーコンポーネントを優先。
- Tailwind CSS v4（`@tailwindcss/postcss`）を利用。デザイン調整は可能ならユーティリティクラスで完結させ、グローバル変数を触る場合は `globals.css` に限定。
- インデント2スペース、ダブルクオート、セミコロンあり（Biomeデフォルトに従う）。
- コンポーネント/型名はPascalCase、フックは`useXxx`。フォルダとルートは小文字ケバブまたは小文字単語で統一。

## テスト方針
- 現在自動テストは未導入。追加する場合は `src/__tests__/` または対象コンポーネント直下に配置し、将来的にVitest/Jestいずれかで統一する想定。
- 手動確認: `pnpm dev` で起動し `/` と `/ink` をライト/ダークで目視。レイアウト崩れとフォント読み込み、`basePath` 反映を確認。
- 本番前チェックの最低ライン: `pnpm lint` と `pnpm build` が成功すること。

## コミットとPRルール
- 履歴は `feat`, `fix`, `chore` などConventional Commitsに近い前置きを使用。短い命令形で目的を明示（例: `fix: adjust base path handling`）。
- 1コミット1論点を意識し、大きな変更は分割。コミット前に lint/format を実行。
- PRには以下を記載: 変更概要、確認手順（使用コマンドや動作画面）、関連Issue/チケット、UI変更があればスクリーンショット（ライト/ダーク両方歓迎）、影響範囲（ページ/環境）。

## 環境・デプロイの注意
- Next.jsの静的エクスポート前提。GitHub Pages等に配置する場合は `NEXT_PUBLIC_BASE_PATH`（例: `/ink`）を設定し、生成物 `out/` をデプロイ。
- 画像最適化は無効化済み（`images.unoptimized: true`）。外部最適化が必要な場合はビルドパイプライン側で対応。
- 推奨ランタイム: Node.js 20 LTS 以上、`pnpm` 9 系。ローカル差異を避けるため、同バージョンでの動作を推奨。
