import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  Dumbbell,
  ExternalLink,
  Mail,
  MessageCircle,
  PanelsTopLeft,
  Route,
  Sparkles,
  Workflow,
} from "lucide-react"
import "./App.css"

const ENCARTEZAP_URL = "https://www.encartezap.com.br"
const CATALOGO_URL = "https://catalogo-digital-opella.vercel.app/"
const CARTEIRAZAP_URL = "https://carteirazap-jotaai.vercel.app"
const JOTAVFIT_URL = "https://www.instagram.com/jotav.fit/"
const EMAIL = "contato@jotavictor.com"

const projects = [
  {
    id: "01",
    title: "EncarteZap",
    type: "produto",
    copy: "Nasceu de uma coisa simples: eu precisava mandar oferta pra cliente sem ficar fazendo arte e PDF toda hora.",
    href: ENCARTEZAP_URL,
    label: "abrir projeto",
    accent: "#d6ff64",
  },
  {
    id: "02",
    title: "CatálogoZap",
    type: "produto",
    copy: "Um catálogo que o cliente consegue usar no celular e fechar o pedido direto no WhatsApp.",
    href: CATALOGO_URL,
    label: "ver catálogo",
    accent: "#77e2b8",
  },
  {
    id: "03",
    title: "CarteiraZap",
    type: "vendas",
    copy: "Meu jeito de não depender da memória pra cuidar de uma carteira grande de clientes.",
    href: CARTEIRAZAP_URL,
    label: "abrir projeto",
    accent: "#7db7ff",
  },
  {
    id: "04",
    title: "Praxis",
    type: "pessoal",
    copy: "O sistema que eu uso pra não perder tarefa, projeto e rotina dentro da própria cabeça.",
    href: null,
    label: null,
    accent: "#d3b4ff",
  },
  {
    id: "05",
    title: "GoFluxo",
    type: "IA + automação",
    copy: "A frente em que eu testo IA e automação dentro de empresas que têm problema de verdade.",
    href: null,
    label: null,
    accent: "#ff9a6b",
  },
  {
    id: "06",
    title: "Jotav.fit",
    type: "treino + conteúdo",
    copy: "Calistenia, treino e a parte de mim que existe longe da tela.",
    href: JOTAVFIT_URL,
    label: "ver @jotav.fit",
    accent: "#f3f0e9",
  },
]

