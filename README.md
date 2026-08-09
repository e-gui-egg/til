# Astro Static Blog

Astro と Oxc（Oxlint / Oxfmt）を使った静的ブログのスターターです。

```sh
pnpm install
pnpm dev
```

## Commands

- `pnpm dev`: 開発サーバーを起動
- `pnpm build`: 静的サイトを `dist/` に生成
- `pnpm lint`: Oxlint でコードを検査
- `pnpm format`: Oxfmt でファイルを整形
- `pnpm check`: lint、format、Astro の型チェックをまとめて実行

## CI/CD

GitHub Actions は push と pull request ごとに `pnpm check` と `pnpm build` を実行します。
`main` ブランチへの push 後は、成功した静的サイトを GitHub Pages にデプロイします。

初回のみ、GitHub リポジトリの **Settings → Pages → Build and deployment → Source** で
**GitHub Actions** を選択してください。
