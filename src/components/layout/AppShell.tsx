import type { ReactNode } from 'react'
import { DesktopQR } from './DesktopQR'
import './AppShell.css'

type AppShellProps = {
  children: ReactNode
  showQr?: boolean
}

export function AppShell({ children, showQr = true }: AppShellProps) {
  return (
    <main className={`experience ${showQr ? '' : 'experience--single'}`}>
      {children}
      {showQr && <DesktopQR />}
    </main>
  )
}
