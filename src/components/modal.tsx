'use client'

import { PropsWithChildren } from "react"
import { createPortal } from "react-dom"

export const Modal: React.FC<PropsWithChildren<{
  onClose?: () => void
}>> = ({ children, onClose }) => {
  return (
    createPortal(<>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={onClose}/>
      <div className="fixed bg-white inset-0 w-fit h-fit mx-auto my-12 p-4 rounded-lg z-50">
        {children}
      </div>
    </>, document.body)
  )
}