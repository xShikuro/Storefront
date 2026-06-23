import { media } from '../../data/assets'
import './LogoMark.css'

export function LogoMark() {
  return (
    <span className="logo-mark">
      <img src={media.logo} alt="" />
    </span>
  )
}
