import { LogoMark } from './LogoMark'
import './QRPattern.css'

export function QRPattern() {
  const dots = Array.from({ length: 21 * 21 }, (_, index) => {
    const row = Math.floor(index / 21)
    const col = index % 21
    const inCorner =
      (row < 7 && col < 7) ||
      (row < 7 && col > 13) ||
      (row > 13 && col < 7)
    const active =
      inCorner ||
      (row * 7 + col * 11 + row * col) % 5 === 0 ||
      (row + col) % 9 === 0

    return <span className={active ? 'is-active' : ''} key={index} />
  })

  return (
    <div className="qr">
      <div className="qr-grid">{dots}</div>
      <LogoMark />
    </div>
  )
}
