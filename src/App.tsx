import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowUpRight,
  BrainCircuit,
  Dumbbell,
  Flame,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react'
import './App.css'

const ENCARTEZAP_URL = 'https://www.encartezap.com.br'
const JOTAVFIT_URL = 'https://www.instagram.com/jotav.fit/'
const EMAIL = 'contato@jotavictor.com'

// Image filenames are legacy; mapped by the visible photo, not by filename.
const fronts = [
  {
    eyebrow: 'Operação comercial',
    status: 'Todo dia, no campo',
    title: 'Varejo farmacêutico, no balcão e na rua.',
    body:
      'Levo produto pra dentro da farmácia: negociação, ponto de venda e leitura de giro. É o campo que me dá problema de verdade pra resolver — não case de slide.',
    image: '/images/joao-work.jpg',
    alt: 'João Victor de uniforme de trabalho, atuando no varejo farmacêutico',
    icon: Store,
    link: null,
    linkLabel: null,
    linkAria: null,
  },
  {
    eyebrow: 'EncarteZap',
    status: 'No ar',
    title: 'Oferta de farmácia no WhatsApp, sem fricção.',
    body:
      'Encarte digital pra farmácia mandar oferta direto no WhatsApp. Saiu do que eu via no balcão: campanha lenta, encarte caro e mensagem que não chega no cliente.',
    image: '/images/joao-gym.jpg',
    alt: 'João Victor a caminho de uma visita comercial',
    icon: MessageCircle,
    link: ENCARTEZAP_URL,
    linkLabel: 'encartezap.com.br',
    linkAria: 'Abrir o EncarteZap em nova aba',
  },
  {
    eyebrow: 'Jotav.fit',
    status: 'Publicando',
    title: 'Treino puxado, documentado sem personagem.',
    body:
      'Construção física registrada de verdade: treino pesado, consistência e o processo sem filtro de coach. É a base que segura todas as outras frentes.',
    image: '/images/joao-car.jpg',
    alt: 'João Victor treinando na academia',
    icon: Dumbbell,
    link: JOTAVFIT_URL,
    linkLabel: '@jotav.fit',
    linkAria: 'Abrir o Instagram @jotav.fit em nova aba',
  },
]

const systems = [
  {
    icon: Route,
    title: 'Do campo pro produto',
    body: 'Problema que aparece na farmácia vira anotação, anotação vira teste, teste vira ferramenta. O EncarteZap saiu exatamente desse caminho.',
  },
  {
    icon: BrainCircuit,
    title: 'IA pra tirar peso operacional',
    body: 'Áudio do dia que vira tarefa, conversa que vira resumo, papelada que vira decisão. Menos tempo no operacional, mais tempo no que move o ponteiro.',
  },
  {
    icon: Flame,
    title: 'Forja',
    body: 'Sistema pessoal que estou montando: hábito, tarefa e meta viram placar. É difícil enganar um número que te encara na tela todo dia.',
  },
]

const principles = [
  'Negócio real antes de discurso bonito.',
  'IA só vale quando vira processo, não distração.',
  'Disciplina rende mais como sistema do que como força de vontade.',
  'Conteúdo bom vem de vida vivida, não de personagem.',
]

