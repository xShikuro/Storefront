import type { Overlay, ProductEngagement, ProductSlide } from '../../types/storefront'
import { Icon } from '../shared/Icon'
import './ActionRail.css'

type ActionRailProps = {
  activeProduct: ProductSlide
  cartQuantity: number
  engagement: ProductEngagement
  muted: boolean
  overlay: Overlay
  openOverlay: (overlay: Overlay) => void
  setMuted: (updater: (value: boolean) => boolean) => void
  share: () => void
}

export function ActionRail({
  activeProduct,
  cartQuantity,
  engagement,
  muted,
  overlay,
  openOverlay,
  setMuted,
  share,
}: ActionRailProps) {
  return (
    <div className="action-rail" aria-label="Product actions">
      <button type="button" aria-label="AI Chat" onClick={() => openOverlay('chat')}>
        <Icon name="sparkles" />
        {activeProduct.cta === 'analysis' && (
          <span className="rail-note">Анализ лица</span>
        )}
      </button>
      <button type="button" aria-label="Cart" onClick={() => openOverlay('cart')}>
        <Icon name="bag" />
        {cartQuantity > 0 && <span className="rail-badge">{cartQuantity}</span>}
      </button>
      <button
        className={overlay === 'search' ? 'is-blue' : ''}
        type="button"
        aria-label="Search"
        onClick={() => openOverlay('search')}
      >
        <Icon name="search" />
      </button>
      <button
        className={overlay === 'reviews' ? 'is-blue' : ''}
        type="button"
        aria-label={`Reviews: ${engagement.reviews.length}`}
        onClick={() => openOverlay('reviews')}
      >
        <Icon name="chat" />
        {engagement.reviews.length > 0 && (
          <span className="rail-count">{engagement.reviews.length}</span>
        )}
      </button>
      <button
        className={!muted ? 'is-sound-on' : ''}
        type="button"
        aria-label={muted ? 'Unmute' : 'Mute'}
        aria-pressed={!muted}
        onClick={() => setMuted((value) => !value)}
      >
        <Icon name={muted ? 'volumeX' : 'volume'} />
      </button>
      <button type="button" aria-label="Share" onClick={share}>
        <Icon name="share" />
      </button>
      <button type="button" aria-label="Login" onClick={() => openOverlay('login')}>
        <Icon name="user" />
      </button>
    </div>
  )
}
