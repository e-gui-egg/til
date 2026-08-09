# Issue Journal

GitHub Issues を CMS として使う Astro 製の静的ブログです。Pull Request を除く Issue が記事になり、Issue に付けた label がタグになります。

```sh
pnpm install
pnpm dev
```

公開リポジトリでは設定なしで動作します。API のレート制限を避けたい場合や private リポジトリで使う場合は、`GITHUB_TOKEN` と `GITHUB_REPOSITORY=owner/repo` を環境変数に設定してください。

## Publishing

1. GitHub で Issue を作成し、タイトルと Markdown 本文を入力
2. label を付けて記事を分類
3. Issue の作成・編集・label 変更を契機に GitHub Pages が自動再ビルド

Issue の open / closed 状態は記事メタデータとして表示されます。記事を非公開にする場合は Issue を削除してください。

## Commands

- `pnpm dev`: 開発サーバーを起動
- `pnpm build`: 静的サイトを `dist/` に生成
- `pnpm lint`: Oxlint でコードを検査
- `pnpm format`: Oxfmt でファイルを整形
- `pnpm check`: lint、format、Astro の型チェックをまとめて実行

## CI/CD

GitHub Actions は push と pull request ごとに `pnpm check` と `pnpm build` を実行します。
`main` ブランチへの push 後は、成功した静的サイトを GitHub Pages にデプロイします。
公開 URL は独自ドメインの `https://til.e-gui-egg.dev/` 直下です。

Issue / Pull Request のラベルは `.github/labels.yml` で管理します。
このファイルを `main` ブランチへ反映すると、GitHub Actions がリポジトリのラベルを自動で同期します。

初回のみ、GitHub リポジトリの **Settings → Pages → Build and deployment → Source** で
**GitHub Actions** を選択してください。
