import { PostMeta } from "@/lib/posts"
import { FormattedDate } from '@/components/formatted-date';
import Link from "next/link";
import { Container } from "./container";

export function PostEntry({ post }: { post: PostMeta }) {
  let date = new Date(post.published)

  return (
    <article
      aria-labelledby={`post-${post.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${post.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${post.category}/${post.id}`}>{post.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link
              href={`/${post.category}`}
              className="capitalize flex items-center text-sm font-bold leading-6 text-accent hover:text-accent-dark active:text-accent-dark"
            >
              {post.category}
            </Link>
            <span className='ml-2 mr-2 text-slate-800'>/</span>
            <Link
              href={`/${post.category}/${post.id}`}
              className="flex items-center text-sm font-bold leading-6 text-primary hover:text-primary-dark active:text-primary-dark"
              aria-label={`Read full post for article ${post.title}`}
            >
              Read more
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}
