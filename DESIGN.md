# DESIGN.md — jotavictor.com

## Visual thesis

Editorial escuro, humano e premium. O site deve parecer um recorte de vida real em execução: rua, farmácia, código, WhatsApp e treino. Nada de SaaS genérico, dashboard falso, bento gratuito ou neon de IA.

## Palette tokens

- Ink/base: `#0b0b0a` — fundo principal escuro, quase preto, mas não puro.
- Ink soft: `#151310` — superfícies internas e cards.
- Paper: `#efe7d6` — texto principal quente, evitando branco puro.
- Paper muted: `#b9ad9a` — corpo e texto secundário.
- Muted: `#8d8171` — notas menos importantes.
- Wine: `#5d1f27` / `#8c3340` — profundidade, manifesto, calor.
- Olive: `#5d6542` — contraponto de campo/rotina.
- Gold: `#c99f5c` — destaque, indicadores, foco e microdetalhes.

Uso: 70% fundos escuros/tintos, 20% papel/muted em texto, 10% gold/wine/olive como acento.

## Typography

- Display: Space Grotesk, peso 700/500, tracking negativo. Usar para impacto editorial.
- Body/UI: Inter, pesos 400/500/600. Usar para leitura e botões.
- Headings grandes podem ser densos; corpo precisa manter `line-height` generoso.

## Layout language

- Hero assimétrico com copy forte + retrato real.
- Cards com fotografia real e sobreposição controlada no desktop.
- No mobile, priorizar foto legível acima do texto quando overlay deixa a imagem escura ou confusa.
- Seções largas, poucas, com respiro. O site é hub editorial de uma página.

## Components

- Nav fixa em cápsula, sempre com 4 links visíveis a partir de mobile compacto.
- Buttons pill, alto contraste, foco visível.
- Proof chips/tiles concretos para Campo / Código / Treino.
- Front cards com status operacional e link apenas quando existe destino real.
- Manifesto em wine, com itens curtos e escaneáveis.

## Motion

- Motion leve: entrada de hero e parallax sutil no retrato.
- Respeitar `prefers-reduced-motion`.
- Não usar scroll-scrub pesado, glow excessivo ou animação decorativa sem função.

## Accessibility / QA

- Foco visível em botões e cards clicáveis.
- Sem horizontal overflow em 375px, 560px, 960px e desktop.
- Contraste suficiente em paper/paper-muted contra fundo escuro.
- Imagens reais com `alt` humano e sem trocar assets sem aprovação.

## Anti-slop bans

Nunca:
- trocar por layout SaaS/bento genérico;
- usar gradiente roxo/ciano de IA;
- inventar claims grandiosos;
- trocar fotos reais por ilustração stock;
- adicionar dependência visual pesada sem aprovação.

Evitar:
- textos centralizados demais;
- cards dentro de cards sem motivo;
- ícones decorativos repetidos sem hierarquia;
- corpo pequeno em mobile;
- esconder navegação por regra CSS legada.
