import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllPostSlugs, getPostBySlug } from "@/content/posts";

type Params = { title: string };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ title: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { title } = await params;
  const post = getPostBySlug(title);
  if (!post) {
    return { title: "記事が見つかりません" };
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { title } = await params;
  const post = getPostBySlug(title);
  if (!post) notFound();

  return (
    <article className="prose mx-auto max-w-3xl px-6 py-12 text-black dark:text-zinc-50">
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      ) : null}
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}