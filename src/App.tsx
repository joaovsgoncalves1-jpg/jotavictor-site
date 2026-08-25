import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react"
import "./App.css"

const ENCARTEZAP_URL = "https://www.encartezap.com.br"
const CATALOGO_URL = "https://catalogo-digital-opella.vercel.app/"
const CARTEIRAZAP_URL = "https://carteirazap-jotaai.vercel.app/landing"
const PRAXIS_URL = "https://dopraxis.app/"
const GOFLUXO_URL = "https://www.gofluxo.com.br/"
const JOTAVFIT_URL = "https://www.instagram.com/jotav.fit/"
const GITHUB_URL = "https://github.com/joaovsgoncalves1-jpg"
const EMAIL = "contato@jotavictor.com"

const projects = [
  {
    id: "01",
    slug: "encartezap",
    mark: "EZ",
    title: "EncarteZap",
    status: "produto",
    copy: "Uma forma simples de criar ofertas bonitas e prontas pra mandar no WhatsApp, sem depender de designer ou ficar preso em PDF.",
    href: ENCARTEZAP_URL,
    label: "Conhecer o EncarteZap",
  },
  {
    id: "02",
    slug: "catalogozap",
    mark: "CZ",
    title: "CatálogoZap",
    status: "produto",
    copy: "Um catálogo pensado pra funcionar bem no celular. O cliente abre, escolhe os produtos, monta o pedido e chama no WhatsApp.",
    href: CATALOGO_URL,
    label: "Conhecer o CatálogoZap",
  },
  {
    id: "03",
    slug: "carteirazap",
    mark: "CR",
    title: "CarteiraZap",
    status: "refatorando",
    copy: "Nasceu da dificuldade de cuidar de muitos clientes ao mesmo tempo. A ideia é ter tudo mais organizado e saber quem comprou, quem sumiu e quem precisa de atenção.",
    href: CARTEIRAZAP_URL,
    label: "Conhecer o CarteiraZap",
  },
  {
    id: "04",
    slug: "praxis",
    mark: "PX",
    title: "Praxis",
    status: "uso todo dia",
    copy: "Começou por outro problema meu. Eu precisava de um lugar pra organizar minha vida, meus projetos e o que realmente precisava ser feito naquele momento. Hoje é uma das ferramentas que eu mais uso no dia a dia.",
    href: PRAXIS_URL,
    label: "Conhecer o Praxis",
  },
  {
    id: "05",
    slug: "gofluxo",
    mark: "GF",
    title: "GoFluxo",
    status: "empresa",
    copy: "É onde eu tô levando tecnologia e automação pra problemas de empresas. A ideia é olhar pra processos que ainda dão trabalho demais e encontrar formas melhores de fazer.",
    href: GOFLUXO_URL,
    label: "Conhecer a GoFluxo",
  },
  {
    id: "06",
    slug: "jotavfit",
    mark: "JF",
    title: "Jotav.fit",
    status: "construindo",
    copy: "É a parte fitness começando a virar algo maior. Quero juntar o que eu vivo no treino, o que tô aprendendo em Educação Física e o conteúdo que quero produzir nessa área.",
    href: JOTAVFIT_URL,
    label: "Acompanhar o Jotav.fit",
  },
]

const nowItems = [
  ["base", "Natal, RN"],
  ["trabalho", "vendas no mercado farmacêutico"],
  ["faculdade", "Educação Física"],
  ["construindo", "CarteiraZap, Praxis e GoFluxo"],
  ["estudando", "agentes, automação e IA aplicada"],
  ["treino", "calistenia"],
]

function deterministic(seed: number) {
  const x = Math.sin(seed * 999.91) * 43758.5453
  return x - Math.floor(x)
}

