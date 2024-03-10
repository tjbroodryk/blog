import { cache } from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { getAllPosts } from '@/lib/posts'
import { PostEntry } from '@/components/post-entry'
import Link from 'next/link'


const getCategory = cache(async (id: string) => {
  const allPosts = await getAllPosts()
  const post = allPosts.find((post) => post.meta.category.toString() === id)

  if (!post) {
    notFound()
  }

  return post
})

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const post = await getCategory(params.category)

  return {
    title: post.meta.title,
  }
}

export default async function Page({ params }: { params: { category: string } }) {
  const posts = (await getAllPosts()).filter(p => p.meta.category === params.category)

  return (
    <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Posts in <Link href={`/${params.category}`} className='text-primary capitalize'>{params.category}</Link>
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {posts.map((post) => (
          <PostEntry key={post.meta.id} post={post.meta} />
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const files = await getAllPosts()

  return files.map((file) => ({
      category: file.meta.category,
  }))
}