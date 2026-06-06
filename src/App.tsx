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

const heroSignals = [
  'RCA no varejo farmacêutico',
  'EncarteZap no ar',
  '@jotav.fit em construção',
]

// Image filenames are legacy; mapped by the visible photo, not by filename.
const fronts = [
  {
    eyebrow: 'Operação comercial',
    status: 'Todo dia, no campo',
    title: 'Varejo farmacêutico, no balcão e na rua.',
    body:
      'Levo produto para dentro da farmácia, negocio, acompanho giro e entendo o que o mercado compra de verdade. O campo me dá problema real para resolver. Não teoria bonita.',
    image: '/images/joao-work.jpg',
    imagePosition: 'center 42%',
    alt: 'João Victor de uniforme de trabalho, atuando no varejo farmacêutico',
    icon: Store,
    link: null,
    linkLabel: null,
    linkAria: null,
  },
  {
    eyebrow: 'EncarteZap',
    status: 'No ar',
    title: 'Oferta de farmácia direto no WhatsApp.',
    body:
      'O EncarteZap nasceu de uma dor simples: campanha cara, mensagem perdida e cliente que não vê a oferta. Transformei isso em uma vitrine digital prática para farmácias venderem melhor no WhatsApp. Está no ar e funcionando.',
    image: '/images/joao-gym.jpg',
    imagePosition: 'center 38%',
    alt: 'João Victor a caminho de uma visita comercial',
    icon: MessageCircle,
    link: ENCARTEZAP_URL,
    linkLabel: 'encartezap.com.br',
    linkAria: 'Abrir o EncarteZap em nova aba',
  },
  {
    eyebrow: 'Jotav.fit',
    status: 'Publicando',
    title: 'Treino puxado, sem personagem.',
    body:
      'Mostro a construção física como ela é: treino pesado, tentativa, repetição, evolução e constância. Não é sobre parecer atleta de Instagram. É sobre virar o cara que cumpre o que promete.',
    image: '/images/joao-car.jpg',
    imagePosition: 'center 42%',
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
    body: 'O problema aparece na farmácia. Eu anoto, testo, organizo e transformo em ferramenta. Foi assim que o EncarteZap nasceu.',
  },
  {
    icon: BrainCircuit,
    title: 'IA pra tirar peso operacional',
    body: 'Uso IA para reduzir repetição, organizar informação solta e sobrar tempo pra vender, decidir e executar.',
  },
  {
    icon: Flame,
    title: 'Forja',
    body: 'Sistema pessoal que estou montando: hábito, tarefa e meta viram placar. É difícil enganar um número que te encara na tela todo dia.',
  },
]

const principles = [
  'Negócio real antes de discurso bonito.',
  'IA só vale quando vira processo.',
  'Disciplina funciona melhor como sistema do que como força de vontade.',
  'Conteúdo bom vem de vida vivida, não de personagem.',
  'Não quero vender uma imagem de produtividade.',
  'Quero mostrar o trabalho acontecendo.',
]

const proofPoints = [
  {
    label: 'Comercial',
    text: 'Varejo farmacêutico no campo: balcão, rua, negociação, ponto de venda e leitura do que realmente gira.',
  },
  {
    label: 'Código',
    text: 'Uso IA e automação para cortar trabalho repetido, organizar operação e transformar problema real em ferramenta.',
  },
  {
    label: 'Treino',
    text: 'Treino pesado como base. Quando o corpo desanda, a rotina cobra.',
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
        <a className="brand" href="#top" aria-label="João Victor, início">
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
            <h1>
              <span>Vendo na rua.</span>
              <span>Construo no código.</span>
              <span>Me forjo no treino.</span>
            </h1>
            <p className="hero-sub">
              Atuo no varejo farmacêutico de perto: balcão, negociação, giro e campo. O
              problema que aparece na operação vira processo, produto ou automação. O treino
              mantém tudo de pé.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${EMAIL}`}>
                Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button ghost" href="#frentes">
                Ver o que estou construindo
              </a>
            </div>
            <ul className="hero-signals" aria-label="Sinais concretos de contexto">
              {heroSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
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
                <span>Campo</span>
                <span>Código</span>
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
        <div className="intro-copy">
          <p className="intro-lead">
            Não é portfólio.
            <br />É construção em andamento.
          </p>
          <p className="intro-body">
            Aqui entra o que eu vivo todo dia: venda, produto, código e treino. Não como
            personagem. Como rotina real.
          </p>
        </div>
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
          <h2>O que estou construindo agora.</h2>
          <p>
            O campo mostra o problema. O código organiza a solução. O treino sustenta a
            disciplina. Sem cargo bonito. Sem personagem. Só construção real.
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
                    style={{ objectPosition: front.imagePosition }}
                    width="720"
                    height="1280"
                    loading="eager"
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
          <h2>Menos ferramenta nova. Mais processo que funciona.</h2>
          <p>
            IA só importa quando tira peso da rotina. Áudio que vira tarefa. Conversa que vira
            resumo. Papelada que vira decisão. Problema do campo que vira produto. Ferramenta
            por ferramenta é distração. Processo bem montado muda o resultado.
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
          <h2>Comercial, código e treino. A mesma construção em formas diferentes.</h2>
          <p>
            No varejo, eu entendo o problema. No código, transformo em sistema. No treino,
            construo a disciplina para sustentar tudo isso. EncarteZap, Jotav.fit, a Forja que
            estou montando e o trabalho no campo fazem parte da mesma ideia: resolver problema
            real com processo, tecnologia e rotina.
          </p>
        </div>
        <div className="cta-actions">
          <a className="button primary" href={`mailto:${EMAIL}`}>
            Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">
            Conhecer o EncarteZap <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a className="button ghost" href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">
            Ver o Jotav.fit <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer>
        <span>© {currentYear} João Victor · jotavictor.com</span>
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
