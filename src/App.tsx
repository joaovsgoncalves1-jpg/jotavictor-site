import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react"
import type { ReactNode } from "react"
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

const fadeRise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] },
  },
}

const staggerParent: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const heroParent: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const VIEWPORT = { once: true, amount: 0.1, margin: "0px 0px -40px 0px" } as const

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={fadeRise}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "article"
}) {
  const reduceMotion = useReducedMotion()
  if (as === "article") {
    if (reduceMotion) return <article className={className}>{children}</article>
    return (
      <motion.article className={className} variants={fadeRise}>
        {children}
      </motion.article>
    )
  }
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={fadeRise}>
      {children}
    </motion.div>
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
    eyebrow: "PRODUTO PRINCIPAL · NO AR",
    title: "EncarteZap",
    tagline: "Ofertas de farmácia direto no WhatsApp, sem agência.",
    body: "Criei para resolver a dor das farmácias de bairro que precisam divulgar ofertas rápido no WhatsApp. Permite gerar encartes profissionais em segundos e girar estoque sem campanhas caras.",
    link: ENCARTEZAP_URL,
    linkLabel: "Conhecer o EncarteZap",
    linkAria: "Abrir o site do EncarteZap em nova aba",
    status: "No ar",
  },
  {
    key: "catalogo",
    isFlagship: false,
    icon: LayoutGrid,
    eyebrow: "FERRAMENTA DE CAMPO",
    title: "Catálogo Digital",
    tagline: "Ofertas e campanhas rápidas para o varejo farmacêutico.",
    body: "Ferramenta simples para agilizar o atendimento aos meus clientes de farmácia. Reúne produtos e condições comerciais em um link direto.",
    link: CATALOGO_URL,
    linkLabel: "Abrir catálogo",
    linkAria: "Abrir o Catálogo Digital em nova aba",
    status: "No ar",
  },
  {
    key: "forja",
    isFlagship: false,
    icon: Flame,
    eyebrow: "SISTEMA PESSOAL",
    title: "Forja",
    tagline: "Hábitos, tarefas e metas com placar visível.",
    body: "Meu sistema pessoal de execução diária. Substitui a motivação oscilante por um placar claro de hábitos e entregas.",
    link: null,
    linkLabel: null,
    linkAria: null,
    status: "Em construção",
  },
  {
    key: "jotavfit",
    isFlagship: false,
    icon: Dumbbell,
    eyebrow: "CONTEÚDO & TREINO",
    title: "Jotav.fit",
    tagline: "Calistenia, força e constância sem maquiagem.",
    body: "Conteúdo sobre calistenia e treino pesado sem personagem de internet. Compartilho a rotina real de evolução e disciplina.",
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
    title: "Dor Real no Campo",
    subtitle: "Rua e balcão",
    body: "Vejo a dor acontecer na rotina de vendas do varejo farmacêutico.",
  },
  {
    num: "02",
    icon: Code,
    title: "Ferramenta & Código",
    subtitle: "Automação simples",
    body: "Construo soluções diretas em código para eliminar gargalos da operação.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Disciplina & Forja",
    subtitle: "Constância diária",
    body: "O treino pesado e o sistema Forja garantem a resiliência para entregar.",
  },
]

const principles = [
  "Problema da rua antes de código bonito.",
  "Produto no ar vale mais que 100 ideias na gaveta.",
  "IA para tirar trabalho braçal, nunca para teatro.",
  "Conteúdo vindo da vida real, sem personagem.",
  "Constância no treino e no trabalho supera qualquer motivação.",
]

