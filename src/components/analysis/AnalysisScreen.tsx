import type { ProductSlide } from '../../types/storefront'
import { Icon } from '../shared/Icon'
import './AnalysisScreen.css'

type AnalysisScreenProps = {
  closeOverlay: () => void
  muted: boolean
  product: ProductSlide
  setMuted: (value: boolean) => void
}

export function AnalysisScreen({
  closeOverlay,
  muted,
  product,
  setMuted,
}: AnalysisScreenProps) {
  return (
    <section className="analysis-screen">
      <header className="analysis-top">
        <button type="button" aria-label="Back" onClick={closeOverlay}>
          <Icon name="arrowLeft" />
        </button>
        <div>
          <button type="button" aria-label="Comments">
            <Icon name="chat" />
          </button>
          <button type="button" aria-label="Share">
            <Icon name="share" />
          </button>
        </div>
      </header>
      <main className="analysis-content">
        <h1>{product.title}</h1>
        <div className="analysis-video">
          {product.media.type === 'video' && product.media.src ? (
            <video
              src={product.media.src}
              poster={product.media.poster}
              muted={muted}
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img src={product.media.poster} alt="" />
          )}
          <div className="analysis-controls">
            <button type="button" onClick={() => setMuted(!muted)}>
              ⇵
            </button>
            <button type="button" onClick={() => setMuted(!muted)}>
              <Icon name="volumeX" />
            </button>
          </div>
        </div>
        <div className="analysis-dots" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="analysis-label">⚕ AI анализ по селфи</span>
        <div className="analysis-text">
          {product.details.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </main>
      <button className="blue-cta analysis-cta" type="button">
        <Icon name="camera" />
        Сделать селфи
      </button>
    </section>
  )
}
