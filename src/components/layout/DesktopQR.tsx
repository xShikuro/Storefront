import { storefrontConfig } from '../../data/storefrontConfig'
import { LogoMark } from '../shared/LogoMark'
import { QRPattern } from '../shared/QRPattern'
import './DesktopQR.css'

export function DesktopQR() {
  const { brand, qr } = storefrontConfig

  return (
    <aside className="desktop-qr" aria-label={qr.ariaLabel}>
      <span>{qr.title}</span>
      <QRPattern />
      <div className="qr-brand">
        <LogoMark />
        <span>{brand.displayName}</span>
      </div>
      <div className="qr-line" />
      <strong>
        {qr.headline[0]}
        <br />
        {qr.headline[1]}
      </strong>
      <p>{qr.description}</p>
      <small>{qr.footer}</small>
    </aside>
  )
}
