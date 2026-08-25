import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { useRef } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react"
import "./App.css"

const ENCARTEZAP_URL = "https://www.encartezap.com.br"
const CATALOGO_URL = "https://catalogo-digital-opella.vercel.app/"
const CARTEIRAZAP_URL = "https://carteirazap-jotaai.vercel.app"
const JOTAVFIT_URL = "https://www.instagram.com/jotav.fit/"
const EMAIL = "contato@jotavictor.com"

const nowItems = [
  ["Base", "Natal, RN"],
  ["Trabalho", "Mercado farmacêutico"],
  ["Faculdade", "Educação Física"],
  ["Cabeça agora", "IA, agentes e produtos"],
]

const projects = [
  {
    number: "01",
    title: "EncarteZap",
    status: "no ar",
    type: "produto",
    accent: "#ff5a24",
    line: "Oferta boa não devia depender de PDF feio e mensagem perdida no WhatsApp.",
    body: "Foi daí que nasceu o EncarteZap: deixar a oferta mais fácil de ver, escolher e pedir.",
    link: ENCARTEZAP_URL,
    linkLabel: "encartezap.com.br",
  },
  {
    number: "02",
    title: "CatálogoZap",
    status: "no ar",
    type: "produto",
    accent: "#8bb76b",
    line: "Um catálogo digital que o cliente consegue usar sem precisar de explicação.",
    body: "É a ideia de trocar arquivo pesado por uma experiência simples de compra e pedido.",
    link: CATALOGO_URL,
    linkLabel: "ver catálogo",
  },
  {
    number: "03",
    title: "CarteiraZap",
    status: "refatorando",
    type: "produto pessoal",
    accent: "#6f90ff",
    line: "Minha carteira de clientes ficou grande demais pra depender da minha memória.",
    body: "Estou transformando isso num cockpit simples pra saber quem merece atenção e o que fazer depois.",
    link: CARTEIRAZAP_URL,
    linkLabel: "abrir projeto",
  },
  {
    number: "04",
    title: "Praxis",
    status: "uso diário",
    type: "sistema pessoal",
    accent: "#d0a56f",
    line: "Eu também precisava de um lugar que me dissesse o que fazer quando minha cabeça estivesse bagunçada.",
    body: "O Praxis é meu jeito de tirar obrigação, projeto e rotina da cabeça e colocar em algum sistema que eu realmente use.",
    link: null,
    linkLabel: null,
  },
  {
    number: "05",
    title: "GoFluxo",
    status: "construindo cases",
    type: "negócio",
    accent: "#f28b82",
    line: "Quero ver IA funcionando dentro de empresa de verdade, não só em demo bonita.",
    body: "A GoFluxo é onde automação, agentes e processo começam a encostar em operações reais.",
    link: null,
    linkLabel: null,
  },
  {
    number: "06",
    title: "Jotav.fit",
    status: "em construção",
    type: "conteúdo",
    accent: "#e6dfc9",
    line: "Treino é uma parte grande da minha vida e eu ainda quero construir algo em volta disso.",
    body: "Calistenia, força, físico e o processo real de ficar melhor sem vender uma versão perfeita de mim.",
    link: JOTAVFIT_URL,
    linkLabel: "@jotav.fit",
  },
]

