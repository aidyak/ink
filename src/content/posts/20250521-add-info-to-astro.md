---
title: Astro で各記事に日付と著者名を入れる
description: フロントマターとAstroについて調べてみました
date: "2025-05-21"
---

このサイトは Astro で作っており、それぞれの記事には markdown を使っています。
ファイル名は適当ですが、記事自体には作成日が欲しいな、ついでに著者名も入れようと思って調べてみました。

早速答えですが
`pages/posts/`配下に記事を書くようにして、フロントマターをそれぞれの記事に書きます。
例えばこの記事でしたら

```
---
layout: ../../layouts/Post.astro
author: "aidyak"
date: "2025-05-21"
---

# Astroで各記事に日付と著者名を入れる
```

という感じにします。
また、`layouts/Post.astro`もざっくりこんな感じにします。

```
---
import "../styles/post.css";
const { frontmatter } = Astro.props;
---

<article>
  <header>
    <p>
      <span>by {frontmatter.author}</span>
      <span> | </span>
      <span>{frontmatter.date}</span>
    </p>
  </header>
  <slot />
</article>
```

以上です。
