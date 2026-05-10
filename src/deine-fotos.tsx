import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PhotoGallery } from '@/components/ui/gallery'
import { SiteHeader } from '@/components/ui/site-header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteHeader />
    <main className="min-h-screen pt-14" style={{ backgroundColor: '#16120f' }}>
      <PhotoGallery />
    </main>
  </StrictMode>
)
