import { Container } from '@/components/container'
import { getAllPosts, type PostMeta } from '@/lib/posts'
import { PostEntry } from '@/components/post-entry'

export default async function Home() {
  const posts = await getAllPosts()

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.meta.published).getTime() - new Date(a.meta.published).getTime()
  })

  return (
    <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Posts
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {sortedPosts.map((post) => (
          <PostEntry key={post.meta.id} post={post.meta} />
        ))}
      </div>
    </div>
  )
}

export const revalidate = 10
