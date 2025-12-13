# ink

GitHub Pages で公開している個人ブログサイト。

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript 5 |
| Runtime | Bun |
| Styling | Tailwind CSS 4 |
| Content | Markdown + gray-matter + react-markdown |
| Linter | Biome, oxlint |
| CI/CD | GitHub Actions → GitHub Pages |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Lint
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Adding a Post

`src/content/posts/` に Markdown ファイルを追加:

ファイル名がそのまま URL スラッグになります。
