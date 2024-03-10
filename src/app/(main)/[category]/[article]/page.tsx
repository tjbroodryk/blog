import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/posts'
import MdxRenderer from '@/components/markdown'
import { FormattedDate } from '@/components/formatted-date'
import { Container } from '@/components/container';

const getPost = cache(async (id: string) => {
  const allPosts = await getAllPosts()
  const post = allPosts.find((post) => post.meta.id.toString() === id)

  if (!post) {
    notFound()
  }

  return post
})

export async function generateMetadata({
  params,
}: {
  params: { article: string }
}) {
  const post = await getPost(params.article)

  return {
    title: post.meta.title,
  }
}

export default async function Md({ params }: { params: { article: string } }) {
  const post = await getPost(params.article)

  return <article className="py-16 lg:py-36">
    <Container>
      <header className="flex flex-col">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="mt-2 text-4xl font-bold text-slate-900 tracking-tighter">
              {post.meta.title}
            </h1>
            <FormattedDate
              date={post.meta.published}
              className="order-first font-mono text-sm leading-7 text-slate-500"
            />
          </div>
        </div>
        <p className="mt-3 text-md font-medium leading-8 text-slate-500">
          {post.meta.excerpt}
        </p>
      </header>
      <hr className="my-12 border-gray-200" />
        <div
          className="
          prose prose-slate 
          mt-14 
          [&>h2:nth-of-type(3n)]:before:bg-emerald-200 
          [&>h2:nth-of-type(3n+2)]:before:bg-emerald-400 
          [&>ul]:mt-6 
          [&>ul]:list-['\2013\20'] 
          [&>ul]:pl-5"
        >
      <MdxRenderer mdxSource={post.md} />
      </div>
    </Container>
  </article>
}

export async function generateStaticParams() {
  const files = await getAllPosts()

  return files.map((file) => ({
    category: file.meta.category.toString(),
    article: file.meta.id.toString(),
  }))
}