# Personal OS

MVP mobile-first para hábitos, carreira, inglês, saúde, boxe e musculação.

## Rodar localmente

```bash
npm install
cp .env.example .env.local
# Cole a DATABASE_URL do Neon em .env.local
npm run db:generate
npm run db:migrate
npm run dev
```

## Deploy

1. Crie um projeto Neon e copie a connection string.
2. Suba este repositório no GitHub e importe-o na Vercel.
3. Em **Settings > Environment Variables**, cadastre `DATABASE_URL` em Production, Preview e Development.
4. Execute `npm run db:migrate` localmente com a mesma URL antes do primeiro deploy.

## Próximas evoluções

- Auth.js ou Clerk antes de compartilhar/publicar.
- Upload privado de fotos de evolução em Vercel Blob ou S3.
- Gráficos de 28 dias e metas trimestrais editáveis.
- MCP privado depois de estabilizar o modelo de dados por 30 dias.

## Qualidade de código

```bash
npm run format
npm run format:check
```

O projeto usa Prettier para manter o código formatado e legível.
