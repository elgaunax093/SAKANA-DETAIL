'use client'
import { useTranslation } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useTranslation()

  const links = [
    { href: '#servicios', key: 'linkServicios' },
    { href: '#resenas', key: 'linkResenas' },
    { href: '#proceso', key: 'linkProceso' },
    { href: '#contacto', key: 'linkContacto' },
  ] as const

  return (
    <footer className="bg-[rgb(var(--bg-deep))] border-t border-[rgb(var(--bg-surface))] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="font-display text-xl tracking-display text-[rgb(var(--text-primary))] uppercase">
                Sakana Detail
              </span>
              <span className="text-[rgb(var(--accent-gold))] text-2xl leading-none mb-1">·</span>
            </div>
            <p className="font-body text-xs text-[rgb(var(--text-faint))] font-light">
              {t('footer.locationSubtitle')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-xs text-[rgb(var(--text-faint))] hover:text-[rgb(var(--accent-gold))] transition-colors duration-200 tracking-wide"
              >
                {t(`footer.${l.key}`)}
              </a>
            ))}
          </div>

          {/* Redes */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/sakana.detail?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[rgb(var(--text-faint))] hover:text-[rgb(var(--accent-gold))] transition-colors duration-200 tracking-label uppercase"
            >
              {t('footer.instagram')}
            </a>
            <span className="text-[rgb(var(--border-subtle))]">·</span>
            <a
              href="https://www.tiktok.com/@sakana.detail?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[rgb(var(--text-faint))] hover:text-[rgb(var(--accent-gold))] transition-colors duration-200 tracking-label uppercase"
            >
              {t('footer.tiktok')}
            </a>
            <span className="text-[rgb(var(--border-subtle))]">·</span>
            <a
              href="https://wa.me/34680765314"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[rgb(var(--text-faint))] hover:text-[#25D366] transition-colors duration-200 tracking-label uppercase"
            >
              {t('footer.whatsapp')}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgb(var(--bg-surface))] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-[rgb(var(--border-subtle))]">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="font-body text-xs text-[rgb(var(--text-faint))]">{t('footer.address')}</p>
        </div>
      </div>
    </footer>
  )
}
