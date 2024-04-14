import Link from 'next/link'

import { TinyWaveFormIcon } from '@/components/wave-icon'
import { AboutSection } from '@/components/about-section'
import { Search } from '@/components/search'
import { getAllPosts } from '@/lib/posts'

function GithubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg {...props} viewBox='0 0 98 96' xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" /></svg>
  )
}

function PersonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

function LinkedinIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" /></svg>
}

const Links = [
  ['Github', GithubIcon, 'https://github.com/tjbroodryk/'],
  ['LinkedIn', LinkedinIcon, 'https://www.linkedin.com/in/tjbroodryk/'],
] as const

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = await getAllPosts()

  return (
    <>
      <header className="bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Random Write-ups by</span>
          <span className="mt-4 flex gap-6 font-bold text-slate-900">
            Tj Broodryk
          </span>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:px-8 lg:py-12 xl:px-12">
          <div className="text-left">
            <p className="text-xl font-bold text-slate-900 mb-4 lg:mb-0">
              <Link href="/">Thoughts 'n stuff</Link>
            </p>
            <p className="hidden lg:inline-block mt-3 text-lg font-medium leading-8 text-slate-700">
              A space for me to write down stuff I don't want to forget.
            </p>
            <p className="hidden lg:inline-block mt-3 text-lg font-normal text-sm  text-slate-700">
            Written using nextjs, with bunjs and tailwind deployed on github pages.
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="hidden lg:block mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-primary', 'fill-primary-dark']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Links</span>
            </h2>
            <ul
              role="list"
              className="flex mt-4 justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {Links.map(([label, Icon, link]) => (
                <li key={label} className="flex">
                  <Link
                    href={link}
                    className="group flex items-center hover:underline"
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6 fill-slate-900" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="hidden lg:block mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-primary', 'fill-primary-dark']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Work</span>
            </h2>
            <Link
              href={`https://cotera.co`}
              className="hover:underline mt-4 justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
              aria-label={'Cotera'}
            >
              Cotera
            </Link>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Search posts={posts.map(x => x.meta)}/>
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-white py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Random Write-ups by</span><span className="ml-2.5 text-slate-900 font-bold">Tj Broodryk</span>
          </h2>
        </div>
      </footer>
    </>
  )
}