import type { IconName } from '../../types/storefront'
import { Icon } from '../shared/Icon'
import './DrawerHeader.css'

type DrawerHeaderProps = {
  closeOverlay: () => void
  icon: IconName
  meta?: string
  title: string
}

export function DrawerHeader({ closeOverlay, icon, meta, title }: DrawerHeaderProps) {
  return (
    <>
      <div className="drawer-handle" />
      <header className="drawer-header">
        <div className="header-icon">
          <Icon name={icon} />
        </div>
        <div>
          <strong>{title}</strong>
          {meta && <span>{meta}</span>}
        </div>
        <button type="button" aria-label={`Close ${title}`} onClick={closeOverlay}>
          <Icon name="x" />
        </button>
      </header>
    </>
  )
}