const realLifeFronts = [
  {
    eyebrow: "VAREJO FARMACÊUTICO",
    title: "Campo, balcão e negociação.",
    body: "Minha rotina comercial no setor farmacêutico (RCA). É onde entendo a venda de verdade na prática.",
    image: "/images/joao-work.jpg",
    alt: "João Victor atuando no varejo farmacêutico",
    icon: Pill,
  },
  {
    eyebrow: "ESTRADA & LABORATÓRIO",
    title: "A rua mostra o problema.",
    body: "A rotina na estrada e nas visitas comerciais é meu laboratório para criar ferramentas úteis.",
    image: "/images/joao-car.jpg",
    alt: "João Victor em deslocamento comercial",
    icon: Route,
  },
  {
    eyebrow: "CALISTENIA & DISCIPLINA",
    title: "Treino pesado sem atalho.",
    body: "A calistenia é a base física da minha disciplina. Onde aprendo que resultado exige repetição diária.",
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
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#processo">Processo</a>
          <a href="#principios">Princípios</a>
          <a href="#campo">Frentes</a>
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
          <motion.div
            className="hero-copy"
            variants={reduceMotion ? undefined : heroParent}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
          >
            <motion.div className="hero-badge" variants={reduceMotion ? undefined : fadeRise}>
              <span className="live-dot" />
              <span>João Victor · Builder & RCA</span>
            </motion.div>

            <motion.h1 variants={reduceMotion ? undefined : fadeRise}>
              <span>Eu pego problema</span>
              <span>da rua e viro</span>
              <span className="accent-text">ferramenta.</span>
            </motion.h1>

            <motion.div className="mother-quote" variants={reduceMotion ? undefined : fadeRise}>
              <p>
                “Vendo na rua, construo no código e me forjo no treino. Campo, produto e disciplina no mesmo lugar.”
              </p>
            </motion.div>

            <motion.p className="hero-sub" variants={reduceMotion ? undefined : fadeRise}>
              Representante comercial no varejo farmacêutico em Natal-RN e criador do{" "}
              <strong>EncarteZap</strong>. Não é portfólio teórico: é o que construo na prática para
              resolver dores reais de campo.
            </motion.p>

            <motion.div className="hero-actions" variants={reduceMotion ? undefined : fadeRise}>
              <a
                className="button primary"
                href={ENCARTEZAP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer o EncarteZap <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button ghost" href="#projetos">
                Ver projetos
              </a>
              <a className="button ghost" href={"mailto:" + EMAIL}>
                Falar comigo
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="portrait-stage" style={{ y: heroY }}>
            <motion.div className="portrait-card" style={{ scale: heroScale }}>
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
          <StaggerItem>
            <p className="kicker">QUEM SOU EU</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="intro-lead">
              Sou o João. Vendo na rua de dia, desenvolvo à noite e me forjo no treino.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="intro-body">
              Moro em Natal-RN e trabalho no varejo farmacêutico negociando no balcão e no campo.
              Estar na rua todos os dias me mostra exatamente onde a operação trava.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="intro-body">
              Não crio software por hobby teórico. Minha meta é pegar dores reais de vendas e
              transformar em ferramentas simples — como o <strong>EncarteZap</strong> e o{" "}
              <strong>Forja</strong>.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="intro-body">
              A calistenia e o treino diário são a base física da minha disciplina, garantindo
              constância para entregar resultados de verdade.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Projects Section */}
      <section className="section" id="projetos">
        <Reveal className="section-heading">
          <p className="kicker">O QUE ESTOU CONSTRUINDO</p>
          <h2>Produtos reais nascidos da dor de campo.</h2>
          <p>Sem protótipos teóricos. Cada projeto resolve um problema concreto da rotina.</p>
        </Reveal>

        <Stagger className="projects-grid">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <StaggerItem
                as="article"
                className={"project-card" + (project.isFlagship ? " is-flagship" : "") + (project.link ? " is-linked" : "")}
                key={project.key}
              >
                {project.isFlagship && (
                  <div className="flagship-badge">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Produto Principal</span>
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
                    <span className="internal-status">Sistema em desenvolvimento</span>
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
          <p className="kicker">COMO EU CONSTRUO</p>
          <h2>Do campo ao código.</h2>
          <p>Identificar a dor real, construir a ferramenta e manter a disciplina na entrega.</p>
        </Reveal>

        <Stagger className="process-grid">
          {processSteps.map((step) => {
            const Icon = step.icon
            return (
              <StaggerItem className="process-card" key={step.num}>
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
            <p className="kicker">PRINCÍPIOS</p>
            <h2>Não quero parecer ocupado. Quero construir.</h2>
            <p className="manifesto-sub">Regras simples que guiam meu código, venda e treino.</p>
          </Reveal>
          <Stagger className="manifesto-grid">
            {principles.map((principle) => (
              <StaggerItem className="principle" key={principle}>
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
          <p className="kicker">PROVA REAL</p>
          <h2>Onde minha vida acontece na prática.</h2>
          <p>O campo traz o problema, o código constrói a solução e o treino molda a disciplina.</p>
        </Reveal>

        <Stagger className="fronts-grid">
          {realLifeFronts.map((front) => {
            const Icon = front.icon
            return (
              <StaggerItem as="article" className="front-card" key={front.eyebrow}>
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
          <h2>Quer trocar uma ideia real?</h2>
          <p>
            Seja para falar sobre o varejo farmacêutico, conhecer o <strong>EncarteZap</strong>,
            automação ou treino pesado. Me chama no e-mail ou Instagram.
          </p>
        </Reveal>
        <Reveal className="cta-actions">
          <a className="button primary" href={"mailto:" + EMAIL}>
            Enviar e-mail <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className="button ghost"
            href={ENCARTEZAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar EncarteZap <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            className="button ghost"
            href={JOTAVFIT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram @jotav.fit <ExternalLink size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <span>© {currentYear} João Victor · jotavictor.com</span>
          <span className="footer-tagline">
            Vendo na rua, construo no código e me forjo no treino.
          </span>
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
