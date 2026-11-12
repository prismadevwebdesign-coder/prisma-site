# Site institucional — Prisma

## Stack

HTML, CSS e JavaScript puros, sem dependências.
Motivo: carregamento máximo de desempenho, manutenção simples pela equipe e publicação direta em qualquer hospedagem estática.

## Como rodar

```bash
npx serve .
```

Acesse http://localhost:3000

## Como publicar

Arraste a pasta para app.netlify.com/drop ou importe o repositório na Vercel (sem build).

## Pontos de troca

- **Imagem da abertura:** coloque `img/hero-desktop.webp` e `img/hero-mobile.webp`, descomente o `<picture>` no `index.html` e remova o bloco `PLACEHOLDER`.
- **Links das demos:** preencha `data-demo-url="..."` em cada botão. O JS transforma o botão em link.
- **Capas:** troque o bloco `card__media--pending` por um `<img>` e ajuste `--focus` (ex.: `50% 30%`).

## Decisões

- Numeração 01/02/03 automática via CSS counter.
- Notebook 3D que abre e fecha com a rolagem; no celular, vira um smartphone que gira.
- Efeitos de cursor e parallax só no desktop; tudo desligado com `prefers-reduced-motion`.

## Pendências

- Imagem final da abertura.
- Capas de Royal Barber, Iron Peak e Urban Vibe (arquivos das demos não encontrados).
- URLs das 4 demos.
- Seção "Próximo passo" (canal comercial não aprovado).
- Aprovação da fonte Fraunces (handoff previa Manrope).
- Textos institucionais finais.
