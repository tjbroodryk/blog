import { readdir } from 'fs/promises'
import { readFile } from 'fs/promises'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import z from 'zod'
import remarkToc from 'remark-toc'

const POSTS_DIR = path.join(process.cwd(), 'posts')

const getPost = async (id: string) => {
  const fileContent = await readFile(path.join(POSTS_DIR, id), 'utf-8')
  const content = await serialize(fileContent, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkToc]
    }
  })

  return {
    id: id.replace(/\.md$/, ''),
    content,
  }
}

const postSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  published: z.coerce.date(),
  excerpt: z.string(),
})

export type PostMeta = z.infer<typeof postSchema>

export const getAllPosts = async (): Promise<
  {
    meta: PostMeta
    md: MDXRemoteSerializeResult<
      Record<string, unknown>,
      Record<string, unknown>
    >
  }[]
> => {
  const fileNames = await readdir(POSTS_DIR)
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = path.join(POSTS_DIR, fileName)
      return await getPost(fileName)
    }),
  )


  return posts.map((p) => ({
    md: p.content,
    meta: postSchema.parse({
      ...p.content.frontmatter,
      id: p.id,
    }),
  }))
}

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content: string
  audio: {
    src: string
    type: string
  }
}
