import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  Sparkles,
  Workflow,
} from "lucide-react"
import "./App.css"

const ENCARTEZAP_URL = "https://www.encartezap.com.br"
const CATALOGO_URL = "https://catalogo-digital-opella.vercel.app/"
const CARTEIRAZAP_URL = "https://carteirazap-jotaai.vercel.app/landing"
const PRAXIS_URL = "https://dopraxis.app/"
const GOFLUXO_URL = "https://www.gofluxo.com.br/"
const JOTAVFIT_URL = "https://www.instagram.com/jotav.fit/"
const EMAIL = "contato@jotavictor.com"

const projects = [
  {
    id: "01",
    title: "EncarteZap",
    status: "produto",
    copy: "Nasceu porque eu cansava de ver oferta boa morrer em PDF e lista de transmissão. A ideia é deixar divulgação e pedido pelo WhatsApp bem mais simples.",
    href: ENCARTEZAP_URL,
    label: "ver projeto",
  },
  {
    id: "02",
    title: "CatálogoZap",
    status: "produto",
    copy: "Uma evolução da mesma dor: um catálogo que o cliente realmente consegue usar no celular. Abre, escolhe, monta o pedido e chama no WhatsApp.",
    href: CATALOGO_URL,
    label: "ver landing",
  },
  {
    id: "03",
    title: "CarteiraZap",
    status: "refatorando",
    copy: "Eu tenho uma carteira grande demais pra depender da cabeça. O CarteiraZap é meu CRM de campo: quem comprou, quem sumiu, quem precisa de follow-up e o que eu faço hoje.",
    href: CARTEIRAZAP_URL,
    label: "ver landing",
  },
  {
    id: "04",
    title: "Praxis",
    status: "uso todo dia",
    copy: "Eu fiz porque eu mesmo me perdia entre obrigação, projeto, faculdade e ideia nova. Hoje é onde eu tento transformar intenção em execução sem deixar tudo solto na cabeça.",
    href: PRAXIS_URL,
    label: "ver Praxis",
  },
  {
    id: "05",
    title: "GoFluxo",
    status: "empresa",
    copy: "É onde IA deixa de ser brincadeira de prompt e encosta em operação real. A gente usa agentes e automação pra resolver problema que empresa sente na rotina e no caixa.",
    href: GOFLUXO_URL,
    label: "site oficial",
  },
  {
    id: "06",
    title: "Jotav.fit",
    status: "construindo",
    copy: "É onde eu quero juntar minha vida de treino com Educação Física e, aos poucos, transformar essa parte de mim em algo profissional também.",
    href: JOTAVFIT_URL,
    label: "ver @jotav.fit",
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
            Eu trabalho com vendas,
            <br />
            construo com IA e <em>treino sério.</em>
          </motion.h1>

          <motion.p
            className="hero-statement"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.3 }}
          >
            Tô tentando descobrir até onde dá pra levar tudo isso.
          </motion.p>

          <motion.p
            className="hero-sub"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Hoje minha vida é uma mistura de cliente, WhatsApp, código, agentes de IA, faculdade e treino. Algumas dessas dores viraram produto. Outras ainda tão virando.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.66, delay: 0.5 }}
          >
            <a href="#projetos" className="gold-button">
              ver o que eu tô construindo <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={JOTAVFIT_URL} target="_blank" rel="noreferrer" className="quiet-link">
              @jotav.fit <ExternalLink size={14} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <div className="hero-side-note">EM CONSTRUÇÃO · {currentYear}</div>
      </section>

      <section className="gold-marquee" aria-hidden="true">
        <div className="gold-marquee-track">
          <span>VENDAS</span><i>✦</i><span>PRODUTOS</span><i>✦</i><span>IA</span><i>✦</i><span>AUTOMAÇÃO</span><i>✦</i><span>EDUCAÇÃO FÍSICA</span><i>✦</i><span>CALISTENIA</span><i>✦</i>
          <span>VENDAS</span><i>✦</i><span>PRODUTOS</span><i>✦</i><span>IA</span><i>✦</i><span>AUTOMAÇÃO</span><i>✦</i><span>EDUCAÇÃO FÍSICA</span><i>✦</i><span>CALISTENIA</span><i>✦</i>
        </div>
      </section>

      <section className="story-section" id="sobre">
        <div className="section-shell story-grid">
          <Reveal className="story-heading">
            <p className="section-label">01 · COMO ISSO COMEÇOU</p>
            <h2>Eu não comecei querendo virar dev.</h2>
            <h2 className="gold-text">Comecei vendendo.</h2>
          </Reveal>

          <Reveal className="story-copy" delay={0.08}>
            <p>
              Foi na rua, cuidando de carteira, cliente, meta, pedido e follow-up, que eu comecei a ficar incomodado com processo ruim. Aí fui atrás de IA, automação e código pra resolver problema meu.
            </p>
            <p>
              O resto foi crescendo. Uma ferramenta virou outra, uma ideia puxou outra e eu comecei a perceber que gosto muito mais de construir coisa que eu mesmo preciso do que de inventar projeto só pra dizer que fiz.
            </p>
            <blockquote>
              “Se eu entendo o problema, eu fico com vontade de construir alguma coisa pra resolver.”
            </blockquote>
            <p>
              É basicamente isso que eu busco: ficar bom de verdade em entender problema, construir solução e colocar pra funcionar no mundo real. Não só fazer demo bonita.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="fronts-section">
        <div className="section-shell fronts-intro">
          <Reveal>
            <p className="section-label">02 · AS TRÊS FRENTES</p>
            <h2>Hoje eu tô dividido entre três coisas. E uma acaba alimentando a outra.</h2>
          </Reveal>
        </div>

        <article className="front-row">
          <div className="front-media portrait-media">
            <motion.img
              src="/images/joao-work.jpg"
              alt="João Victor em um registro da rotina de trabalho"
              loading="lazy"
              initial={reduceMotion ? false : { scale: 1.04 }}
              whileInView={reduceMotion ? undefined : { scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <Reveal className="front-copy">
            <span className="front-number">01 / RUA</span>
            <h3>Vendas</h3>
            <p>
              É meu trabalho real. Cliente, meta, rota, negociação, pedido, pós-venda. Foi aqui que eu aprendi que problema que parece pequeno no computador vira um inferno quando você repete todo dia.
            </p>
            <p className="front-note">Boa parte dos meus produtos nasceu daqui.</p>
          </Reveal>
        </article>

        <article className="front-row reverse build-row">
          <div className="build-visual" aria-hidden="true">
            <div className="build-core"><Workflow size={32} /></div>
            <span className="build-name name-a">CarteiraZap</span>
            <span className="build-name name-b">Praxis</span>
            <span className="build-name name-c">CatálogoZap</span>
            <span className="build-name name-d">GoFluxo</span>
            <span className="build-name name-e">EncarteZap</span>
          </div>
          <Reveal className="front-copy">
            <span className="front-number">02 / TELA</span>
            <h3>Construção</h3>
            <p>
              Eu não tenho formação de dev e nem quero fingir que tenho. O que eu tenho é curiosidade demais, IA na mão e pouca paciência pra processo ruim. Então eu testo, quebro, refaço e vou colocando as coisas pra funcionar.
            </p>
            <p className="front-note">Software é ferramenta. Resolver o problema é o ponto.</p>
          </Reveal>
        </article>

        <article className="front-row">
          <div className="front-media portrait-media">
            <motion.img
              src="/images/joao-gym.jpg"
              alt="João Victor em um registro de treino"
              loading="lazy"
              initial={reduceMotion ? false : { scale: 1.04 }}
              whileInView={reduceMotion ? undefined : { scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <Reveal className="front-copy">
            <span className="front-number">03 / CORPO</span>
            <h3>Treino</h3>
            <p>
              Calistenia sempre foi uma parte muito real da minha vida. Agora Educação Física entrou nisso também. Quero entender melhor o corpo, ficar muito bom no que eu treino e ver até onde consigo levar essa frente de forma profissional.
            </p>
            <p className="front-note">Aqui não tem botão de “gerar de novo”. Ou eu faço, ou não faço.</p>
          </Reveal>
        </article>
      </section>

      <section className="projects-section" id="projetos">
        <div className="section-shell projects-head">
          <Reveal>
            <p className="section-label">03 · O QUE EU TÔ CONSTRUINDO</p>
            <h2>Algumas dores viraram produto.</h2>
            <p>Não tá tudo pronto. Mas tudo aqui existe porque eu vi utilidade de verdade.</p>
          </Reveal>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.045, 0.18)}>
              <a className="project-row" href={project.href} target="_blank" rel="noreferrer">
                <span className="project-index">{project.id}</span>
                <div className="project-name">
                  <span>{project.status}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.copy}</p>
                <div className="project-action">
                  <span>{project.label}</span>
                  <ArrowUpRight size={20} aria-hidden="true" />
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
          <p>Produto, vendas, IA, treino ou projeto. Não precisa chegar com pitch bonito.</p>
          <div className="contact-links">
            <a href={`mailto:${EMAIL}`} className="gold-button">
              <Mail size={17} aria-hidden="true" /> {EMAIL}
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
