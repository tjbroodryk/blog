'use client'

import { useSearchParams } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"
import { Modal } from "./modal"
import Fuse from 'fuse.js'
import { PostMeta } from "@/lib/posts"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useRoveFocus } from "./hooks"
import { useKeyPressEvent } from "react-use"


export const Search: React.FC<{
  posts: PostMeta[]
}> = ({ posts }) => {
  const f = useMemo(() => new Fuse(posts, {
    keys: [
      'title',
      'excerpt',
      'category'
    ]
  }), [posts])

  const ref = React.useRef<HTMLInputElement>(null)
  const router = useRouter();
  const searchParams = useSearchParams()
  const [show, setShow] = useState(false)
  const results = f.search(searchParams.get('search') ?? '')
  const [focus, setFocus] = useRoveFocus(results.length ?? 0);

  useKeyPressEvent((e) => e.key === '/', () => {
    setShow(true)
  })

  useKeyPressEvent((e) => e.key === 'Escape', () => {
    if(show) {
      setShow(false)
    }
  })

  useEffect(() => {
    if(!show) {
      ref.current?.blur()
      setFocus(0)
    }
  }, [show])

  useEffect(() => {
    if(focus === 0 && ref.current !== document.activeElement) {
      ref.current?.focus()
    }
  }, [focus])

  return (
    <>
      <div className="mx-auto sm:px-6 md:max-w-3xl md:px-2 lg:px-0 mt-8">
        <div className="w-1/2 text-sm focus:outline-slate-600 px-3 py-1.5 border-slate-200 border rounded-md cursor-pointer" onClick={() => {
          setShow(!show)
        }}>
          {searchParams.get('search')?.length ? `${searchParams.get('search')}` : 'Search...'}
        </div>
      </div>
      {show && <Modal onClose={() => setShow(false)}>
        <div className="flex flex-col w-[500px]">
          <input ref={ref} autoFocus className="w-full text-sm focus:outline-slate-600 px-3 py-1.5 border-slate-200 border rounded-md" value={searchParams.get('search') ?? ''} placeholder="Search..." onChange={e => {
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.set('search', e.target.value)
            router.push(`?${currentParams.toString()}`)
          }} />
          <div className="divide-y divide-slate-100 mt-4">
            {results.map((result) => (
              <ResultItem
                key={result.item.id}
                id={result.item.id}
                title={result.item.title}
                excerpt={result.item.excerpt}
                category={result.item.category}
                onClick={() => {
                  setShow(false)
                }}
                focus={focus === results.map(x => x.item.id).indexOf(result.item.id)+1}
              />
            ))}
          </div>
        </div>
      </Modal>}
    </>
  )
}

const ResultItem: React.FC<{
  title: string
  excerpt: string
  category: string
  onClick: () => void
  id: string
  focus: boolean
}> = ({ title, excerpt, category, onClick, focus, id }) => {
  const focusRef = React.useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (focus && focusRef?.current) {
      focusRef?.current.focus();
    }
  }, [focus]);

  return (
    <div className={`p-2 rounded-md ${focus ? 'bg-slate-100' : ''}`}>
      <Link 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            focusRef.current?.click()
          }
        }} 
        ref={focusRef} 
        onClick={onClick} 
        href={`/${category}/${id}`} 
        className="text-primary focus:ring-0 focus:outline-0">
          {title}
      </Link>
      <p className="text-slate-500">{excerpt}</p>
    </div>
  )
}