const now = [
  ["cidade", "Natal, RN"],
  ["trabalho", "mercado farmacêutico"],
  ["faculdade", "Educação Física"],
  ["estudando", "agentes + IA aplicada"],
  ["treino", "calistenia"],
]

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress, scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 900], [1.03, reduceMotion ? 1.03 : 1.14])
  const heroY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 130])
  const heroCopyY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -55])
  const [scrolled, setScrolled] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    return scrollY.on("change", (latest) => setScrolled(latest > 48))
  }, [scrollY])

  const marquee = useMemo(() => ["VENDAS", "PRODUTO", "IA", "TREINO", "AUTOMAÇÃO", "VIDA REAL"], [])

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <nav className={"top-nav" + (scrolled ? " is-scrolled" : "")} aria-label="Navegação principal">
        <a href="#top" className="brand" aria-label="Jota Victor, início">JOTA</a>
        <div className="nav-links">
          <a href="#historia">sobre</a>
          <a href="#projetos">projetos</a>
          <a href="#agora">agora</a>
        </div>
        <a href={"mailto:" + EMAIL} className="nav-mail">falar comigo <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero" id="top">
        <motion.div className="hero-media" style={{ scale: heroScale, y: heroY }} aria-hidden="true">
          <img src="/images/joao-hero.jpg" alt="" fetchPriority="high" />
        </motion.div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <motion.div className="hero-content" style={{ y: heroCopyY }}>
          <motion.p
            className="hero-kicker"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            João Victor · Natal, RN
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 65 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.92, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Eu vivo o problema.<br />
            <span>Depois tento construir algo melhor.</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.34 }}
          >
            Trabalho com vendas, construo software com IA, estudo Educação Física e treino. Esse site é onde essas coisas se encontram.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.46 }}
          >
            <a href="#projetos" className="hero-link">ver o que eu construo <ArrowDown size={16} /></a>
            <a href={JOTAVFIT_URL} target="_blank" rel="noreferrer" className="hero-link subtle">@jotav.fit <ExternalLink size={14} /></a>
          </motion.div>
        </motion.div>

        <div className="hero-side-note">em construção · {currentYear}</div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, index) => (
            <span key={index}>{item}<i>✦</i></span>
          ))}
        </div>
      </section>

      <section className="manifesto" id="historia">
        <Reveal className="manifesto-copy">
          <p className="section-label">01 · SOBRE</p>
          <h2>
            Eu não tô tentando parecer <em>pronto.</em>
          </h2>
          <div className="manifesto-text">
            <p>Ainda tô descobrindo no que tudo isso vai dar.</p>
            <p>Só não quero uma vida em que trabalho, tecnologia e treino pareçam três pessoas diferentes. Quero ficar bom nas coisas que importam pra mim e ver até onde isso chega.</p>
          </div>
        </Reveal>
      </section>

      <section className="fronts-section">
        <div className="fronts-heading">
          <Reveal>
            <p className="section-label light">02 · MINHAS FRENTES</p>
            <h2>Hoje minha vida gira mais ou menos em três coisas.</h2>
          </Reveal>
        </div>

        <div className="front-panel front-sales">
          <div className="front-bg"><img src="/images/joao-work.jpg" alt="" loading="lazy" /></div>
          <div className="front-shade" />
          <Reveal className="front-content">
            <span>01 / rua</span>
            <h3>Vendas</h3>
            <p>É meu trabalho real. Cliente, meta, rota, negociação, erro e acerto. Boa parte das ideias começa aqui.</p>
            <Route size={26} />
          </Reveal>
        </div>

        <div className="front-panel front-build">
          <div className="build-ambient" aria-hidden="true" />
          <div className="build-names" aria-hidden="true">
            <span>EncarteZap</span><span>CarteiraZap</span><span>Praxis</span><span>GoFluxo</span><span>CatálogoZap</span>
          </div>
          <Reveal className="front-content">
            <span>02 / tela</span>
            <h3>Construção</h3>
            <p>Software, IA e automação. Eu gosto de pegar coisa chata da vida real e ver se dá pra transformar em sistema.</p>
            <Workflow size={26} />
          </Reveal>
        </div>

        <div className="front-panel front-training">
          <div className="front-bg"><img src="/images/joao-gym.jpg" alt="" loading="lazy" /></div>
          <div className="front-shade" />
          <Reveal className="front-content">
            <span>03 / corpo</span>
            <h3>Treino</h3>
            <p>Calistenia, força e Educação Física. É uma parte da minha vida que eu levo a sério mesmo quando ninguém tá vendo.</p>
            <Dumbbell size={26} />
          </Reveal>
        </div>
      </section>

      <section className="projects-section" id="projetos">
        <div className="projects-head">
          <Reveal>
            <p className="section-label light">03 · PROJETOS</p>
            <h2>Coisas que eu fiz porque precisava delas.</h2>
            <p>Algumas já funcionam de verdade. Outras ainda estão ficando boas.</p>
          </Reveal>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.045, 0.18)}>
              <article className="project-row" style={{ "--accent": project.accent } as CSSProperties}>
                <div className="project-index">{project.id}</div>
                <div className="project-title-wrap">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.copy}</p>
                <div className="project-action">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.label}: ${project.title}`}>
                      <span>{project.label}</span><ArrowUpRight size={20} />
                    </a>
                  ) : (
                    <span className="project-internal">por enquanto, interno</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="now-section" id="agora">
        <div className="now-grid">
          <Reveal className="now-intro">
            <p className="section-label">04 · AGORA</p>
            <h2>O que tá ocupando minha cabeça hoje.</h2>
            <p>Isso muda. O site deveria mudar junto.</p>
          </Reveal>

          <div className="now-list">
            {now.map(([label, value], index) => (
              <Reveal className="now-row" key={label} delay={index * 0.04}>
                <span>{label}</span>
                <strong>{value}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-strip" aria-label="Recortes da vida de João Victor">
        <motion.div className="photo-card photo-a" whileHover={reduceMotion ? undefined : { y: -8, rotate: -1 }}>
          <img src="/images/joao-work.jpg" alt="João Victor em um registro da rotina" loading="lazy" />
        </motion.div>
        <motion.div className="photo-card photo-b" whileHover={reduceMotion ? undefined : { y: -8, rotate: 1 }}>
          <img src="/images/joao-car.jpg" alt="João Victor em um registro pessoal" loading="lazy" />
        </motion.div>
        <motion.div className="photo-card photo-c" whileHover={reduceMotion ? undefined : { y: -8, rotate: -1 }}>
          <img src="/images/joao-gym.jpg" alt="João Victor em um registro de treino" loading="lazy" />
        </motion.div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-orb" aria-hidden="true" />
        <Reveal className="contact-inner">
          <p className="section-label light">05 · CONTATO</p>
          <h2>Se alguma coisa daqui bateu com o que você tá construindo, fala comigo.</h2>
          <div className="contact-links">
            <a href={"mailto:" + EMAIL}><Mail size={18} />{EMAIL}<ArrowUpRight size={18} /></a>
            <a href={ENCARTEZAP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} />EncarteZap<ExternalLink size={17} /></a>
            <a href={CATALOGO_URL} target="_blank" rel="noreferrer"><PanelsTopLeft size={18} />CatálogoZap<ExternalLink size={17} /></a>
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="footer-brand"><Sparkles size={16} /> JOTA VICTOR</div>
        <span>© {currentYear}</span>
        <span>Natal, RN</span>
        <a href="#top">voltar ao topo ↑</a>
      </footer>
    </main>
  )
}

export default App
