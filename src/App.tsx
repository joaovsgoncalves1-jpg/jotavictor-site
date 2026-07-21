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
    tagline: "Oferta de farmácia direto no WhatsApp, sem agência cara.",
    body: "Toda farmácia precisa mandar oferta rápido no zap. Fiz o EncarteZap pra isso: monta o encarte e dispara. Já tem cliente pagando e usando.",
    link: ENCARTEZAP_URL,
    linkLabel: "Abrir o EncarteZap",
    linkAria: "Abrir o site do EncarteZap em nova aba",
    status: "Rodando",
  },
  {
    key: "catalogo",
    isFlagship: false,
    icon: LayoutGrid,
    eyebrow: "NO CAMPO",
    title: "Catálogo Digital",
    tagline: "Um link com tudo que eu vendo no dia.",
    body: "Botei produto e preço num lugar só. O cliente abre, olha e já pede — sem aquele PDF que some no meio da conversa.",
    link: CATALOGO_URL,
    linkLabel: "Abrir o catálogo",
    linkAria: "Abrir o Catálogo Digital em nova aba",
    status: "Rodando",
  },
  {
    key: "forja",
    isFlagship: false,
    icon: Flame,
    eyebrow: "PRA MIM MESMO",
    title: "Forja",
    tagline: "Meu placar de hábitos e metas.",
    body: "Montei pra não depender de vontade nem de memória. Ainda tá cru, mas já abro todo dia.",
    link: null,
    linkLabel: null,
    linkAria: null,
    status: "Em obras",
  },
  {
    key: "jotavfit",
    isFlagship: false,
    icon: Dumbbell,
    eyebrow: "NO TREINO",
    title: "Jotav.fit",
    tagline: "Calistenia e ferro, sem personagem.",
    body: "Posto o treino que eu faço de verdade. Sem receita mágica, sem pose de influencer.",
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
    title: "A rua manda",
    subtitle: "Balcão, campo, estrada",
    body: "O problema aparece no meio do expediente, não numa reunião de slide.",
  },
  {
    num: "02",
    icon: Code,
    title: "Eu construo",
    subtitle: "O mínimo que resolve",
    body: "Faço só o que resolve e boto no ar. Coisa parada na gaveta não vale.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Eu seguro",
    subtitle: "Rotina e treino",
    body: "Rotina chata e treino pesado. É o que mantém tudo de pé.",
  },
]

const principles = [
  "Primeiro o problema, depois a tela bonita.",
  "Coisa no ar vale mais que ideia parada.",
  "IA pra tirar peso, não pra tirar onda.",
  "Sem personagem, sem pose de internet.",
  "Fazer todo dia ganha da vontade do momento.",
]

const realLifeFronts = [
  {
    eyebrow: "O TRABALHO",
    title: "Farmácia todo dia",
    body: "Sou RCA: campo, balcão, negociação de verdade. É daqui que sai quase toda ideia que vira código.",
    image: "/images/joao-work.jpg",
    alt: "João Victor no trabalho no varejo farmacêutico",
    icon: Pill,
  },
  {
    eyebrow: "A ESTRADA",
    title: "No trânsito, entre visitas",
    body: "Boa parte do que eu construo começa no carro, depois de ouvir o mesmo problema pela décima vez.",
    image: "/images/joao-car.jpg",
    alt: "João Victor em deslocamento comercial",
    icon: Route,
  },
  {
    eyebrow: "O TREINO",
    title: "Calistenia e ferro",
    body: "Treino pesado, quase todo dia. Sem atalho — igualzinho ao resto da vida.",
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
          <a href="#sobre">Quem sou eu</a>
          <a href="#projetos">O que rola</a>
          <a href="#processo">Como funciona</a>
          <a href="#principios">No que acredito</a>
          <a href="#campo">Meu dia</a>
          <a href="#contato">Fala comigo</a>
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
              <span>Jota · Natal-RN</span>
            </Rise>

            <Rise delay={80}>
              <h1>
                <span>O aperto apareceu</span>
                <span>na farmácia.</span>
                <span className="accent-text">Resolvi no código.</span>
              </h1>
            </Rise>

            <Rise className="mother-quote" delay={160}>
              <p>
                Vendo de dia, programo de noite, treino no meio. Mesma pessoa, três frentes.
              </p>
            </Rise>

            <Rise delay={220}>
              <p className="hero-sub">
                Trabalho com farmácia aqui em Natal e fiz o <strong>EncarteZap</strong> pra facilitar
                a vida de quem vende. Esse site é só pra você ver no que eu ando mexendo — nada de
                currículo enfeitado.
              </p>
            </Rise>

            <Rise className="hero-actions" delay={300}>
              <a
                className="button primary"
                href={ENCARTEZAP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer o EncarteZap <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button ghost" href="#projetos">
                Ver o que eu faço
              </a>
              <a className="button ghost" href={"mailto:" + EMAIL}>
                Falar comigo
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
                <span>EncarteZap no ar · Natal-RN</span>
              </div>
              <div className="portrait-caption">
                <span>Farmácia</span>
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
            <p className="kicker">QUEM É O JOTA</p>
          </StaggerItem>
          <StaggerItem delay={90}>
            <h2 className="intro-lead">
              Sou o João. Vendedor de rua, meio programador, treino todo dia.
            </h2>
          </StaggerItem>
          <StaggerItem delay={180}>
            <p className="intro-body">
              Moro em Natal. De dia é varejo farmacêutico — balcão, comprador, estoque encalhado,
              muita conversa de verdade. À noite, o que me travou no trabalho vira código aqui em casa.
            </p>
          </StaggerItem>
          <StaggerItem delay={270}>
            <p className="intro-body">
              Foi assim que saiu o <strong>EncarteZap</strong>. E a <strong>Forja</strong> também. O
              treino segue a mesma linha: sem atalho, um pouco todo dia.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Projects Section */}
      <section className="section" id="projetos">
        <Reveal className="section-heading">
          <p className="kicker">O QUE EU CONSTRUO</p>
          <h2>No ar, ou quase lá.</h2>
          <p>Nada de enfeite pra portfólio. Se tá aqui é porque serve pra mim ou pro cliente.</p>
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
                    <span className="internal-status">Ainda é só meu</span>
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
          <p className="kicker">COMO EU TOCO</p>
          <h2>É simples assim.</h2>
          <p>A rua mostra, eu construo, e não largo pela metade.</p>
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
            <p className="kicker">NO QUE ACREDITO</p>
            <h2>Não quero parecer ocupado. Quero entregar coisa que serve.</h2>
            <p className="manifesto-sub">Cinco frases. Sem manual de autoajuda.</p>
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
          <p className="kicker">LONGE DA TELA</p>
          <h2>Onde eu passo o dia de verdade.</h2>
          <p>Trabalho, estrada e treino. O código vem de tudo isso junto.</p>
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
          <h2>Bora trocar ideia?</h2>
          <p>
            Farmácia, <strong>EncarteZap</strong>, código ou treino — se for sobre isso, tô dentro.
            Manda um e-mail ou chama no Instagram.
          </p>
        </Reveal>
        <Reveal className="cta-actions">
          <a className="button primary" href={"mailto:" + EMAIL}>
            Mandar e-mail <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className="button ghost"
            href={ENCARTEZAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o EncarteZap <ExternalLink size={16} aria-hidden="true" />
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
          <span className="footer-tagline">Vendo de dia. Programo de noite. Treino no meio.</span>
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
