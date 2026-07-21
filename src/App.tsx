import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { AnimationEvent, CSSProperties, ReactNode, RefObject } from "react"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Building2,
  Code,
  Dumbbell,
  ExternalLink,
  Flame,
  Hammer,
  LayoutGrid,
  MessageCircle,
  Pill,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import "./App.css"

/**
 * Fires once when the element crosses into view. Two independent safety nets keep
 * content from ever getting stuck invisible: if IntersectionObserver is unavailable
 * we reveal immediately, and a hard timeout reveals anyway if the observer never fires.
 */
function useInViewOnce(active: boolean) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(!active)

  useEffect(() => {
    if (!active) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    // Safety net only — real reveals come from the observer. Kept long so it never
    // competes with normal reading/scrolling pace (font/asset load alone can eat
    // a couple seconds); it only rescues a genuinely broken observer.
    const failsafe = window.setTimeout(() => setInView(true), 6000)
    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [active])

  return [ref, inView] as const
}

/** CSS entrance — always ends visible. Framer whileInView was leaving opacity:0 stuck. */
function Rise({
  children,
  className,
  delay = 0,
  as = "div",
  trigger = "mount",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "article"
  trigger?: "mount" | "inview"
}) {
  const reduceMotion = useReducedMotion()
  const [ref, inView] = useInViewOnce(!reduceMotion && trigger === "inview")
  // Once the entrance animation finishes we drop it entirely. A completed CSS animation
  // held via fill-mode "both" otherwise pins `transform` in the cascade forever, which
  // silently defeats plain `:hover { transform }` rules on the same element (cards).
  const [settled, setSettled] = useState(false)
  const animate = !reduceMotion && !settled
  const scrollGated = animate && trigger === "inview"
  const cls = [
    className,
    animate ? "rise-in" : null,
    scrollGated ? (inView ? "is-inview" : "is-pending") : null,
  ]
    .filter(Boolean)
    .join(" ")
  const style = animate ? ({ ["--rise-delay" as string]: `${delay}ms` } as CSSProperties) : undefined
  const onAnimationEnd = (event: AnimationEvent<Element>) => {
    if (event.target === event.currentTarget) setSettled(true)
  }
  if (as === "article") {
    return (
      <article
        ref={ref as RefObject<HTMLElement>}
        className={cls}
        style={style}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </article>
    )
  }
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={cls} style={style} onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  )
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Rise className={className} delay={0} trigger="inview">
      {children}
    </Rise>
  )
}

function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

function StaggerItem({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: "div" | "article"
  delay?: number
}) {
  return (
    <Rise className={className} as={as} delay={delay} trigger="inview">
      {children}
    </Rise>
  )
}

// Core URLs & Info
const CATALOGO_URL = "https://catalogo-digital-opella.vercel.app/"
const ENCARTEZAP_URL = "https://www.encartezap.com.br"
const JOTAVFIT_URL = "https://www.instagram.com/jotav.fit/"
const EMAIL = "contato@jotavictor.com"

const projects = [
  {
    key: "encartezap",
    isFlagship: true,
    icon: MessageCircle,
    eyebrow: "NO AR",
    title: "EncarteZap",
    tagline: "Oferta de farmácia no WhatsApp, sem agência.",
    body: "Farmácia precisava mandar encarte rápido. Eu fiz o EncarteZap. Tá no ar e gente real usa.",
    link: ENCARTEZAP_URL,
    linkLabel: "Abrir EncarteZap",
    linkAria: "Abrir o site do EncarteZap em nova aba",
    status: "No ar",
  },
  {
    key: "catalogo",
    isFlagship: false,
    icon: LayoutGrid,
    eyebrow: "CAMPO",
    title: "Catálogo Digital",
    tagline: "Link simples pro que eu vendo no dia a dia.",
    body: "Junto produto e condição num lugar só. O cliente abre e resolve, sem PDF sumido no zap.",
    link: CATALOGO_URL,
    linkLabel: "Abrir catálogo",
    linkAria: "Abrir o Catálogo Digital em nova aba",
    status: "No ar",
  },
  {
    key: "forja",
    isFlagship: false,
    icon: Flame,
    eyebrow: "EM CASA",
    title: "Forja",
    tagline: "Meu placar de hábitos e tarefas.",
    body: "Tô montando pra não depender de motivação. Ainda em construção — mas já é pra uso real.",
    link: null,
    linkLabel: null,
    linkAria: null,
    status: "Construindo",
  },
  {
    key: "jotavfit",
    isFlagship: false,
    icon: Dumbbell,
    eyebrow: "TREINO",
    title: "Jotav.fit",
    tagline: "Calistenia e treino sem personagem.",
    body: "Mostro o que eu faço de verdade. Sem pack milagroso, sem pose de influencer.",
    link: JOTAVFIT_URL,
    linkLabel: "@jotav.fit",
    linkAria: "Abrir o Instagram @jotav.fit em nova aba",
    status: "Ativo",
  },
]

