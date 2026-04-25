# BRASIL API HUB Hub

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Aplicacao web para consulta de dados publicos do Brasil em um unico lugar, com foco em rapidez, UX limpa e organizacao por modulos.

O projeto integra dados de:

- BrasilAPI (CEP, CNPJ, CVM, taxas)
- IBGE (estados e municipios)
- Fluxo de autenticacao com NextAuth (Google)

## Preview

- Dashboard inicial com destaque de taxas
- Modulos de consulta para CEP, CNPJ, CVM e taxas
- Navegacao por estados com dados do IBGE
- Acesso protegido para rotas privadas

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Emotion (estilizacao)
- TanStack Query (dados assincronos)
- Zustand (estado global)
- NextAuth v5 (autenticacao)

## Estrutura de modulos

```text
src/app/
	page.tsx               # Home
	auth/signin/           # Tela de login
	cep/                   # Consulta de CEP
	cnpj/                  # Consulta de CNPJ
	cvm/                   # Consulta CVM
	taxas/                 # Taxas e indices
	estado/[sigla]/        # Detalhe por estado
	api/brasil/[...path]/  # Proxy BrasilAPI
	api/ibge/[...path]/    # Proxy IBGE
```

## Como rodar localmente

### 1) Pre-requisitos

- Node.js 20+
- npm 10+ (ou yarn/pnpm/bun)

### 2) Instalar dependencias

```bash
npm install
```

### 3) Configurar ambiente

Crie o arquivo `.env.local` com base no `env.example`:

```bash
cp env.example .env.local
```

No PowerShell, use:

```powershell
Copy-Item env.example .env.local
```

Preencha as variaveis:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (ex: `http://localhost:3000`)

### 4) Iniciar app

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Descricao |
| --- | --- |
| `npm run dev` | Inicia ambiente de desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run start` | Sobe aplicacao em modo producao |
| `npm run lint` | Executa o linter |

## Rotas principais

| Rota | Descricao |
| --- | --- |
| `/` | Home com atalhos e destaques |
| `/auth/signin` | Login com Google |
| `/cep` | Consulta de CEP |
| `/cnpj` | Consulta de CNPJ |
| `/cvm` | Consulta de dados da CVM |
| `/taxas` | Taxas e indices economicos |
| `/estado/[sigla]` | Detalhes de um estado (IBGE) |

## APIs internas (proxy)

- `/api/brasil/*` redireciona para `https://brasilapi.com.br/api/*`
- `/api/ibge/*` redireciona para `https://servicodados.ibge.gov.br/api/*`

Isso evita expor chamadas diretas no cliente e centraliza cache/politicas de requisicao.

## Deploy

O deploy recomendado e na Vercel.

1. Conecte o repositorio
2. Configure as variaveis de ambiente
3. Publique a aplicacao

Mais detalhes: [Documentacao Next.js de deploy](https://nextjs.org/docs/app/building-your-application/deploying).

## Licenca

Este projeto esta sob a licenca MIT. Veja [LICENSE](LICENSE).
