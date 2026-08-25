import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Dumbbell,
  ExternalLink,
  GraduationCap,
  Layers3,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react"
import "./App.css"

const ENCARTEZAP_URL = "https://www.encartezap.com.br"
const CATALOGO_URL = "https://catalogo-digital-opella.vercel.app/"
const CARTEIRAZAP_URL = "https://carteirazap-jotaai.vercel.app"
const JOTAVFIT_URL = "https://www.instagram.com/jotav.fit/"
const EMAIL = "contato@jotavictor.com"

const rotatingWords = ["produto", "automação", "sistema", "ideia"]

const nowItems = [
  {
    icon: MapPin,
    label: "Base",
    value: "Natal, RN",
    note: "vivendo, estudando e construindo daqui",
  },
  {
    icon: BriefcaseBusiness,
    label: "Trabalho",
    value: "Mercado farmacêutico",
    note: "vendas e problemas reais todos os dias",
  },
  {
    icon: GraduationCap,
    label: "Faculdade",
    value: "Educação Física",
    note: "entendendo melhor o corpo que eu treino",
  },
  {
    icon: BrainCircuit,
    label: "Obcecado agora",
    value: "Agentes + IA aplicada",
    note: "menos conversa, mais execução",
  },
]

const projects = [
  {
    key: "encartezap",
    number: "01",
    title: "EncarteZap",
    status: "produto real",
    role: "flagship",
    color: "#efb55d",
    icon: MessageCircle,
    line: "Oferta boa não devia morrer dentro de PDF e lista de transmissão.",
    body: "O EncarteZap nasceu da rotina comercial: uma forma mais simples de transformar oferta em vitrine e mandar o cliente direto pro WhatsApp.",
    link: ENCARTEZAP_URL,
    linkLabel: "Abrir EncarteZap",
  },
  {
    key: "catalogozap",
    number: "02",
    title: "CatálogoZap",
    status: "em produção",
    role: "produto",
    color: "#6fcf97",
    icon: PanelsTopLeft,
    line: "Catálogo que parece produto, não arquivo anexado.",
    body: "Uma experiência de compra mais visual para o cliente navegar, escolher e pedir sem precisar decifrar PDF pesado.",
    link: CATALOGO_URL,
    linkLabel: "Ver Catálogo",
  },
  {
    key: "carteirazap",
    number: "03",
    title: "CarteiraZap",
    status: "refatorando",
    role: "cockpit comercial",
    color: "#5fa8ff",
    icon: Layers3,
    line: "140 clientes na cabeça não é gestão. É memória sendo usada como banco de dados.",
    body: "Meu cockpit para enxergar a carteira, priorizar quem precisa de atenção e transformar dado comercial em próxima ação.",
    link: CARTEIRAZAP_URL,
    linkLabel: "Abrir CarteiraZap",
  },
  {
    key: "praxis",
    number: "04",
    title: "Praxis",
    status: "uso pessoal",
    role: "sistema de vida",
    color: "#c69bff",
    icon: Zap,
    line: "Eu também precisava parar de depender da minha própria cabeça.",
    body: "Um sistema pessoal para organizar obrigações, projetos e execução sem transformar a vida em uma planilha bonita que ninguém usa.",
    link: null,
    linkLabel: null,
  },
  {
    key: "gofluxo",
    number: "05",
    title: "GoFluxo",
    status: "casos reais",
    role: "IA para empresas",
    color: "#ff7c6b",
    icon: Workflow,
    line: "A parte mais interessante da IA começa quando ela encosta numa operação de verdade.",
    body: "Automação, agentes e processos aplicados a empresas reais — saindo do prompt bonito e entrando em atendimento, financeiro, vendas e operação.",
    link: null,
    linkLabel: null,
  },
  {
    key: "jotavfit",
    number: "06",
    title: "Jotav.fit",
    status: "em construção",
    role: "corpo + conteúdo",
    color: "#e9e1cd",
    icon: Dumbbell,
    line: "Treino é uma das poucas coisas que não aceita argumento bonito.",
    body: "Calistenia, força e o processo de construir um físico melhor sem fingir que existe atalho.",
    link: JOTAVFIT_URL,
    linkLabel: "Ver @jotav.fit",
  },
]

