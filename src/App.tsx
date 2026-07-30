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
    const failsafe = window.setTimeout(() => setInView(true), 6000)
    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [active])

  return [ref, inView] as const
}

/** CSS entrance — always ends visible. */
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
    eyebrow: "PLATAFORMA FLAGSHIP",
    title: "EncarteZap",
    tagline: "Inteligência comercial e vitrines automáticas no WhatsApp.",
    body: "Transformo o envio manual de ofertas no varejo em uma operação automatizada de vendas no WhatsApp. Mais conversão de clientes com zero atrito.",
    link: ENCARTEZAP_URL,
    linkLabel: "Conhecer o EncarteZap",
    linkAria: "Abrir o site do EncarteZap em nova aba",
    status: "Em Produção",
  },
  {
    key: "catalogo",
    isFlagship: false,
    icon: LayoutGrid,
    eyebrow: "SAAS MULTI-TENANT",
    title: "Catálogo Digital",
    tagline: "Vitrines de alta conversão para gestão ágil de pedidos.",
    body: "Substituo PDFs pesados por um catálogo digital interativo. O cliente navega, seleciona os produtos e envia o pedido direto para o setor comercial.",
    link: CATALOGO_URL,
    linkLabel: "Ver Catálogo Opella",
    linkAria: "Abrir o Catálogo Digital em nova aba",
    status: "Em Produção",
  },
  {
    key: "forja",
    isFlagship: false,
    icon: Flame,
    eyebrow: "ALTA PERFORMANCE",
    title: "Praxis (Forja)",
    tagline: "Sistema de gestão de rotina, disciplina e consistência.",
    body: "Plataforma de acompanhamento de hábitos, metas e rotina operacional para garantir alta performance diária sem depender de motivação.",
    link: null,
    linkLabel: null,
    linkAria: null,
    status: "Plataforma Ativa",
  },
  {
    key: "jotavfit",
    isFlagship: false,
    icon: Dumbbell,
    eyebrow: "BRAND & COMUNIDADE",
    title: "Jotav.fit",
    tagline: "Treino de alta intensidade, disciplina e execução diária.",
    body: "Conteúdo e mentalidade sobre calistenia e treino pesado. Sem atalhos ou promessas mágicas: consistência real de longo prazo.",
    link: JOTAVFIT_URL,
    linkLabel: "@jotav.fit",
    linkAria: "Abrir o Instagram @jotav.fit em nova aba",
    status: "Comunidade Ativa",
  },
]

const processSteps = [
  {
    num: "01",
    icon: Building2,
    title: "A rua manda",
    subtitle: "Operação & Campo",
    body: "O problema real aparece no meio do expediente, no balcão e na negociação — não em apresentações de slides.",
  },
  {
    num: "02",
    icon: Code,
    title: "Eu construo",
    subtitle: "Engenharia Enxuta",
    body: "Desenvolvo software focado em resolver a causa raiz. Entrega rápida, código limpo e arquitetura escalável.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Eu mantenho",
    subtitle: "Disciplina & Consistência",
    body: "Rotina diária e treino de alta intensidade. A consistência no código e na vida é o que mantém tudo de pé.",
  },
]

const principles = [
  "Código só tem valor se resolve uma dor real de operação.",
  "Software forte nasce da prática, não de teoria de slide.",
  "Automação inteligente para multiplicar a capacidade humana de execução.",
  "Construção com disciplina diária — no código, no varejo e no treino.",
  "Sem personagem ou atalhos: resultados comprovados por evidências.",
]

const realLifeFronts = [
  {
    eyebrow: "O TRABALHO",
    title: "Varejo & Negociação",
    body: "Atuação diária no varejo farmacêutico: campo, negociação e inteligência de mercado. É dessa vivência prática que nascem os meus softwares.",
    image: "/images/joao-work.jpg",
    alt: "João Victor no trabalho no varejo farmacêutico",
    icon: Pill,
  },
  {
    eyebrow: "A ESTRADA",
    title: "Inteligência de Campo",
    body: "Cada deslocamento e visita a clientes revela gargalos operacionais reais que viabilizam novos produtos e automações.",
    image: "/images/joao-car.jpg",
    alt: "João Victor em deslocamento comercial",
    icon: Route,
  },
  {
    eyebrow: "O TREINO",
    title: "Alta Performance & Treino",
    body: "Calistenia e treino pesado quase todo dia. A mesma disciplina necessária para levantar cargas é aplicada na criação de sistemas robustos.",
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
          <a href="#projetos">Projetos</a>
          <a href="#processo">Processo</a>
          <a href="#principios">Princípios</a>
          <a href="#campo">Campo</a>
          <a href="#contato" className="nav-cta">
            Contato
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="top">
        <motion.div className="hero-backdrop" style={{ y: heroY, scale: heroScale }} aria-hidden="true" />
        <Stagger className="hero-content">
          <StaggerItem delay={0}>
            <p className="kicker">BUILDER • VAREJO • AUTOMAÇÃO COM IA</p>
          </StaggerItem>
          <StaggerItem delay={90}>
            <h1 className="hero-title">
              Construo software pra quem <span className="highlight">vende na vida real.</span>
            </h1>
          </StaggerItem>
          <StaggerItem delay={180}>
            <p className="intro-body">
              Da vivência prática no varejo à engenharia de software com inteligência artificial.
              Crio soluções que resolvem dores reais de operação, escala e faturamento.
            </p>
          </StaggerItem>
          <StaggerItem delay={270}>
            <p className="intro-body">
              Fundador do <strong>EncarteZap</strong>, <strong>CatálogoZap</strong> e <strong>Praxis</strong>.
              Transformo gargalos operacionais do dia a dia em software de alta performance.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Projects Section */}
      <section className="section" id="projetos">
        <Reveal className="section-heading">
          <p className="kicker">PRODUTOS & ECOSSISTEMA</p>
          <h2>Produtos em produção. Impacto direto na operação.</h2>
          <p>Sistemas criados para resolver problemas reais de mercado e acelerar resultados comerciais.</p>
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
                    <span>Plataforma Principal</span>
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
                    <span className="internal-status">Plataforma Interna</span>
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
          <p className="kicker">METODOLOGIA DE EXECUÇÃO</p>
          <h2>Do problema ao código em produção.</h2>
          <p>Visão de campo, engenharia orientada à causa raiz e consistência inabalável.</p>
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
            <p className="kicker">FILOSOFIA DE TRABALHO</p>
            <h2>Software forte nasce da prática, não de teoria em slide.</h2>
            <p className="manifesto-sub">Diretrizes inegociáveis de engenharia e execução.</p>
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
          <p className="kicker">VIVÊNCIA & CAMPO</p>
          <h2>Do balcão do varejo ao código de alta performance.</h2>
          <p>A vivência prática de mercado alimentando a criação de sistemas robustos.</p>
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
          <h2>Vamos construir algo grande?</h2>
          <p>
            Varejo, <strong>EncarteZap</strong>, engenharia de software ou alta performance — se o foco for resolver problemas e gerar resultados, vamos conversar.
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
          <span className="footer-tagline">Vendas no campo. Engenharia de noite. Disciplina no treino.</span>
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
