import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/posts";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-16 px-6 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            ink
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            墨は、一滴一滴が文字を形成して文を成し、それが集まって書になります。
            1頁ずつを大事に、書を形成していきたいと思います。
          </p>
        </div>

        {/* Posts Section */}
        <section className="mt-4 w-full">
          <h2 className="mb-2 text-xl font-semibold text-black dark:text-zinc-50">
            コンテンツ
          </h2>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.slug} className="flex items-center justify-between">
                <Link
                  href={`/${p.slug}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {p.title}
                </Link>
                {p.description ? (
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {p.description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
