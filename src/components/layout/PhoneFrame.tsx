import type { ReactNode } from 'react'
import './PhoneFrame.css'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return <div className="phone-shell">{children}</div>
}
