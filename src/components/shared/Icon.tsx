import type { IconName } from '../../types/storefront'

export function Icon({ name }: { name: IconName }) {
  const common = {
    'aria-hidden': true,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 2,
    viewBox: '0 0 24 24',
  }

  switch (name) {
    case 'arrowLeft':
      return (
        <svg {...common}>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      )
    case 'bag':
      return (
        <svg {...common}>
          <path d="M6 8h12l-1 12H7L6 8Z" />
          <path d="M9 8a3 3 0 0 1 6 0" />
        </svg>
      )
    case 'camera':
      return (
        <svg {...common}>
          <path d="M4 8h4l2-3h4l2 3h4v11H4V8Z" />
          <circle cx="12" cy="13" r="3.3" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="m20 6-11 11-5-5" />
        </svg>
      )
    case 'chat':
      return (
        <svg {...common}>
          <path d="M21 12a8.2 8.2 0 0 1-8.7 8.1 9 9 0 0 1-3.8-.9L4 20.4l1.2-4A8 8 0 1 1 21 12Z" />
        </svg>
      )
    case 'external':
      return (
        <svg {...common}>
          <path d="M14 4h6v6" />
          <path d="m10 14 10-10" />
          <path d="M20 14v6H4V4h6" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      )
    case 'flag':
      return (
        <svg {...common}>
          <path d="M6 20V5" />
          <path d="M6 5c4-2 6 2 10 0v9c-4 2-6-2-10 0" />
        </svg>
      )
    case 'google':
      return (
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.7 3-4.2 3-7.3Z" />
          <path d="M12 22c2.7 0 5-.9 6.6-2.5L15.4 17c-.9.6-2 .9-3.4.9a5.9 5.9 0 0 1-5.5-4H3.2v2.6A10 10 0 0 0 12 22Z" />
          <path d="M6.5 13.9a6 6 0 0 1 0-3.8V7.5H3.2a10 10 0 0 0 0 9l3.3-2.6Z" />
          <path d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.8 9.8 0 0 0 12 2a10 10 0 0 0-8.8 5.5l3.3 2.6A5.9 5.9 0 0 1 12 6.1Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect width="16" height="16" x="4" y="4" rx="5" />
          <circle cx="12" cy="12" r="3.2" />
          <path d="M17.3 6.8h.01" />
        </svg>
      )
    case 'mapPin':
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>
      )
    case 'send':
      return (
        <svg {...common}>
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          <path d="M22 2 11 13" />
        </svg>
      )
    case 'share':
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 10.6 6.8-4.2" />
          <path d="m8.6 13.4 6.8 4.2" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="m12 3 1.8 5.1L19 10l-5.2 1.9L12 17l-1.8-5.1L5 10l5.2-1.9L12 3Z" />
          <path d="m5 16 .8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z" />
        </svg>
      )
    case 'star':
      return (
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8Z" />
        </svg>
      )
    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      )
    case 'volume':
      return (
        <svg {...common}>
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      )
    case 'volumeX':
      return (
        <svg {...common}>
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="m19 9-5 5" />
          <path d="m14 9 5 5" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )
    default:
      return null
  }
}
