export interface Dictionary {
  nav: {
    servicios: string
    resenas: string
    proceso: string
    contacto: string
    cta: string
    menu: string
  }
  themeToggle: {
    toLight: string
    toDark: string
  }
  hero: {
    badge: string
    headline: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    scroll: string
  }
  valor: {
    pillar1: { label: string; text: string }
    pillar2: { label: string; text: string }
    pillar3: { label: string; text: string }
  }
  servicios: {
    subtitle: string
    heading: string
    limpieza: { titulo: string; texto: string }
    pulido: { titulo: string; texto: string }
    ceramico: { titulo: string; texto: string }
    tapiceria: { titulo: string; texto: string; techosLabel: string; farosLabel: string }
  }
  galeria: {
    subtitle: string
    heading: string
    prev: string
    next: string
    ver: string
    enPantallaCompleta: string
    verEnInstagram: string
    items: {
      audi: string
      audiDentro: string
      bmw: string
      furgo: string
      mbA45: string
      mbAmg: string
      mb: string
      opelCorsa: string
      opelManta: string
      ossa: string
    }
  }
  resenas: {
    subtitle: string
    heading: string
    ratingText: string
    replyLabel: string
    ctaQuestion: string
    ctaLink: string
  }
  antesDespues: {
    subtitle: string
    heading: string
    labelAntes: string
    labelDespues: string
    instruction: string
  }
  proceso: {
    subtitle: string
    heading: string
    paso1: { titulo: string; desc: string }
    paso2: { titulo: string; desc: string }
    paso3: { titulo: string; desc: string }
    paso4: { titulo: string; desc: string }
  }
  marquee: {
    slogan1: string
    slogan2: string
    slogan3: string
    slogan4: string
    slogan5: string
  }
  nosotros: {
    subtitle: string
    heading: string
    body1: string
    body2: string
    body3: string
    stats: {
      vehiculos: string
      clientes: string
      reviews: string
      experiencia: string
    }
  }
  contacto: {
    subtitle: string
    heading: string
    subheading: string
    telefonoLabel: string
    ubicacionLabel: string
    direccion: string
    verEnGoogleMaps: string
    horarioLabel: string
    horarioSemana: string
    horarioHoras: string
    horarioFinSemana: string
    horarioCerrado: string
    instagramLabel: string
    tiktokLabel: string
    whatsappBtn: string
    llamarBtn: string
  }
  footer: {
    locationSubtitle: string
    linkServicios: string
    linkResenas: string
    linkProceso: string
    linkContacto: string
    instagram: string
    tiktok: string
    whatsapp: string
    copyright: string
    address: string
  }
  whatsapp: {
    ariaLabel: string
  }
  faq: {
    title: string
    subtitle: string
    q1: { q: string; a: string }
    q2: { q: string; a: string }
    q3: { q: string; a: string }
    q4: { q: string; a: string }
    q5: { q: string; a: string }
    q6: { q: string; a: string }
    q7: { q: string; a: string }
  }
}