const proofPoints = [
  {
    label: 'Comercial',
    text: 'Varejo farmacêutico de perto: balcão, negociação e leitura do que o mercado realmente compra.',
  },
  {
    label: 'Código',
    text: 'IA e ferramentas pra cortar trabalho repetido. O EncarteZap nasceu daí.',
  },
  {
    label: 'Treino',
    text: 'Treino pesado como base. Sem o corpo em ordem, o resto não para de pé.',
  },
]

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : -70])
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, reduceMotion ? 1 : 1.08])
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.5], ['0%', '100%'])

  const currentYear = new Date().getFullYear()

  return (
    <main className="site-shell">
      <nav className="nav" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="João Victor — início">
          JV
        </a>
        <div className="nav-links">
          <a href="#frentes">Frentes</a>
          <a href="#ia">Processos</a>
          <a href="#principios">Princípios</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="kicker">jotavictor.com</p>
            <h1>Vendo no varejo farmacêutico e construo o que falta.</h1>
            <p className="hero-sub">
              Atuo no balcão e na rua das farmácias. O que aparece no campo vira produto,
              automação e código — e o treino segura o ritmo do resto.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${EMAIL}`}>
                Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button ghost" href="#frentes">
                Ver as frentes
              </a>
            </div>
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
              <div className="portrait-caption">
                <span>Comercial</span>
                <span>IA</span>
                <span>Treino</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="scroll-line" aria-hidden="true">
          <motion.span style={{ width: lineProgress }} />
        </div>
      </section>

      <section className="intro-panel">
        <p>Não é portfólio. É o que eu faço todo dia — e o que construo a partir disso.</p>
        <div className="proof-grid" aria-label="As três frentes de trabalho">
          {proofPoints.map((point) => (
            <div className="proof-item" key={point.label}>
              <span>{point.label}</span>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="frentes">
        <div className="section-heading">
          <p className="kicker">O que está em campo</p>
          <h2>O que está rodando agora.</h2>
          <p>
            Não é uma lista de cargos. Três frentes que se alimentam: o comercial mostra o
            problema, o código resolve e o treino mantém o ritmo.
          </p>
        </div>

        <div className="fronts-grid">
          {fronts.map((front) => {
            const Icon = front.icon
            return (
              <article
                className={`front-card${front.link ? ' is-linked' : ''}`}
                key={front.title}
              >
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
                  <span className="icon-pill"><Icon size={18} aria-hidden="true" /></span>
                  <p className="eyebrow">{front.eyebrow}</p>
                  <h3>{front.title}</h3>
                  <p>{front.body}</p>
                  <div className="front-meta">
                    <span className="front-status">{front.status}</span>
                    {front.link && (
                      <a
                        className="front-link"
                        href={front.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={front.linkAria ?? undefined}
                      >
                        {front.linkLabel}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="split-section" id="ia">
        <div className="sticky-copy">
          <p className="kicker">Processos e IA</p>
          <h2>Menos ferramenta nova. Mais rotina que funciona.</h2>
          <p>
            A IA entra onde tem repetição, ruído ou decisão empilhada: organizar o dia,
            transformar informação solta na próxima ação e deixar a operação mais leve.
          </p>
        </div>
        <div className="system-stack">
          {systems.map((item) => {
            const Icon = item.icon
            return (
              <div className="system-card" key={item.title}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="manifesto" id="principios">
        <div className="manifesto-inner">
          <p className="kicker">Princípios</p>
          <h2>Não quero parecer ocupado. Quero construir.</h2>
          <div className="manifesto-grid">
            {principles.map((principle) => (
              <div className="principle" key={principle}>
                <ShieldCheck size={18} aria-hidden="true" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" id="contato">
        <div>
          <Sparkles className="spark" size={28} aria-hidden="true" />
          <h2>Comercial, código e treino. Mesma construção.</h2>
          <p>
            EncarteZap, Jotav.fit, Forja e a operação comercial são frentes da mesma coisa:
            resolver problema real com processo, tecnologia e rotina — e mostrar o trabalho
            enquanto ele acontece.
          </p>
        </div>
        <div className="cta-actions">
          <a className="button primary" href={`mailto:${EMAIL}`}>
            Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">
            EncarteZap <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a className="button ghost" href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">
            Jotav.fit <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer>
        <span>© {currentYear} João Victor — jotavictor.com</span>
        <nav className="footer-links" aria-label="Links de João Victor">
          <a href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">EncarteZap</a>
          <a href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${EMAIL}`}>E-mail</a>
        </nav>
      </footer>
    </main>
  )
}

export default App
