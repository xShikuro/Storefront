import { storefrontConfig } from '../../data/storefrontConfig'
import './LogoMark.css'

export function LogoMark() {
  return (
    <span className="logo-mark">
      <img src={storefrontConfig.brand.logo} alt="" />
    </span>
  )
}
