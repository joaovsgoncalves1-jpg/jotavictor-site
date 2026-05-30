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

// Image filenames are legacy; map by the visible photo theme, not by filename.
const fronts = [
  {
    eyebrow: 'Rua / farma',
    title: 'Rotina comercial no varejo farmacêutico.',
    body:
      'Relacionamento com farmácias, negociação, leitura de demanda e execução no campo. É daqui que saem problemas reais para resolver com produto e processo.',
    facts: ['vendas', 'farmácias', 'operação real'],
    image: '/images/joao-work.jpg',
    icon: Store,
  },
  {
    eyebrow: 'EncarteZap',
    title: 'Ferramenta para comunicar oferta com menos atrito.',
    body:
      'Uma frente digital ligada ao que vejo no campo: encartes simples, campanhas claras e caminho mais curto entre farmácia, oferta e cliente.',
    facts: ['produto', 'WhatsApp', 'campanhas'],
    image: '/images/joao-gym.jpg',
    icon: MessageCircle,
  },
  {
    eyebrow: 'Jotav.fit',
    title: 'Treino como laboratório de disciplina.',
    body:
      'Conteúdo e rotina física sem personagem pronto: treino, consistência e construção pública de uma base mais forte para executar melhor.',
    facts: ['treino', 'conteúdo', 'consistência'],
    image: '/images/joao-car.jpg',
    icon: Dumbbell,
  },
]

const systems = [
  {
    icon: BrainCircuit,
    title: 'IA para tirar peso operacional',
    body: 'Organizar informação, transformar áudio em tarefa, resumir conversas, apoiar decisão e reduzir trabalho repetido.',
  },
  {
    icon: Flame,
    title: 'Forja',
    body: 'Um cockpit pessoal para hábitos, tarefas, pontuação e direção diária — menos promessa, mais placar visível.',
  },
  {
    icon: Route,
    title: 'Processo antes de inspiração',
    body: 'A lógica por trás das frentes: capturar, priorizar, executar, medir e melhorar sem depender de motivação perfeita.',
  },
]

const principles = [
  'Negócio real antes de discurso bonito.',
  'IA precisa virar processo, não distração.',
  'Disciplina é mais útil quando vira sistema.',
  'Conteúdo bom nasce de vida vivida, não de personagem.',
]

const proofPoints = [
  {
    label: 'Rua',
    text: 'operação comercial e leitura prática do varejo farmacêutico.',
  },
  {
    label: 'Código',
    text: 'IA, automações e produtos simples para reduzir trabalho repetido.',
  },
  {
    label: 'Treino',
    text: 'disciplina física como base para consistência e clareza diária.',
  },
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
          <a href="#ia">Processos</a>
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
              Operação comercial, código e disciplina na prática.
            </h1>
            <p className="hero-sub">
              Atuo no varejo farmacêutico, crio sistemas com IA e documento a rotina que
              sustenta tudo — vendas, produto, treino e execução diária.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="mailto:contato@jotavictor.com">
                Falar comigo <ArrowUpRight size={18} />
              </a>
              <a className="button ghost" href="#frentes">
                Ver projetos
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
        <p>Um hub simples para mostrar o que já está em movimento.</p>
        <div className="proof-grid" aria-label="Como as frentes se conectam">
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
          <p className="kicker">O que eu construo</p>
          <h2>O que está em campo agora.</h2>
          <p>
            Não é uma lista de cargos. São frentes que se alimentam: a rua mostra o
            problema, o código organiza a solução e o treino mantém a consistência.
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
                  <img src={front.image} alt="" width="720" height="1280" />
                </div>
                <div className="front-content">
                  <span className="icon-pill"><Icon size={18} /></span>
                  <p className="eyebrow">{front.eyebrow}</p>
                  <h3>{front.title}</h3>
                  <p>{front.body}</p>
                  <div className="front-facts" aria-label={`Pontos-chave de ${front.eyebrow}`}>
                    {front.facts.map((fact) => (
                      <span key={fact}>{fact}</span>
                    ))}
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
          <h2>Menos ferramenta nova. Mais rotina funcionando.</h2>
          <p>
            A IA entra onde existe repetição, ruído ou decisão acumulada: organizar o dia,
            transformar informação solta em próxima ação e deixar a operação mais leve.
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
          <h2>Rua, código e treino no mesmo lugar.</h2>
          <p>
            EncarteZap, Jotav.fit, Forja e representação comercial são frentes diferentes
            da mesma construção: resolver problemas reais com processo, tecnologia e rotina.
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
