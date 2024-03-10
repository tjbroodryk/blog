'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

const Li = (props: React.ComponentPropsWithoutRef<'li'>) => {
  return (
    <li className="mt-2 text-sm leading-7 text-slate-500" {...props} />
  )
}

const Img = (props: React.ComponentPropsWithoutRef<'img'>) => {
  return (
    <img className="w-full h-auto shadow-lg rounded-lg" {...props} />
  )
}

const H2 = (props: React.ComponentPropsWithoutRef<'h2'>) => {
  return (
    <h2 
    id={typeof props.children === 'string' ? toKebabCase(props.children) : undefined}
    className="
    tracking-tighter
    mt-4 
    text-md
    font-medium
    mt-12 
    flex 
    items-center 
    font-mono
    leading-7 
    text-slate-900 
    before:mr-3 
    before:h-3 
    before:w-1.5 
    before:rounded-r-full 
    before:bg-emerald-300 
    " {...props} />
  )
}

export default function MdxRenderer({ mdxSource }: {
  mdxSource: MDXRemoteSerializeResult
}) {
  return <MDXRemote {...mdxSource} components={{
    li: Li,
    h2: H2,
    img: Img,
  }} />
}

function toKebabCase(str: string): string {
  return str
    .replace(/(.)([A-Z][a-z]+)/g, '$1-$2') // Places a hyphen between camel cased words.
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Places a hyphen between a lowercase letter followed by an uppercase letter.
    .replace(/\s+/g, '-') // Replaces spaces with hyphens.
    .replace(/--+/g, '-') // Replaces multiple hyphens with a single one.
    .toLowerCase(); // Converts the string to lowercase.
}
