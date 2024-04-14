'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { TinyWaveFormIcon } from '@/components/wave-icon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-accent', 'fill-accent-dark']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
        )}
      >
       Some of these posts will be stories/thoughts I can look back on in future as an experiment to see how opinions/views can change.
       Other posts might be recipes or just random thoughts.
       Might help stop me getting all grumpy when im old, idk.
      </p>
    </section>
  )
}
