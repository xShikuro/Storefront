import { LogoMark } from '../shared/LogoMark'
import { QRPattern } from '../shared/QRPattern'
import './DesktopQR.css'

export function DesktopQR() {
  return (
    <aside className="desktop-qr" aria-label="Mobile app QR">
      <span>SCAN FOR MOBILE APP</span>
      <QRPattern />
      <div className="qr-brand">
        <LogoMark />
        <span>T A T C H A</span>
      </div>
      <div className="qr-line" />
      <strong>
        Unlock the
        <br />
        full potential.
      </strong>
      <p>Scan to experience our mobile version.</p>
      <small>VIBEADD</small>
    </aside>
  )
}
