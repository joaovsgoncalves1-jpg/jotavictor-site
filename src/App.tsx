import { motion, useScroll, useTransform } from 'motion/react'
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

const fronts = [
  {
    eyebrow: 'Farmácias & representação',
    title: 'A operação real que me mantém perto do mercado.',
    body:
      'Rotina comercial, relacionamento com farmácias, rua, negociação e leitura prática de demanda. É daqui que nascem problemas reais para resolver.',
    image: '/images/joao-car.jpg',
    icon: Store,
  },
  {
    eyebrow: 'EncarteZap',
    title: 'Produto para vender melhor no varejo farmacêutico.',
    body:
      'Uma frente digital ligada ao que eu vivo no campo: comunicação simples, ofertas claras e ferramenta útil para farmácias chegarem melhor no cliente.',
    image: '/images/joao-work.jpg',
    icon: MessageCircle,
  },
  {
    eyebrow: 'Jotav.fit',
    title: 'Conteúdo, treino e empreendedorismo no fitness.',
    body:
      'Minha marca de construção física e mental: treino, rotina, disciplina e conteúdo para transformar execução em identidade.',
    image: '/images/joao-gym.jpg',
    icon: Dumbbell,
  },
]

const systems = [
  {
    icon: BrainCircuit,
    title: 'IA aplicada',
    body: 'Não como promessa distante. Como rotina: organizar, decidir, criar, vender e executar melhor.',
  },
  {
    icon: Flame,
    title: 'Forja',
    body: 'Meu sistema pessoal para transformar metas soltas em hábitos, tarefas, pontuação e direção diária.',
  },
  {
    icon: Route,
    title: 'Rotina em resultado',
    body: 'O fio que liga tudo: sair do excesso de ideia e construir processos que realmente movem o dia.',
  },
]

const principles = [
  'Negócio real antes de discurso bonito.',
  'IA precisa virar processo, não distração.',
  'Disciplina é mais útil quando vira sistema.',
  'Conteúdo bom nasce de vida vivida, não de personagem.',
]

function App() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -70])
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08])
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.5], ['0%', '100%'])

  return (
    <main className="site-shell">
      <nav className="nav" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="João Victor">
          JV
        </a>
        <div className="nav-links">
          <a href="#frentes">Frentes</a>
          <a href="#ia">IA real</a>
          <a href="#manifesto">Manifesto</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="kicker">jotavictor.com</p>
            <h1>
              João Victor constrói sistemas para transformar rotina em resultado.
            </h1>
            <p className="hero-sub">
              Representante comercial, criador digital e construtor de sistemas — unindo
              mercado farmacêutico, fitness e IA aplicada à vida real.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#frentes">
                Ver minhas frentes <ArrowUpRight size={18} />
              </a>
              <a className="button ghost" href="#manifesto">
                Ler manifesto
              </a>
            </div>
          </motion.div>

          <motion.div className="portrait-stage" style={{ y: heroY }}>
            <motion.div className="portrait-card" style={{ scale: heroScale }}>
              <img src="/images/joao-hero.jpg" alt="João Victor em retrato vertical" />
              <div className="portrait-glow" />
              <div className="portrait-caption">
                <span>Representação</span>
                <span>IA</span>
                <span>Fitness</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="scroll-line" aria-hidden="true">
          <motion.span style={{ width: lineProgress }} />
        </div>
      </section>

      <section className="intro-panel">
        <p>
          Uma marca pessoal não para parecer maior do que é. Para organizar, em um só
          lugar, as frentes que já existem: a rua, o produto, o treino, a IA e a
          construção diária.
        </p>
      </section>

      <section className="section" id="frentes">
        <div className="section-heading">
          <p className="kicker">O que eu construo</p>
          <h2>Três frentes, uma lógica.</h2>
          <p>
            Cada projeto nasce de uma parte da minha vida. O ponto em comum é transformar
            rotina em sistema — e sistema em resultado prático.
          </p>
        </div>

        <div className="fronts-grid">
          {fronts.map((front) => {
            const Icon = front.icon
            return (
              <article
                className="front-card"
                key={front.title}
              >
                <div className="front-image">
                  <img src={front.image} alt="" />
                </div>
                <div className="front-content">
                  <span className="icon-pill"><Icon size={18} /></span>
                  <p className="eyebrow">{front.eyebrow}</p>
                  <h3>{front.title}</h3>
                  <p>{front.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="split-section" id="ia">
        <div className="sticky-copy">
          <p className="kicker">IA aplicada à vida real</p>
          <h2>Menos hype. Mais execução.</h2>
          <p>
            O objetivo não é falar de IA como tendência. É mostrar como ela entra na rotina:
            no planejamento, na operação comercial, no conteúdo, nos estudos, nos produtos e
            na disciplina pessoal.
          </p>
        </div>
        <div className="system-stack">
          {systems.map((item) => {
            const Icon = item.icon
            return (
              <div
                className="system-card"
                key={item.title}
              >
                <Icon size={22} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-inner">
          <p className="kicker">Manifesto</p>
          <h2>Eu não quero parecer ocupado. Quero construir.</h2>
          <div className="manifesto-grid">
            {principles.map((principle) => (
              <div className="principle" key={principle}>
                <ShieldCheck size={18} />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" id="contato">
        <div>
          <Sparkles className="spark" size={28} />
          <h2>João Victor é a marca-mãe.</h2>
          <p>
            EncarteZap, Jotav.fit, Forja e representação comercial são frentes diferentes
            da mesma construção: usar rotina, IA e execução para criar negócios reais.
          </p>
        </div>
        <div className="cta-actions">
          <a className="button primary" href="mailto:contato@jotavictor.com">
            Entrar em contato <ArrowUpRight size={18} />
          </a>
          <a className="button ghost" href="#frentes">
            Revisitar frentes
          </a>
        </div>
      </section>

      <footer>
        <span>© João Victor — jotavictor.com</span>
        <span>Representação • IA • Fitness • Sistemas</span>
      </footer>
    </main>
  )
}

export default App
