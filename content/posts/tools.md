---
title: 'Tools'
subtitle: Time to modernize
type: Post
date: '2023-09-24'
---

## State
- [Zustand]

| Month    | Savings |
| -------- | ------- |
| Zustand  | $250    |
| Jotai | $80     |
| March    | $420    |

## Styling

## Better styling

This site previously used CSS modules. For this rebuild I decided to reach for
[Panda](https://panda-css.com/). I liked the similarity in syntax to
[Stitches](https://stitches.dev/), but with the added benefits of better type
safety, less runtime overhead, and the ability to compose style
[recipes](https://panda-css.com/docs/concepts/recipes) without coupling them to
a React component.

## Easier to write

Content like this post is written in [MDX](https://mdxjs.com/), and managed by
[ContentLayer](https://contentlayer.dev/). In a previous iteration of this site,
I used custom scripts to convert MDX to

- [readingTime](https://www.npmjs.com/package/reading-time) allows me to add a
  "2 min read" estimate to the top of each post.

## More type-safe

A few years ago I cared a lot less about type-safety than I do now. In this
refresh I added some missing type-coverage, and added a few libraries to help:

- [TypeScript](https://www.typescriptlang.org/) for type-safety.
