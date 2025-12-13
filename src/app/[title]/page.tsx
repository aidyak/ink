import type { Metadata } from "next";
import Link from "next/link";
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
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-blue-600 dark:text-blue-400 underline hover:opacity-70"
      >
        ← Back to Home
      </Link>
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      ) : null}
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-6 mb-3 text-2xl font-semibold border-b border-zinc-300 dark:border-zinc-700 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-xl font-semibold">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="my-4 leading-7">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline hover:opacity-70"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-zinc-400 dark:border-zinc-600 pl-4 italic text-zinc-600 dark:text-zinc-400">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-zinc-700 dark:text-zinc-300">
                  {children}
                </code>
              );
            }
            const lang = className?.replace("language-", "") ?? "";
            return (
              <div className="relative">
                {lang && (
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-700 rounded-bl rounded-tr-lg">
                    {lang}
                  </span>
                )}
                <code className="block font-mono text-zinc-700 dark:text-zinc-300">
                  {children}
                </code>
              </div>
            );
          },
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4 text-sm border border-zinc-200 dark:border-zinc-700">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              className="my-4 rounded-lg shadow-md"
            />
          ),
          hr: () => (
            <hr className="my-8 border-zinc-300 dark:border-zinc-700" />
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