const processSteps = [
  {
    num: "01",
    icon: Building2,
    title: "A rua mostra",
    subtitle: "Farmácia, balcão, estrada",
    body: "O problema aparece no meio do expediente — não numa reunião bonita.",
  },
  {
    num: "02",
    icon: Code,
    title: "Eu codifico",
    subtitle: "Ferramenta simples",
    body: "Faço o mínimo que resolve. Se não entra no ar, não conta.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Eu mantenho",
    subtitle: "Treino e rotina",
    body: "Treino pesado e rotina chata. É o que segura o resto em pé.",
  },
]

const principles = [
  "Problema real antes de tela bonita.",
  "No ar > ideia na gaveta.",
  "IA pra cortar trampo, não pra posar.",
  "Sem personagem de internet.",
  "Repetir todo dia vence motivação.",
]

const realLifeFronts = [
  {
    eyebrow: "TRABALHO",
    title: "Varejo farmacêutico",
    body: "Sou RCA. Campo, balcão, negociação. É daqui que saem as dores que eu resolvo em código.",
    image: "/images/joao-work.jpg",
    alt: "João Victor no trabalho no varejo farmacêutico",
    icon: Pill,
  },
  {
    eyebrow: "ESTRADA",
    title: "Entre uma visita e outra",
    body: "Muito do que eu construo nasce no carro, depois de ouvir o mesmo problema de novo.",
    image: "/images/joao-car.jpg",
    alt: "João Victor em deslocamento comercial",
    icon: Route,
  },
  {
    eyebrow: "TREINO",
    title: "Calistenia",
    body: "Treino pesado, quase todo dia. Sem atalho. É a mesma lógica do resto da vida.",
    image: "/images/joao-gym.jpg",
    alt: "João Victor treinando calistenia",
    icon: Dumbbell,
  },
]

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : -45])
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, reduceMotion ? 1 : 1.04])
  const lineProgress = useTransform(scrollYProgress, [0, 0.98], ["0%", "100%"])

  const currentYear = new Date().getFullYear()

  return (
    <main className="site-shell">
      {/* Top scroll line indicator */}
      <div className="top-progress-bar" aria-hidden="true">
        <motion.div className="top-progress-fill" style={{ width: lineProgress }} />
      </div>

      <nav className="nav" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="João Victor, início">
          JV
        </a>
        <div className="nav-links">
          <a href="#sobre">Eu</a>
          <a href="#projetos">Coisas</a>
          <a href="#processo">Como</a>
          <a href="#principios">Jeito</a>
          <a href="#campo">Dia a dia</a>
          <a href="#contato">Contato</a>
        </div>
        <a
          className="nav-cta"
          href={ENCARTEZAP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          EncarteZap <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <Rise className="hero-badge" delay={0}>
              <span className="live-dot" />
              <span>João · Natal-RN</span>
            </Rise>

            <Rise delay={80}>
              <h1>
                <span>Eu pego problema</span>
                <span>da rua e viro</span>
                <span className="accent-text">ferramenta.</span>
              </h1>
            </Rise>

            <Rise className="mother-quote" delay={160}>
              <p>
                Vendo de dia. Codifico de noite. Treino quase todo dia. É isso.
              </p>
            </Rise>

            <Rise delay={220}>
              <p className="hero-sub">
                Trabalho com farmácia em Natal. Criei o <strong>EncarteZap</strong>. Esse site é o
                mapa do que eu tô construindo — não um currículo enfeitado.
              </p>
            </Rise>

            <Rise className="hero-actions" delay={300}>
              <a
                className="button primary"
                href={ENCARTEZAP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver o EncarteZap <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button ghost" href="#projetos">
                O que eu faço
              </a>
              <a className="button ghost" href={"mailto:" + EMAIL}>
                Me chama
              </a>
            </Rise>
          </div>

          <motion.div className="portrait-stage" style={{ y: heroY }}>
            <motion.div className={"portrait-card" + (reduceMotion ? "" : " rise-in")} style={{ scale: heroScale }}>
              <img
                src="/images/joao-hero.jpg"
                alt="Retrato de João Victor"
                width="720"
                height="1280"
                fetchPriority="high"
              />
              <div className="portrait-glow" />
              <div className="portrait-status-chip">
                <span className="pulse-dot" />
                <span>No ar: EncarteZap · Natal-RN</span>
              </div>
              <div className="portrait-caption">
                <span>Varejo Pharma</span>
                <span>EncarteZap</span>
                <span>Calistenia</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Human Intro */}
      <section className="intro-panel" id="sobre">
        <Stagger className="intro-copy">
          <StaggerItem delay={0}>
            <p className="kicker">QUEM EU SOU</p>
          </StaggerItem>
          <StaggerItem delay={90}>
            <h2 className="intro-lead">
              João. Vendo na rua, faço ferramenta, treino pesado.
            </h2>
          </StaggerItem>
          <StaggerItem delay={180}>
            <p className="intro-body">
              Moro em Natal-RN. De dia tô no varejo farmacêutico — balcão, comprador, estoque
              parado, conversa de verdade. De noite eu pego o que me irritou no campo e viro código.
            </p>
          </StaggerItem>
          <StaggerItem delay={270}>
            <p className="intro-body">
              O <strong>EncarteZap</strong> nasceu assim. A <strong>Forja</strong> também. O treino é
              o mesmo papo: sem atalho, todo dia um pouco.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Projects Section */}
      <section className="section" id="projetos">
        <Reveal className="section-heading">
          <p className="kicker">O QUE EU TOU FAZENDO</p>
          <h2>Coisa no ar. Ou a caminho.</h2>
          <p>Nada de protótipo pra inglês de LinkedIn. Se tá aqui, importa pra mim ou pro cliente.</p>
        </Reveal>

        <Stagger className="projects-grid">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <StaggerItem
                as="article"
                className={"project-card" + (project.isFlagship ? " is-flagship" : "") + (project.link ? " is-linked" : "")}
                key={project.key}
                delay={i * 90}
              >
                {project.isFlagship && (
                  <div className="flagship-badge">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Principal</span>
                  </div>
                )}
                <div className="project-card-header">
                  <span className="icon-pill">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="project-status-pill">{project.status}</span>
                </div>

                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-body">{project.body}</p>

                <div className="front-meta">
                  {project.link ? (
                    <a
                      className="front-link button-link"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.linkAria ?? undefined}
                    >
                      {project.linkLabel}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="internal-status">Ainda não abri pro mundo</span>
                  )}
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </section>

      {/* Process / How I Work */}
      <section className="section" id="processo">
        <Reveal className="section-heading">
          <p className="kicker">COMO EU ROLLO</p>
          <h2>Simples assim.</h2>
          <p>Vejo o problema. Faço a ferramenta. Não abandono no meio.</p>
        </Reveal>

        <Stagger className="process-grid">
          {processSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <StaggerItem className="process-card" key={step.num} delay={i * 90}>
                <div className="process-top">
                  <span className="process-num">{step.num}</span>
                  <span className="icon-pill muted">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p className="process-sub">{step.subtitle}</p>
                <p className="process-body">{step.body}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </section>

      {/* Principles */}
      <section className="manifesto" id="principios">
        <div className="manifesto-inner">
          <Reveal>
            <p className="kicker">DO MEU JEITO</p>
            <h2>Não quero parecer ocupado. Quero entregar.</h2>
            <p className="manifesto-sub">Cinco frases. Sem framework de vida.</p>
          </Reveal>
          <Stagger className="manifesto-grid">
            {principles.map((principle, i) => (
              <StaggerItem className="principle" key={principle} delay={i * 60}>
                <ShieldCheck size={18} aria-hidden="true" />
                <span>{principle}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Real Life Proof Strip / Frentes */}
      <section className="section" id="campo">
        <Reveal className="section-heading">
          <p className="kicker">FORA DA TELA</p>
          <h2>Onde eu passo o dia.</h2>
          <p>Trabalho, estrada e treino. O resto é consequência.</p>
        </Reveal>

        <Stagger className="fronts-grid">
          {realLifeFronts.map((front, i) => {
            const Icon = front.icon
            return (
              <StaggerItem as="article" className="front-card" key={front.eyebrow} delay={i * 90}>
                <div className="front-image">
                  <img
                    src={front.image}
                    alt={front.alt}
                    width="720"
                    height="1280"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="front-content">
                  <span className="icon-pill">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="eyebrow">{front.eyebrow}</p>
                  <h3>{front.title}</h3>
                  <p>{front.body}</p>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </section>

      {/* Final CTA / Contact */}
      <section className="final-cta" id="contato">
        <Reveal className="cta-left">
          <Sparkles className="spark" size={28} aria-hidden="true" />
          <h2>Bora conversar?</h2>
          <p>
            Farmácia, <strong>EncarteZap</strong>, código ou treino. Manda um e-mail ou chama no
            Instagram.
          </p>
        </Reveal>
        <Reveal className="cta-actions">
          <a className="button primary" href={"mailto:" + EMAIL}>
            E-mail <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className="button ghost"
            href={ENCARTEZAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            EncarteZap <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            className="button ghost"
            href={JOTAVFIT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            @jotav.fit <ExternalLink size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <span>© {currentYear} João Victor · jotavictor.com</span>
          <span className="footer-tagline">Vendo de dia. Codifico de noite. Treino quase todo dia.</span>
        </div>
        <nav className="footer-links" aria-label="Links de João Victor">
          <a href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">
            EncarteZap
          </a>
          <a href={CATALOGO_URL} target="_blank" rel="noopener noreferrer">
            Catálogo Digital
          </a>
          <a href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={"mailto:" + EMAIL}>E-mail</a>
        </nav>
      </footer>
    </main>
  )
}

export default App