function GoldField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        x: 2 + deterministic(index + 2) * 96,
        y: deterministic(index + 71) * 100,
        size: 1 + deterministic(index + 131) * 2.6,
        delay: deterministic(index + 191) * -18,
        duration: 12 + deterministic(index + 251) * 20,
        drift: -18 + deterministic(index + 311) * 36,
        opacity: 0.14 + deterministic(index + 371) * 0.48,
      })),
    [],
  )

  return (
    <div className="gold-field" aria-hidden="true">
      <div className="ambient-ring ring-one" />
      <div className="ambient-ring ring-two" />
      <div className="ambient-ring ring-three" />
      {particles.map((particle, index) => (
        <i
          key={index}
          className="gold-particle"
          style={
            {
              "--x": `${particle.x}%`,
              "--y": `${particle.y}%`,
              "--size": `${particle.size}px`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
              "--drift": `${particle.drift}px`,
              "--particle-opacity": particle.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 38, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollY, [0, 900], [1.02, reduceMotion ? 1.02 : 1.12])
  const heroY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 105])
  const heroCopyY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -42])
  const [scrolled, setScrolled] = useState(false)
  const shellRef = useRef<HTMLElement>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => scrollY.on("change", (latest) => setScrolled(latest > 52)), [scrollY])

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !shellRef.current) return
    const x = (event.clientX / window.innerWidth) * 100
    const y = (event.clientY / window.innerHeight) * 100
    shellRef.current.style.setProperty("--pointer-x", `${x}%`)
    shellRef.current.style.setProperty("--pointer-y", `${y}%`)
  }

  return (
    <main className="site-shell" ref={shellRef} onPointerMove={handlePointerMove}>
      <GoldField />
      <div className="pointer-halo" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <nav className={`top-nav${scrolled ? " is-scrolled" : ""}`} aria-label="Navegação principal">
        <a href="#top" className="brand" aria-label="Jota Victor, início">
          JOTA<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#sobre">sobre</a>
          <a href="#projetos">projetos</a>
          <a href="#agora">agora</a>
        </div>
        <a href={`mailto:${EMAIL}`} className="nav-mail">
          falar comigo <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </nav>

      <section className="hero" id="top">
        <motion.div className="hero-media" style={{ scale: heroScale, y: heroY }}>
          <img src="/images/joao-hero.jpg" alt="João Victor" fetchPriority="high" />
        </motion.div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-gold-wash" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <motion.div className="hero-content" style={{ y: heroCopyY }}>
          <motion.p
            className="hero-kicker"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            JOÃO VICTOR · NATAL, RN
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 58 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            JOTA <em>VICTOR</em>
          </motion.h1>

          <motion.p
            className="hero-statement"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.3 }}
          >
            Vendas, tecnologia, negócios e treino. Eu mostro o que tô construindo no meio disso tudo.
          </motion.p>

          <motion.div
            className="hero-follow"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="follow-label">ACOMPANHE O QUE EU TÔ FAZENDO</p>
            <div className="hero-socials">
              <a href={JOTAVFIT_URL} target="_blank" rel="noreferrer" aria-label="Jotav.fit no Instagram">
                <b className="social-mark">IG</b>
                <span>Jotav.fit</span>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub de João Victor">
                <b className="social-mark">GH</b>
                <span>GitHub</span>
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Enviar e-mail para João Victor">
                <Mail size={19} aria-hidden="true" />
                <span>E-mail</span>
              </a>
              <a href="#projetos" className="hero-project-link">
                meus projetos <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-side-note">EM CONSTRUÇÃO · {currentYear}</div>
      </section>

      <section className="gold-marquee" aria-hidden="true">
        <div className="gold-marquee-track">
          <span>VENDAS</span><i>✦</i><span>TECNOLOGIA</span><i>✦</i><span>NEGÓCIOS</span><i>✦</i><span>PRODUTOS</span><i>✦</i><span>EDUCAÇÃO FÍSICA</span><i>✦</i><span>CALISTENIA</span><i>✦</i>
          <span>VENDAS</span><i>✦</i><span>TECNOLOGIA</span><i>✦</i><span>NEGÓCIOS</span><i>✦</i><span>PRODUTOS</span><i>✦</i><span>EDUCAÇÃO FÍSICA</span><i>✦</i><span>CALISTENIA</span><i>✦</i>
        </div>
      </section>

      <section className="life-section" id="sobre">
        <div className="section-shell">
          <Reveal className="life-intro">
            <p className="section-label">01 · EU QUERO CONSTRUIR</p>
            <h2>Eu não quero construir só uma carreira.</h2>
            <div className="life-copy">
              <p>Quero construir uma vida que faça sentido pra mim.</p>
              <p>Trabalho, projetos, dinheiro, físico, faculdade. Tudo isso faz parte da mesma vida, e eu quero conseguir crescer em cada uma dessas áreas sem precisar abandonar as outras.</p>
              <p>Ainda tô descobrindo como fazer isso direito. Esse site é um pouco sobre acompanhar esse processo.</p>
            </div>
          </Reveal>

          <div className="life-grid">
            <Reveal className="life-card life-work">
              <span>01</span>
              <p className="life-card-label">TRABALHO E NEGÓCIOS</p>
              <h3>Vendas, clientes e ideias que podem virar negócio.</h3>
              <p>É onde eu aprendo na prática sobre relacionamento, execução e o que realmente dá trabalho no dia a dia.</p>
            </Reveal>

            <Reveal className="life-card life-tech" delay={0.06}>
              <span>02</span>
              <p className="life-card-label">TECNOLOGIA</p>
              <h3>Um jeito de tirar ideia da cabeça e colocar pra funcionar.</h3>
              <p>Ferramentas, automação e tudo que me ajuda a transformar uma ideia em alguma coisa que eu consigo usar.</p>
            </Reveal>

            <Reveal className="life-card life-training" delay={0.12}>
              <span>03</span>
              <p className="life-card-label">TREINO E EDUCAÇÃO FÍSICA</p>
              <h3>Uma parte da minha vida que já deixou de ser só hobby faz tempo.</h3>
              <p>Treino há anos. Agora, estudando Educação Física, quero entender cada vez mais esse universo e descobrir até onde consigo levar isso.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="section-shell story-grid">
          <Reveal className="story-heading">
            <p className="section-label">02 · COMO OS PROJETOS COMEÇARAM</p>
            <h2>Tudo começou tentando facilitar meu próprio trabalho.</h2>
          </Reveal>

          <Reveal className="story-copy" delay={0.08}>
            <p>Eu trabalhava com muitos clientes e percebia que gastava tempo demais tentando lembrar de tudo.</p>
            <p className="story-rhythm">Quem eu precisava chamar. Quem tinha parado de comprar. Onde estava uma informação. O que eu tinha combinado com cada cliente.</p>
            <p>Comecei a criar algumas coisas pra me ajudar nisso. No começo era só pra facilitar meu próprio dia.</p>
            <p>Só que algumas ideias foram funcionando. Uma foi puxando a outra e, com o tempo, coisas que eu tinha feito só pra mim começaram a virar projetos de verdade.</p>
            <p>Foi assim que surgiram <strong>EncarteZap, CatálogoZap, CarteiraZap</strong> e outros projetos que vieram depois.</p>
            <p className="story-close">Quase tudo que eu crio começa assim. Eu vejo alguma coisa que podia ser mais simples e começo a pensar em como faria melhor.</p>
          </Reveal>
        </div>
      </section>

      <section className="projects-section" id="projetos">
        <div className="section-shell projects-head">
          <Reveal>
            <p className="section-label">03 · O QUE EU TÔ CONSTRUINDO</p>
            <h2>Algumas ideias viraram coisa de verdade.</h2>
            <p>Tem produto rodando, coisa em refatoração e projeto que ainda tá começando. Esses são os principais hoje.</p>
          </Reveal>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.045, 0.18)} className={`project-wrap project-wrap-${project.slug}`}>
              <a className={`project-card project-${project.slug}`} href={project.href} target="_blank" rel="noreferrer">
                <div className="project-card-top">
                  <span className="project-index">{project.id}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <div className="project-mark" aria-hidden="true">{project.mark}</div>
                <div className="project-card-copy">
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <span className="project-card-link">{project.label} <ArrowUpRight size={17} aria-hidden="true" /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="now-section" id="agora">
        <div className="section-shell now-grid">
          <Reveal className="now-intro">
            <p className="section-label">04 · AGORA</p>
            <h2>Sem fingir que tá tudo alinhado.</h2>
            <p>É nisso aqui que eu tô tentando avançar hoje.</p>
          </Reveal>

          <div className="now-list">
            {nowItems.map(([label, value], index) => (
              <Reveal className="now-row" key={label} delay={index * 0.035}>
                <span>{label}</span>
                <strong>{value}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="direction-section">
        <div className="section-shell direction-grid">
          <Reveal>
            <p className="section-label">05 · PRA ONDE EU TÔ INDO</p>
            <h2>Eu ainda não cheguei onde eu quero.</h2>
          </Reveal>
          <Reveal className="direction-copy" delay={0.08}>
            <p>
              Quero construir produtos que tenham gente usando porque resolvem alguma coisa de verdade. Quero ficar melhor em vendas, tecnologia e negócios. Quero levar meu físico e minha formação a sério. E quero conseguir olhar pra trás e ver que as coisas que eu comecei não ficaram só na ideia.
            </p>
            <p className="gold-line">É isso. Sem personagem pronto.</p>
          </Reveal>
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-glow" aria-hidden="true" />
        <Reveal className="contact-inner">
          <Sparkles size={22} aria-hidden="true" />
          <p className="section-label">06 · CONTATO</p>
          <h2>Se tu chegou até aqui e alguma coisa fez sentido, me chama.</h2>
          <p>Produto, vendas, tecnologia, treino ou projeto. Não precisa chegar com pitch bonito.</p>
          <div className="contact-links">
            <a href={`mailto:${EMAIL}`} className="gold-button">
              <Mail size={17} aria-hidden="true" /> {EMAIL}
            </a>
            <a href={JOTAVFIT_URL} target="_blank" rel="noreferrer" className="quiet-link">
              Jotav.fit
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="quiet-link">
              GitHub
            </a>
            <a href={ENCARTEZAP_URL} target="_blank" rel="noreferrer" className="quiet-link">
              <MessageCircle size={16} aria-hidden="true" /> EncarteZap
            </a>
            <a href={CATALOGO_URL} target="_blank" rel="noreferrer" className="quiet-link">
              <PanelsTopLeft size={16} aria-hidden="true" /> CatálogoZap
            </a>
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="footer-brand">JOTA<span>.</span></div>
        <div><MapPin size={14} aria-hidden="true" /> Natal, RN</div>
        <span>© {currentYear}</span>
        <a href="#top">voltar ao topo ↑</a>
      </footer>
    </main>
  )
}

export default App
