# AGENTS.md — jotavictor.com

**Project**: Personal editorial landing page for João Victor (JotaV7 / @jv.fit).

**Live**: https://jotavictor.com  
**Repo**: https://github.com/joaovsgoncalves1-jpg/jotavictor-site  
**Deploy**: Vercel (auto on push to `master`)

## Core Identity (never dilute)

João Victor is:
- Representante comercial no varejo farmacêutico (RCA — Opella/Nazária e similares). Campo, balcão, giro, negociação real.
- Construtor de ferramentas reais a partir de dor de campo. Principal: **EncarteZap** (ofertas de farmácia direto no WhatsApp, sem campanha cara).
- Criador de conteúdo de treino sem personagem: @jotav.fit (calistenia/musculação, consistência, não estética vazia).
- Montando sistemas pessoais (Forja: hábitos, tarefas e metas com placar visível).

**Frase-mãe do site**: "Vendo na rua, construo no código e me forjo no treino. Campo, produto, automação e disciplina no mesmo lugar."

**Tom obrigatório**: direta, prática, concreta, neutra. Sem firula, sem "transforme sua vida", sem buzzwords de produtividade, sem IA-slop. Editorial e premium no visual; grounded e sem exagero no texto. Mostrar o trabalho acontecendo, não vender imagem.

O site é **hub**, não landing de produto. EncarteZap deve aparecer como prova real, não como pitch agressivo.

## Stack (atual — 2026-06)

- Vite + React 19 + TypeScript (strict)
- motion/react (Framer Motion)
- lucide-react (icons only)
- @fontsource/inter + @fontsource/space-grotesk
- 100% custom CSS (src/App.css) — sem Tailwind, sem UI libs pesadas. Grid + glass + editorial typography.
- Imagens estáticas em `/public/images/` (nunca CDN externo sem motivo forte)
- SPA com client-side sections + smooth scroll
- Vercel: framework=vite, output=dist, SPA rewrite + www → apex permanent redirect

**Comandos obrigatórios**:
```bash
npm run lint
npm run build
```

Qualquer mudança proposta deve passar nos dois antes de commit/push.

## Regras de trabalho para agentes (obrigatórias)

1. **Verificação primeiro**: rode lint + build com sucesso. Relate os outputs no final.
2. **Mudanças mínimas e focadas**: uma mudança de verdade por iteração. Evite refactors grandes sem pedido explícito.
3. **Cópia**: toda frase deve ser defensável com a vida real do João. Prefira o estilo atual (curto, específico, sem adjetivos vazios).
4. **Mobile**: breakpoints críticos 560px e 960px. Nav, cards, hero, footer devem ficar bons. Teste visualmente (use ferramentas de browser se disponíveis).
5. **SEO / metadados**: mantenha o JSON-LD de Person atualizado e correto. Canonical, og:image, twitter cards. Não quebre o que já está funcionando.
6. **Links e constantes**: estão centralizados no topo de `src/App.tsx`:
   - ENCARTEZAP_URL
   - JOTAVFIT_URL
   - EMAIL
   Só altere com confirmação explícita.
7. **Imagens**: não troque fotos principais (joao-hero.jpg, joao-work.jpg, joao-gym.jpg, joao-car.jpg) sem novos assets e aprovação. Elas têm crop e tratamento intencionais.
8. **Sem novos deps** a não ser que o motivo seja muito forte e aprovado. Stack deve continuar leve.
9. **Sem custos recorrentes** novos sem ordem clara.
10. **Commit message**: claro e no padrão do histórico (ex: "feat: add AGENTS.md for agent collaboration", "fix: restore mobile nav visibility").

## Estrutura de arquivos (não mude sem pedido)

- `index.html` — título, meta, JSON-LD Person, root + entry script.
- `src/App.tsx` — toda a lógica e conteúdo (fronts, systems/processos, principles, proofPoints, CTA, footer). Componentes inline.
- `src/App.css` — design system completo + responsivo (duas media queries principais).
- `vercel.json` — config de deploy + redirects + rewrites SPA.
- `public/images/` — assets visuais.
- `public/favicon.svg`, `site.webmanifest` etc.

## Fluxo recomendado para tarefas

1. Entender o pedido + contexto (RCA/EncarteZap têm prioridade sobre polimento do site).
2. Ler os arquivos relevantes + AGENTS.md + README.
3. Fazer a mudança mínima.
4. `npm run lint && npm run build`
5. Se visual: descrever ou usar screenshot/vision.
6. Commit + push (ou PR se a mudança for maior).
7. Verificar deploy no Vercel.

## O que NÃO fazer sem pedido explícito

- Adicionar backend, forms que precisem de server, auth, banco.
- Transformar em app completo (é landing).
- Mudar paleta, tipografia ou direção visual sem kit de marca.
- Adicionar animações pesadas ou scroll-scrub cinematográfico sem referência clara.
- Criar novas páginas/seções sem definir copy + estrutura primeiro.
- Usar frameworks pesados ou adicionar complexidade.

## Contexto externo útil (não hardcode)

- EncarteZap é o ativo principal de renda extra / produto no momento.
- Trabalho RCA (08h-18h) é prioridade operacional.
- Jota Fit é conteúdo + rede social.
- Forja é sistema pessoal em construção.
- Evitar cobranças recorrentes. Stack enxuta.

Quando houver dúvida entre "ficar mais bonito" e "ficar mais útil/claro", priorize útil e concreto.

Este arquivo é a fonte de verdade para qualquer agente de IA trabalhando neste repositório.

## Links úteis

- Site: https://jotavictor.com
- EncarteZap: https://www.encartezap.com.br
- Instagram: https://www.instagram.com/jotav.fit/
- GitHub deste repo: https://github.com/joaovsgoncalves1-jpg/jotavictor-site