const directions = [
  {
    title: "Construir meu próprio trabalho.",
    text: "Quero que, cada vez mais, minha renda venha de coisas que eu mesmo criei e coloquei no mundo.",
  },
  {
    title: "Ficar muito bom em tecnologia útil.",
    text: "IA e software me interessam quando resolvem coisa concreta. É nisso que eu quero aprofundar.",
  },
  {
    title: "Não virar personagem de internet.",
    text: "Quero continuar estudando, treinando, trabalhando e vivendo fora da tela enquanto construo tudo isso.",
  },
]

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const pageRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const portraitY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 90])
  const portraitRotate = useTransform(heroProgress, [0, 1], [-1.5, reduceMotion ? -1.5 : 1.5])
  const currentYear = new Date().getFullYear()

  return (
    <main className="site" ref={pageRef}>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Jota Victor, início">
          JOTA VICTOR
        </a>
        <div className="topbar-meta">
          <span><MapPin size={14} aria-hidden="true" /> Natal, RN</span>
          <span className="topbar-date">2026</span>
        </div>
        <nav aria-label="Navegação principal">
          <a href="#agora">Agora</a>
          <a href="#projetos">Projetos</a>
          <a href="#rumo">Rumo</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <div className="chapter-mark hero-mark" aria-hidden="true">01 / INÍCIO</div>

        <div className="hero-type">
          <motion.p
            className="hero-overline"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            VENDAS · PRODUTO · IA · TREINO
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 54 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            Eu pego coisa da vida real
            <span>e tento virar produto.</span>
          </motion.h1>
        </div>

        <motion.figure
          className="hero-photo"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -4 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: portraitY, rotate: portraitRotate }}
        >
          <img src="/images/joao-hero.jpg" alt="João Victor" fetchPriority="high" />
          <figcaption>João Victor, 2026</figcaption>
        </motion.figure>

        <motion.div
          className="hero-note"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Hoje isso passa por vendas, IA, software, Educação Física e treino.
            Não tenho tudo resolvido — esse site é um retrato do que estou construindo agora.
          </p>
          <a href="#projetos">
            ver projetos <ArrowDownRight size={17} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="hero-side-note" aria-hidden="true">em construção</div>
      </section>

      <section className="signal-strip" aria-label="Frentes que fazem parte da vida de João Victor">
        <div className="signal-track">
          <span>VENDO</span><i>✳</i><span>ESTUDO</span><i>✳</i><span>TREINO</span><i>✳</i><span>CONSTRUO</span><i>✳</i>
          <span aria-hidden="true">VENDO</span><i aria-hidden="true">✳</i><span aria-hidden="true">ESTUDO</span><i aria-hidden="true">✳</i><span aria-hidden="true">TREINO</span><i aria-hidden="true">✳</i><span aria-hidden="true">CONSTRUO</span><i aria-hidden="true">✳</i>
        </div>
      </section>

      <section className="editorial-section now" id="agora">
        <div className="section-rail">
          <span>02</span>
          <p>AGORA</p>
        </div>

        <div className="section-main">
          <Reveal className="section-intro compact-intro">
            <h2>O que ocupa minha cabeça hoje.</h2>
            <p>Sem bio congelada. Só o estado atual.</p>
          </Reveal>

          <div className="now-list">
            {nowItems.map(([label, value], index) => (
              <Reveal className="now-row" key={label} delay={index * 0.04}>
                <span>{label}</span>
                <strong>{value}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="projects" id="projetos">
        <div className="projects-shell">
          <div className="section-rail dark-rail">
            <span>03</span>
            <p>PROJETOS</p>
          </div>

          <div className="section-main">
            <Reveal className="projects-heading">
              <h2>Coisas que eu queria que existissem.</h2>
              <p>Algumas já estão no ar. Outras ainda estão tomando forma.</p>
            </Reveal>

            <div className="project-stack">
              {projects.map((project, index) => (
                <Reveal key={project.number} delay={Math.min(index * 0.035, 0.14)}>
                  <article
                    className="project-row"
                    style={{ "--accent": project.accent } as CSSProperties}
                  >
                    <div className="project-index">{project.number}</div>
                    <div className="project-title-block">
                      <div className="project-meta">
                        <span>{project.type}</span>
                        <i>•</i>
                        <span>{project.status}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="project-line">{project.line}</p>
                    </div>
                    <div className="project-detail">
                      <p>{project.body}</p>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          {project.linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="project-private">por enquanto, interno</span>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section life" id="vida">
        <div className="section-rail">
          <span>04</span>
          <p>VIDA</p>
        </div>

        <div className="section-main">
          <Reveal className="life-copy">
            <h2>Nem tudo acontece na tela.</h2>
            <p>
              Tem trabalho, aula, treino, rua, projeto que dá certo e projeto que volta pra prancheta.
              Essa parte também explica quem eu sou.
            </p>
          </Reveal>

          <div className="photo-composition" aria-label="Momentos da rotina de João Victor">
            <Reveal className="photo-frame frame-a">
              <img src="/images/joao-work.jpg" alt="Momento da rotina de João Victor" loading="lazy" />
            </Reveal>
            <Reveal className="photo-frame frame-b" delay={0.08}>
              <img src="/images/joao-car.jpg" alt="Momento da rotina de João Victor" loading="lazy" />
            </Reveal>
            <Reveal className="photo-frame frame-c" delay={0.14}>
              <img src="/images/joao-gym.jpg" alt="Momento da rotina de João Victor" loading="lazy" />
            </Reveal>
            <div className="photo-note" aria-hidden="true">TRABALHO / AULA / TREINO / RUA</div>
          </div>
        </div>
      </section>

      <section className="direction" id="rumo">
        <div className="direction-shell">
          <div className="section-rail">
            <span>05</span>
            <p>RUMO</p>
          </div>

          <div className="section-main">
            <Reveal className="direction-heading">
              <p className="serif-note">Não é sobre parecer pronto.</p>
              <h2>É sobre ficar cada vez mais perto de quem eu quero ser.</h2>
            </Reveal>

            <div className="direction-list">
              {directions.map((item, index) => (
                <Reveal className="direction-row" key={item.title} delay={index * 0.06}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contato">
        <Reveal className="contact-inner">
          <p className="contact-kicker">06 / CONTATO</p>
          <h2>Se alguma coisa daqui bateu com o que você está construindo, me chama.</h2>
          <div className="contact-links">
            <a className="contact-main" href={"mailto:" + EMAIL}>
              <Mail size={18} aria-hidden="true" /> {EMAIL}
            </a>
            <a href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">
              @jotav.fit <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>

      <footer>
        <div>
          <strong>JOTA VICTOR</strong>
          <span>© {currentYear}</span>
        </div>
        <p>jotavictor.com</p>
      </footer>
    </main>
  )
}

export default App
