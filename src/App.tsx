import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  Code,
  Dumbbell,
  Flame,
  Hammer,
  LayoutGrid,
  MessageCircle,
  Pill,
  Route,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import './App.css'

const fadeRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const heroParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const VIEWPORT = { once: true, amount: 0.2 } as const

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
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}) {
  const reduceMotion = useReducedMotion()
  if (as === 'article') {
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

// These symbols are used by later tasks; referenced here to satisfy noUnusedLocals.
void [Reveal, Stagger, StaggerItem]

const CATALOGO_URL = 'https://catalogo-digital-opella.vercel.app/'
const ENCARTEZAP_URL = 'https://www.encartezap.com.br'
const JOTAVFIT_URL = 'https://www.instagram.com/jotav.fit/'
const EMAIL = 'contato@jotavictor.com'

// Image filenames are legacy; mapped by the visible photo, not by filename.
const fronts = [
  {
    eyebrow: 'Farmácia e campo',
    title: 'Perto da operação real.',
    body:
      'Trabalho perto da operação real: farmácia, balcão, comprador, campanha, giro, estoque, preço e relacionamento. É no campo que eu entendo o que realmente trava uma venda, o que facilita uma decisão e o que precisa virar processo.',
    image: '/images/joao-work.jpg',
    alt: 'João Victor de uniforme de trabalho, atuando no varejo farmacêutico',
    icon: Pill,
  },
  {
    eyebrow: 'Projetos digitais',
    title: 'Problema simples vira ferramenta.',
    body:
      'Gosto de pegar problemas simples da rotina e transformar em ferramenta. Às vezes é um catálogo. Às vezes é uma automação. Às vezes é um sistema interno. O objetivo não é parecer tecnológico. É fazer funcionar melhor.',
    image: '/images/joao-car.jpg',
    alt: 'João Victor a caminho de uma visita comercial',
    icon: Code,
  },
  {
    eyebrow: 'Treino e conteúdo',
    title: 'Calistenia como base.',
    body:
      'A calistenia é uma das bases da minha rotina. No Jotav.fit eu compartilho minha evolução, meus treinos e a construção física sem tentar parecer um personagem pronto. É treino real, tentativa real, erro real e progresso real.',
    image: '/images/joao-gym.jpg',
    alt: 'João Victor treinando',
    icon: Dumbbell,
  },
  {
    eyebrow: 'Rotina e disciplina',
    title: 'A vida como sistema.',
    body:
      'Tenho interesse em sistemas pessoais de execução: hábito, tarefa, meta, revisão e direção. A Praxis nasce dessa vontade de transformar disciplina em algo mais visível, menos dependente de motivação e mais conectado com a vida real.',
    image: null,
    alt: null,
    icon: Flame,
  },
]

const projects = [
  {
    icon: LayoutGrid,
    eyebrow: 'Catálogo Digital',
    title: 'Catálogo Digital',
    status: 'No ar',
    body:
      'Uma ferramenta criada para facilitar a vida dos meus clientes no varejo farmacêutico. A ideia é simples: organizar produtos, campanhas e oportunidades em um link fácil de acessar, para o cliente consultar e fazer pedido com menos atrito. Uma solução prática, nascida da rotina de campo.',
    link: CATALOGO_URL,
    linkLabel: 'Abrir catálogo',
    linkAria: 'Abrir o Catálogo Digital em nova aba',
  },
  {
    icon: MessageCircle,
    eyebrow: 'EncarteZap',
    title: 'EncarteZap',
    status: 'No ar',
    body:
      'Pensado para ajudar farmácias a divulgarem ofertas de forma mais simples, bonita e direta. Enquanto o Catálogo ajuda na relação com meus clientes, o EncarteZap olha para a ponta da farmácia: como ela mostra a oferta, facilita o compartilhamento no WhatsApp e transforma promoção em algo mais organizado.',
    link: ENCARTEZAP_URL,
    linkLabel: 'encartezap.com.br',
    linkAria: 'Abrir o EncarteZap em nova aba',
  },
  {
    icon: Dumbbell,
    eyebrow: 'Jotav.fit',
    title: 'Jotav.fit',
    status: 'Publicando',
    body:
      'Meu projeto de conteúdo sobre treino, calistenia e construção física. Não é sobre mostrar uma vida perfeita. É sobre registrar a construção: treino pesado, constância, evolução técnica e disciplina no dia a dia.',
    link: JOTAVFIT_URL,
    linkLabel: '@jotav.fit',
    linkAria: 'Abrir o Instagram @jotav.fit em nova aba',
  },
  {
    icon: Hammer,
    eyebrow: 'Praxis',
    title: 'Praxis',
    status: 'Em construção',
    body:
      'Um sistema pessoal de rotina, hábitos e execução. Ainda está tomando forma, mas representa uma ideia importante para mim: parar de depender só de vontade e começar a enxergar a própria vida como um sistema. O que eu faço, o que eu evito, o que eu repito e o que eu construo.',
    link: null,
    linkLabel: null,
    linkAria: null,
  },
]

const systems = [
  {
    icon: Route,
    title: 'Do campo pro produto',
    body: 'O problema aparece na farmácia. Eu anoto, testo, organizo e transformo em ferramenta. Foi assim que o Catálogo Digital e o EncarteZap nasceram.',
  },
  {
    icon: BrainCircuit,
    title: 'IA pra tirar peso da rotina',
    body: 'Uso IA para organizar trabalho, estudar, criar processos e automatizar tarefas repetitivas. Quando ela reduz repetição, sobra tempo pra vender, decidir e executar.',
  },
  {
    icon: Wrench,
    title: 'Da ideia à ferramenta',
    body: 'Não me interessa IA como moda. Me interessa quando ela tira peso da rotina e ajuda a executar melhor. Ideia que não vira coisa funcionando fica só na cabeça.',
  },
]

const principles = [
  'Problema real antes de ferramenta bonita.',
  'Menos discurso, mais coisa funcionando.',
  'Treino como base de disciplina.',
  'IA como ferramenta, não como distração.',
  'Conteúdo vindo da vida real, não de personagem.',
  'Processo melhor que empolgação.',
  'Construção pequena, constante e visível.',
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
          <a href="#sobre">Sobre</a>
          <a href="#frentes">Frentes</a>
          <a href="#projetos">Projetos</a>
          <a href="#principios">Princípios</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            variants={reduceMotion ? undefined : heroParent}
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? undefined : 'show'}
          >
            <motion.p className="kicker" variants={reduceMotion ? undefined : fadeRise}>
              jotavictor.com
            </motion.p>
            <motion.h1 variants={reduceMotion ? undefined : wordParent}>
              <motion.span variants={reduceMotion ? undefined : fadeRise}>Vida real,</motion.span>
              <motion.span variants={reduceMotion ? undefined : fadeRise}>trabalho real,</motion.span>
              <motion.span variants={reduceMotion ? undefined : fadeRise}>projetos reais.</motion.span>
            </motion.h1>
            <motion.p className="hero-sub" variants={reduceMotion ? undefined : fadeRise}>
              Trabalho no varejo farmacêutico, treino calistenia e construo ferramentas
              digitais a partir dos problemas que encontro na prática.
            </motion.p>
            <motion.p className="hero-note" variants={reduceMotion ? undefined : fadeRise}>
              Este site é meu ponto público na internet. Aqui eu organizo o que estou
              vivendo e construindo: trabalho, projetos, treino, conteúdo e algumas ideias
              que ainda estão tomando forma.
            </motion.p>
            <motion.div className="hero-actions" variants={reduceMotion ? undefined : fadeRise}>
              <a className="button primary" href="#projetos">
                Ver projetos <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button ghost" href={`mailto:${EMAIL}`}>
                Falar comigo
              </a>
              <a
                className="button ghost"
                href={JOTAVFIT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Jotav.fit
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
              <div className="portrait-caption">
                <span>Campo</span>
                <span>Projetos</span>
                <span>Treino</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="scroll-line" aria-hidden="true">
          <motion.span style={{ width: lineProgress }} />
        </div>
      </section>

      <section className="intro-panel" id="sobre">
        <div className="intro-copy">
          <p className="kicker">Sobre mim</p>
          <p className="intro-lead">
            Sou João Victor, mas muita gente me conhece como Jota.
          </p>
          <p className="intro-body">
            Hoje moro em Natal-RN e vivo uma fase de construção em várias áreas ao mesmo
            tempo. Trabalho no setor farmacêutico, estou ajustando meus caminhos de estudo e
            carreira, treino com foco em calistenia e venho criando projetos digitais que
            nascem dos problemas que vejo no dia a dia.
          </p>
          <p className="intro-body">
            Não me vejo só como “o cara do treino”, “o cara da farmácia” ou “o cara da IA”.
            Na prática, tudo isso se mistura. O trabalho de campo me mostra problemas reais.
            A tecnologia me ajuda a transformar esses problemas em processo. O treino me dá
            disciplina para continuar quando a empolgação passa.
          </p>
          <p className="intro-body">Este site existe para organizar isso de um jeito simples.</p>
        </div>
      </section>

      <section className="section" id="frentes">
        <div className="section-heading">
          <p className="kicker">Frentes</p>
          <h2>Onde minha vida acontece hoje.</h2>
          <p>
            São as frentes que estou construindo ao mesmo tempo. Cada uma alimenta a outra:
            o campo mostra o problema, a tecnologia vira processo e o treino sustenta a
            disciplina.
          </p>
        </div>

        <div className="fronts-grid">
          {fronts.map((front) => {
            const Icon = front.icon
            return (
              <article
                className={`front-card${front.image ? '' : ' is-featured'}`}
                key={front.eyebrow}
              >
                {front.image && (
                  <div className="front-image">
                    <img
                      src={front.image}
                      alt={front.alt ?? ''}
                      width="720"
                      height="1280"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="front-content">
                  <span className="icon-pill"><Icon size={18} aria-hidden="true" /></span>
                  <p className="eyebrow">{front.eyebrow}</p>
                  <h3>{front.title}</h3>
                  <p>{front.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section" id="projetos">
        <div className="section-heading">
          <p className="kicker">Projetos</p>
          <h2>O que eu já coloquei de pé.</h2>
          <p>
            Algumas coisas já estão rodando, outras ainda estão tomando forma. Todas seguem
            a mesma lógica: pegar um problema real e transformar em algo útil.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <article
                className={`project-card${project.link ? ' is-linked' : ''}`}
                key={project.eyebrow}
              >
                <span className="icon-pill"><Icon size={18} aria-hidden="true" /></span>
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
                <div className="front-meta">
                  <span className="front-status">{project.status}</span>
                  {project.link && (
                    <a
                      className="front-link"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.linkAria ?? undefined}
                    >
                      {project.linkLabel}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="split-section" id="ia">
        <div className="sticky-copy">
          <p className="kicker">IA aplicada à rotina</p>
          <h2>Menos ferramenta nova. Mais processo que funciona.</h2>
          <p>
            Uso IA para organizar trabalho, estudar, criar processos e automatizar tarefas
            repetitivas. Não me interessa IA como moda. Me interessa quando ela tira peso da
            rotina, reduz repetição e ajuda a executar melhor.
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
          <h2>Um resumo público do que estou construindo.</h2>
          <p>
            Algumas coisas já estão rodando. Outras ainda estão tomando forma. Mas tudo
            segue a mesma lógica: viver na prática, observar problemas reais, criar processo
            e colocar algo útil no mundo. Se quiser trocar ideia, conhecer algum projeto ou
            falar comigo, me chama no Instagram ou pelo e-mail.
          </p>
        </div>
        <div className="cta-actions">
          <a className="button primary" href={`mailto:${EMAIL}`}>
            Falar comigo <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">
            Ver o Jotav.fit <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a className="button ghost" href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">
            Conhecer o EncarteZap <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer>
        <span>© {currentYear} João Victor · jotavictor.com</span>
        <nav className="footer-links" aria-label="Links de João Victor">
          <a href={CATALOGO_URL} target="_blank" rel="noopener noreferrer">Catálogo Digital</a>
          <a href={ENCARTEZAP_URL} target="_blank" rel="noopener noreferrer">EncarteZap</a>
          <a href={JOTAVFIT_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${EMAIL}`}>E-mail</a>
        </nav>
      </footer>
    </main>
  )
}

export default App
