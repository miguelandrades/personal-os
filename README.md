# OS Pessoal

Um dashboard pessoal para acompanhar rotina, saúde, aprendizado, treinos e evolução de longo prazo.

O projeto foi criado para funcionar como um centro de controle simples e acolhedor: registrar o que aconteceu no dia, identificar padrões e tomar decisões melhores para a próxima semana — sem transformar a vida em uma lista infinita de tarefas.

## Visão geral

O OS Pessoal centraliza os principais pilares da rotina:

- Saúde e recuperação
- Estudos e desenvolvimento de carreira
- Inglês
- Boxe e musculação
- Hábitos essenciais
- Tempo de qualidade e vida pessoal
- Revisão semanal e evolução contínua

A interface foi pensada para ser minimalista, mobile-first e mais calma do que dashboards tradicionais de produtividade.

## Funcionalidades

- Check-in diário com sono, energia, humor, tempo de qualidade e nota do dia
- Registro de sessões de estudo para curso.dev, VTEX IO, React, Next.js e inglês
- Registro de treinos de boxe, Upper e Lower
- Hábitos rápidos, como água, vitaminas, leitura e dormir antes das 23h
- Dashboard semanal com score, sono médio, estudo, treinos e consistência
- Tela de crescimento com objetivos e sessões recentes
- Tela de corpo com recuperação e histórico de treinos
- Edição e exclusão de sessões, treinos e hábitos
- Banco de dados PostgreSQL hospedado no Neon

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon Postgres](https://neon.tech/)
- [Vercel](https://vercel.com/)

## Rodando localmente

### Pré-requisitos

- Node.js 20 ou superior
- npm
- Git
- Conta no Neon com um banco PostgreSQL criado

### Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/personal-os.git
cd personal-os
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
```

Gere e aplique as migrations:

```bash
npm run db:generate
npm run db:migrate
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Scripts

| Comando                | Descrição                          |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Inicia o ambiente local            |
| `npm run build`        | Gera o build de produção           |
| `npm run start`        | Inicia a aplicação construída      |
| `npm run format`       | Formata os arquivos com Prettier   |
| `npm run format:check` | Confere a formatação               |
| `npm run db:generate`  | Gera migrations a partir do schema |
| `npm run db:migrate`   | Aplica migrations no banco         |

## Estrutura do projeto

```text
src/
├── app/
│   ├── corpo/           # Saúde, recuperação e treinos
│   ├── crescimento/     # Objetivos e sessões de aprendizado
│   ├── semana/          # Métricas e visão semanal
│   ├── actions.ts       # Server Actions para criar, editar e excluir registros
│   ├── globals.css      # Tokens visuais e estilos globais
│   ├── layout.tsx       # Estrutura global e navegação
│   └── page.tsx         # Dashboard "Hoje"
├── components/
│   └── forms.tsx        # Check-in, ações rápidas, edição e exclusão
└── db/
    ├── index.ts         # Conexão Neon + Drizzle
    └── schema.ts        # Tabelas e modelo de dados
```

## Modelo de uso

### Manhã

Registre sono, energia e humor no check-in diário.

### Durante o dia

Registre uma sessão quando concluir um bloco de estudo ou inglês, e um treino após boxe, Upper ou Lower.

### Noite

Atualize o check-in com tempo de qualidade, uma nota curta sobre o dia e hábitos concluídos.

### Semanalmente

Abra a tela Semana para analisar sono, consistência, tempo estudado e treinos. Use os dados para ajustar a próxima semana, não para buscar perfeição.

## Segurança

O arquivo `.env.local` contém a connection string do banco e nunca deve ser enviado ao GitHub.

```gitignore
.env.local
.env
.env.*.local
```

Antes de publicar a aplicação para outras pessoas, implemente autenticação. Atualmente, o projeto foi pensado para uso pessoal e privado.

## Próximas evoluções

- Autenticação com Auth.js ou Clerk
- Metas trimestrais editáveis
- Gráficos de 7, 28 e 90 dias
- Streaks e consistência por hábito
- Upload privado de fotos de evolução
- Histórico completo com filtros
- Integração com calendário e wearables
- MCP privado para registrar dados usando IA

## Autor

Desenvolvido por [Miguel Andrade](https://github.com/SEU_USUARIO).
