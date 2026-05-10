import MegaMenu from '@/components/ui/mega-menu'
import type { MegaMenuItem } from '@/components/ui/mega-menu'
import {
  BookOpen,
  Download,
  Star,
  Mail,
  Phone,
  Globe,
  Eye,
  Aperture,
} from 'lucide-react'

const DEFAULT_NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: 'Galerie',
    subMenus: [
      {
        title: 'Deine Fotos',
        items: [
          { label: 'Alle Fotos', description: 'Deine gesamte Auswahl', icon: BookOpen },
          { label: 'Highlights', description: 'Die besten Momente', icon: Star },
          { label: 'Download', description: 'Fotos herunterladen', icon: Download },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Portfolio',
    subMenus: [
      {
        title: 'Arbeiten',
        items: [
          { label: 'Porträt', description: 'Authentische Momente', icon: Eye },
          { label: 'Analog', description: 'Filmfotografie', icon: Aperture },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Kontakt',
    align: 'right',
    subMenus: [
      {
        title: 'Erreichbar über',
        items: [
          { label: 'E-Mail', description: 'f.wie03@gmail.com', icon: Mail },
          { label: 'Telefon', description: 'Auf Anfrage', icon: Phone },
          { label: 'Instagram', description: '@felixwiederstein', icon: Globe },
        ],
      },
    ],
  },
]

interface SiteHeaderProps {
  navItems?: MegaMenuItem[]
}

export function SiteHeader({ navItems = DEFAULT_NAV_ITEMS }: SiteHeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
      style={{ backgroundColor: '#1a1714' }}
    >
      <a
        href="/"
        className="text-white/90 text-sm font-medium hover:text-white transition-colors duration-200"
        style={{ letterSpacing: '0.06em' }}
      >
        Felix Wiederstein
      </a>
      <MegaMenu items={navItems} />
    </header>
  )
}
