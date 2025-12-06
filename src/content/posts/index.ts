export type Post = {
    slug: string;
    title: string;
    date: string;
    description?: string;
    body?: string;
}

export const posts: Post[] = [
    {
        slug: "first-post",
        title: "My First Post",
        date: "2024-06-01",
        description: "This is the description of my first post.",
        body: "Welcome to my first post! This is where I share my thoughts and ideas."
    },
    {
        slug: "second-post",
        title: "Another Day, Another Post",
        date: "2024-06-15",
        description: "Insights and reflections in my second post.",
        body: "In this post, I delve deeper into my experiences and share more insights."
    },
];