const beliefs = [
  "Problema real vale mais que ideia genial.",
  "IA boa executa. Não só responde bonito.",
  "Simplificar é trabalho de engenharia.",
  "Vender me ensinou mais sobre produto do que muita tela do Figma.",
  "O que eu construo precisa caber na vida real.",
]

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 46 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 0.3], [0, reduceMotion ? 0 : 64])
  const portraitScale = useTransform(scrollYProgress, [0, 0.3], [1, reduceMotion ? 1 : 1.055])
  const [wordIndex, setWordIndex] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    heroRef.current.style.setProperty("--pointer-x", `${x}%`)
    heroRef.current.style.setProperty("--pointer-y", `${y}%`)
  }

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <nav className="nav" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="Jota Victor, início">
          JV
        </a>
        <div className="nav-links">
          <a href="#agora">Agora</a>
          <a href="#projetos">Projetos</a>
          <a href="#vida">Vida real</a>
          <a className="nav-contact" href="#contato">Falar comigo</a>
        </div>
      </nav>

      <section className="hero" id="top" ref={heroRef} onPointerMove={handlePointerMove}>
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-copy">
            <motion.p
              className="hero-kicker"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              JOÃO VICTOR · JOTA
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 54 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Eu pego coisa da vida real e tento virar{" "}
              <span className="rotating-slot" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    className="rotating-word"
                    initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -22, filter: "blur(6px)" }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {rotatingWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              Trabalho com vendas, construo produtos com IA e software, estudo Educação Física e treino. O site é menos currículo e mais um retrato do que eu estou tentando construir com tudo isso.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.64, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="button primary" href="#projetos">
                Ver o que eu tô construindo <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href={"mailto:" + EMAIL}>
                {EMAIL} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="portrait-wrap"
            initial={reduceMotion ? false : { opacity: 0, x: 52, rotate: 2 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: portraitY, scale: portraitScale }}
          >
            <div className="portrait-card">
              <img src="/images/joao-hero.jpg" alt="João Victor" fetchPriority="high" />
              <div className="portrait-shade" aria-hidden="true" />
              <div className="portrait-topline">
                <span className="live-dot" aria-hidden="true" />
                construindo agora
              </div>
              <div className="portrait-tags" aria-label="Áreas de atuação">
                <span>produtos</span>
                <span>IA</span>
                <span>vendas</span>
                <span>treino</span>
              </div>
            </div>
            <span className="portrait-note note-one">não é personagem.</span>
            <span className="portrait-note note-two">é processo.</span>
          </motion.div>
        </div>

        <div className="hero-bottom">
          <span>scroll pra conhecer</span>
          <ArrowDown size={16} aria-hidden="true" />
        </div>
      </section>

      <section className="ticker" aria-label="Áreas que fazem parte da vida de João Victor">
        <div className="ticker-track">
          <span>PRODUTOS</span><i>✦</i><span>IA</span><i>✦</i><span>VENDAS</span><i>✦</i><span>AUTOMAÇÃO</span><i>✦</i><span>CALISTENIA</span><i>✦</i><span>VIDA REAL</span><i>✦</i>
          <span aria-hidden="true">PRODUTOS</span><i aria-hidden="true">✦</i><span aria-hidden="true">IA</span><i aria-hidden="true">✦</i><span aria-hidden="true">VENDAS</span><i aria-hidden="true">✦</i><span aria-hidden="true">AUTOMAÇÃO</span><i aria-hidden="true">✦</i><span aria-hidden="true">CALISTENIA</span><i aria-hidden="true">✦</i><span aria-hidden="true">VIDA REAL</span><i aria-hidden="true">✦</i>
        </div>
      </section>

      <section className="section now-section" id="agora">
        <Reveal className="section-head split-head">
          <div>
            <p className="eyebrow">AGORA</p>
            <h2>Esse site tem que mudar quando minha vida mudar.</h2>
          </div>
          <p className="section-copy">
            Então essa parte é simples: onde eu tô, o que ocupa minha cabeça e o que eu tô tentando fazer direito neste momento.
          </p>
        </Reveal>

        <div className="now-grid">
          {nowItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal className="now-card" key={item.label} delay={index * 0.07}>
                <div className="now-card-top">
                  <Icon size={19} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="projects-section" id="projetos">
        <div className="section projects-inner">
          <Reveal className="section-head project-heading">
            <p className="eyebrow">O QUE EU TÔ CONSTRUINDO</p>
            <h2>Projetos que nasceram porque alguma coisa me incomodou.</h2>
            <p className="section-copy">Alguns já têm usuário. Outros ainda estão virando produto. Todos começaram de um problema que eu conheço de perto.</p>
          </Reveal>

          <div className="project-list">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <Reveal key={project.key} delay={Math.min(index * 0.04, 0.16)}>
                  <article
                    className="project-row"
                    style={{ "--project-color": project.color } as CSSProperties}
                  >
                    <div className="project-number">{project.number}</div>
                    <div className="project-icon"><Icon size={22} aria-hidden="true" /></div>
                    <div className="project-main">
                      <div className="project-meta">
                        <span>{project.role}</span>
                        <span className="project-status"><i />{project.status}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p className="project-line">{project.line}</p>
                    </div>
                    <div className="project-side">
                      <p>{project.body}</p>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          {project.linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="no-link">por enquanto, fica aqui dentro</span>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section story-section">
        <Reveal className="story-lead">
          <p className="eyebrow">O FIO QUE LIGA TUDO</p>
          <h2>Eu não comecei querendo “ter várias marcas”.</h2>
          <p>
            Comecei vendendo, treinando, testando ferramenta, ficando puto com processo ruim e tentando resolver as coisas do meu jeito. Aos poucos, uma coisa começou a alimentar a outra.
          </p>
        </Reveal>

        <div className="story-flow" aria-label="Como as frentes de João Victor se conectam">
          <Reveal className="story-step">
            <span>01</span><strong>Eu vivo o problema.</strong><p>No campo, no treino, na faculdade ou tocando projeto.</p>
          </Reveal>
          <div className="flow-line" aria-hidden="true" />
          <Reveal className="story-step" delay={0.08}>
            <span>02</span><strong>Eu tento entender.</strong><p>Sem transformar tudo numa teoria complicada.</p>
          </Reveal>
          <div className="flow-line" aria-hidden="true" />
          <Reveal className="story-step" delay={0.16}>
            <span>03</span><strong>Eu construo.</strong><p>Produto, automação, conteúdo ou um sistema pra mim mesmo.</p>
          </Reveal>
        </div>
      </section>

      <section className="life-section" id="vida">
        <div className="section life-inner">
          <Reveal className="section-head split-head">
            <div>
              <p className="eyebrow">VIDA FORA DA TELA</p>
              <h2>O código é só uma parte.</h2>
            </div>
            <p className="section-copy">
              O resto também entra no que eu construo: rua, cliente, treino, aula, erro, tentativa, rotina. Eu prefiro mostrar isso do que inventar uma bio perfeita.
            </p>
          </Reveal>

          <div className="photo-grid">
            <Reveal className="life-photo photo-tall">
              <img src="/images/joao-work.jpg" alt="João Victor trabalhando" loading="lazy" />
              <div className="photo-caption"><span>trabalho</span><p>problema real não aparece em slide</p></div>
            </Reveal>
            <Reveal className="life-photo" delay={0.08}>
              <img src="/images/joao-car.jpg" alt="João Victor na rotina de campo" loading="lazy" />
              <div className="photo-caption"><span>rua</span><p>boa parte das ideias começa longe do computador</p></div>
            </Reveal>
            <Reveal className="life-photo" delay={0.16}>
              <img src="/images/joao-gym.jpg" alt="João Victor treinando" loading="lazy" />
              <div className="photo-caption"><span>treino</span><p>o corpo não aceita feature fake</p></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section beliefs-section">
        <Reveal className="beliefs-intro">
          <p className="eyebrow">COMO EU PENSO</p>
          <h2>Algumas coisas que eu tento não esquecer.</h2>
        </Reveal>
        <div className="belief-list">
          {beliefs.map((belief, index) => (
            <Reveal className="belief" key={belief} delay={index * 0.045}>
              <span>0{index + 1}</span>
              <p>{belief}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-orb" aria-hidden="true" />
        <Reveal className="contact-inner">
          <Sparkles size={26} aria-hidden="true" />
          <p className="eyebrow">SE FEZ SENTIDO</p>
          <h2>Me chama. A conversa pode virar alguma coisa.</h2>
          <p>Produto, IA, vendas, automação, treino ou só uma ideia boa. Não precisa chegar com pitch pronto.</p>
          <div className="contact-actions">
            <a className="button primary light" href={"mailto:" + EMAIL}>
              {EMAIL} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="button outline-light" href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">
              @jotav.fit <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>

      <footer>
        <div>
          <strong>JOTA VICTOR</strong>
          <span>© {currentYear}</span>
        </div>
        <p>Ainda construindo.</p>
        <div className="footer-links">
          <a href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">EncarteZap</a>
          <a href={CATALOGO_URL} target="_blank" rel="noopener noreferrer">CatálogoZap</a>
          <a href={CARTEIRAZAP_URL} target="_blank" rel="noopener noreferrer">CarteiraZap</a>
          <a href={"mailto:" + EMAIL}>Email</a>
        </div>
      </footer>
    </main>
  )
}

export default App
