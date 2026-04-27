import reeferLogo from '../assets/reefer-logo.png'
import reeferImage from '../assets/reefer.png'

const reeferGallery = Array.from({ length: 5 }, (_, index) => ({
  id: `reefer-gallery-${index + 1}`,
  src: reeferImage,
  alt: 'Reefer oversized T-shirt',
}))

export const portfolioArchiveItems = Array.from({ length: 12 }, (_, index) => ({
  id: `reefer-${index + 1}`,
  slug: 'reefer',
  title: 'Reefer',
  subtitle: 'Silkscreen Printed Oversized T-shirt',
  image: reeferImage,
  badge: reeferLogo,
}))

export const portfolioExpandedItems = {
  reefer: {
    slug: 'reefer',
    title: 'Reefer',
    subtitle: 'Silkscreen Printed Oversized T-shirt',
    badge: reeferLogo,
    gallery: reeferGallery,
    details: [
      { label: 'Fit Style:', value: 'Oversized' },
      { label: 'Fabric:', value: 'Soft & Lightweight (240 GSM)' },
      { label: 'Printing Method:', value: 'Silkscreen' },
      { label: 'Neckline:', value: 'Pro Club' },
    ],
  },
}

export const portfolioExpandedDefaultSlug = 'reefer'
