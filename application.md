# Vamos Criar uma aplicação NEXT JS direto nesse repositorio

# A aplicação vai se chamrt CPETC HUB, onde vai consumir dados da cptec do brasil API

# Vai ser uma aplicação totalmente front end usando o cache do proprio next para algumas buscas repetidas no navegador do usuário
# Vou hospedar o site na vercel


# 🌦️ cptec-hub (Frontend)

Interface moderna para consumo e visualização de dados meteorológicos do CPTEC via BrasilAPI.

---

## 🚀 Objetivo

O **cptec-hub** é uma aplicação frontend responsável por consumir dados meteorológicos públicos e apresentar essas informações de forma clara, rápida e visual.

A aplicação deve ser resiliente mesmo com instabilidades da API externa, utilizando estratégias como cache local, retry e fallback de dados.

---

## Auth

Utilizar autenticação next-auth com integração ao google para utilizar a aplicação para termos um controle de usuários da aplicação

## 🧠 Conceito

A aplicação será um **dashboard climático interativo**, com foco em:

* Consulta de cidades
* Visualização de clima atual
* Previsões detalhadas
* Experiência fluida e responsiva

---

## 🔌 Endpoints utilizados

### 📍 Localidades

* Listar cidades com código
* Buscar cidades por nome (fallback)

### 🌆 Clima atual

* Condições atuais nas capitais

### 🌤️ Previsão do tempo

* 1 dia
* Até 6 dias
* Por latitude/longitude

### 🌊 Previsão oceânica

* 1 dia
* Até 6 dias

---

## ⚠️ Desafios da API

* Instabilidade ocasional
* Dados inconsistentes
* Limite confiável de previsão: 6 dias

---

## 🏗️ Arquitetura Frontend

### Estrutura sugerida

```
/src
  /app
  /components
  /features
    /weather
    /locations
    /ocean
  /services
    /api
  /hooks
  /store
  /utils
  /styles
```

---

## ⚙️ Funcionalidades

* [ ] Busca de cidades com autocomplete
* [ ] Tela de clima atual
* [ ] Previsão do tempo (cards ou timeline)
* [ ] Previsão oceânica
* [ ] Detecção por geolocalização
* [ ] Cache local (localStorage ou IndexedDB)
* [ ] Retry automático em falhas
* [ ] Loading states e skeletons
* [ ] Tratamento de erros amigável
* [ ] Dark mode

---

## 🧩 Boas práticas esperadas (Copilot)

* Separar lógica de API em `/services`
* Criar hooks reutilizáveis (`useWeather`, `useLocations`)
* Tipagem forte (TypeScript)
* Componentização (UI desacoplada)
* Evitar lógica pesada dentro de componentes
* Uso de SWR ou React Query para cache e revalidação

---

## 🎨 Paleta de cores

### 🌊 Tema "Weather Tech Dark"

* **Primary:** `#2563EB` (azul principal)
* **Secondary:** `#38BDF8` (azul claro)
* **Accent:** `#22C55E` (condições boas)
* **Warning:** `#F59E0B` (alerta)
* **Danger:** `#EF4444` (clima severo)
* **Background:** `#0F172A`
* **Surface:** `#1E293B`
* **Text:** `#E2E8F0`

---

## 💡 Ideias de UI

* Cards de clima com ícones dinâmicos
* Gráfico de temperatura (linha)
* Timeline de previsão (scroll horizontal)
* Indicadores visuais:

  * 🌧️ chuva
  * ☀️ sol
  * ⛈️ tempestade
* Background dinâmico baseado no clima

---

## 🔥 Diferenciais possíveis

* Salvar cidades favoritas -> pode usar o indexdb
* Comparar clima entre cidades
* Alertas visuais de clima severo -> o usuário pode informar o numero de whats app e enviar a notificação bem amigavel por lá (integrar com whatsapp)
* Animações baseadas no clima (chuva, sol, etc.)

---

## 🧪 Exemplo de uso esperado

```ts
const { data, isLoading } = useWeather(cityCode);

const { cities } = useLocations(searchTerm);
```

---

## 🛠️ Stack sugerida

* Framework: Next.js ou React
* Estado: React Query / Zustand
* Estilo: Styled component com @emotion/styled
* Gráficos: Recharts ou Chart.js e gráficos baseados em mapas para melhorar a experiencia do usuário
* Ícones: React Icons / Lucide

---

## 📌 Visão

O **cptec-hub** será uma interface moderna e inteligente para dados climáticos, com foco em experiência do usuário, performance e confiabilidade, mesmo consumindo APIs instáveis.

## BRASIL API
# Endpoints criar tipagem forte no retorno das apis usando padrão DTO

### Previsão oceânica
- https://brasilapi.com.br/api/cptec/v1/ondas/{cityCode}

Response: {
  "cidade": "Rio de Janeiro",
  "estado": "RJ",
  "atualizado_em": "2020-12-27",
  "ondas": [
    {
      "data": "27-12-2020",
      "dados_ondas": [
        {
          "vento": 5.2,
          "direcao_vento": "E",
          "direcao_vento_desc": "Leste",
          "altura_onda": 0.8,
          "direcao_onda": "ESE",
          "direcao_onda_desc": "Lés-sudeste",
          "agitacao": "Fraco",
          "hora": "00h Z"
        },
        {
          "vento": 4.8,
          "direcao_vento": "E",
          "direcao_vento_desc": "Leste",
          "altura_onda": 0.5,
          "direcao_onda": "ESE",
          "direcao_onda_desc": "Lés-sudeste",
          "agitacao": "Fraco",
          "hora": "03h Z"
        }
      ]
    }
  ]
}


### Previsão oceânica para, até, 6 dias
- https://brasilapi.com.br/api/cptec/v1/ondas/{cityCode}/{days}

{
  "cidade": "Rio de Janeiro",
  "estado": "RJ",
  "atualizado_em": "2020-12-27",
  "ondas": [
    {
      "data": "27-12-2020",
      "dados_ondas": [
        {
          "vento": 5.2,
          "direcao_vento": "E",
          "direcao_vento_desc": "Leste",
          "altura_onda": 0.8,
          "direcao_onda": "ESE",
          "direcao_onda_desc": "Lés-sudeste",
          "agitacao": "Fraco",
          "hora": "00h Z"
        },
        {
          "vento": 4.8,
          "direcao_vento": "E",
          "direcao_vento_desc": "Leste",
          "altura_onda": 0.5,
          "direcao_onda": "ESE",
          "direcao_onda_desc": "Lés-sudeste",
          "agitacao": "Fraco",
          "hora": "03h Z"
        }
      ]
    }
  ]
}

### Previsão meteorológica com base na latitude e longitude
- https://brasilapi.com.br/api/cptec/v1/clima/previsao/semana/{lat}/{long}

{
  "cidade": "Brejo Alegre",
  "estado": "SP",
  "atualizado_em": "2020-12-27",
  "clima": [
    {
      "data": "2020-12-27",
      "condicao": "pc",
      "min": 20,
      "max": 30,
      "indice_uv": 13,
      "condicao_desc": "Pancadas de Chuva"
    },
    {
      "data": "2020-12-28",
      "condicao": "pc",
      "min": 22,
      "max": 29,
      "indice_uv": 13,
      "condicao_desc": "Pancadas de Chuva"
    }
  ]
}

### Previsão meteorológica para, até, 6 dias
- https://brasilapi.com.br/api/cptec/v1/clima/previsao/{cityCode}/{days}

{
  "cidade": "Brejo Alegre",
  "estado": "SP",
  "atualizado_em": "2020-12-27",
  "clima": [
    {
      "data": "2020-12-27",
      "condicao": "pc",
      "min": 20,
      "max": 30,
      "indice_uv": 13,
      "condicao_desc": "Pancadas de Chuva"
    },
    {
      "data": "2020-12-28",
      "condicao": "pc",
      "min": 22,
      "max": 29,
      "indice_uv": 13,
      "condicao_desc": "Pancadas de Chuva"
    }
  ]
}

### Previsão meteorológica para uma cidade
- https://brasilapi.com.br/api/cptec/v1/clima/previsao/{cityCode}

{
  "cidade": "Brejo Alegre",
  "estado": "SP",
  "atualizado_em": "2020-12-27",
  "clima": [
    {
      "data": "2020-12-27",
      "condicao": "pc",
      "min": 20,
      "max": 30,
      "indice_uv": 13,
      "condicao_desc": "Pancadas de Chuva"
    },
    {
      "data": "2020-12-28",
      "condicao": "pc",
      "min": 22,
      "max": 29,
      "indice_uv": 13,
      "condicao_desc": "Pancadas de Chuva"
    }
  ]
}

o erro {
  "message": "Cidade não localizada",
  "type": "CITY_NOT_FOUND"
}

### Condições atuais nas capitais
- https://brasilapi.com.br/api/cptec/v1/clima/capital

[
  {
    "codigo_icao": "SBAR",
    "atualizado_em": "2021-01-27T15:00:00.974Z",
    "pressao_atmosferica": "1014",
    "visibilidade": "9000",
    "vento": 29,
    "direcao_vento": 90,
    "umidade": 74,
    "condicao": "ps",
    "condicao_Desc": "Predomínio de Sol",
    "temp": 28
  }
]

### Buscar localidades
- https://brasilapi.com.br/api/cptec/v1/cidade/{cityName}

[
  {
    "nome": "São Benedito",
    "estado": "CE",
    "regiao": "Nordeste",
    "id": 4750
  }
]
o erro {
  "name": "NotFoundError",
  "message": "Nenhuma cidade localizada",
  "type": "NO_CITY_NOT_FOUND"
}

### Retorna os municípios da unidade federativa
- https://brasilapi.com.br/api/ibge/municipios/v1/{siglaUF}

[
  {
    "nome": "Tubarão",
    "codigo_ibge": "421870705"
  },
  {
    "nome": "Tunápolis",
    "codigo_ibge": "421875605"
  },
  {
    "nome": "Turvo",
    "codigo_ibge": "421880605"
  },
  {
    "nome": "Morro Chato",
    "codigo_ibge": "421880620"
  },
  {
    "nome": "União do Oeste",
    "codigo_ibge": "421885505"
  },
  {
    "nome": "Urubici",
    "codigo_ibge": "421890505"
  },
  {
    "nome": "Águas Brancas",
    "codigo_ibge": "421890510"
  },
  {
    "nome": "Santa Teresinha",
    "codigo_ibge": "421890520"
  },
  {
    "nome": "Urupema",
    "codigo_ibge": "421895405"
  },
  {
    "nome": "Urussanga",
    "codigo_ibge": "421900205"
  },
  {
    "nome": "Vargeão",
    "codigo_ibge": "421910105"
  },
  {
    "nome": "Vargem",
    "codigo_ibge": "421915005"
  },
  {
    "nome": "Vargem Bonita",
    "codigo_ibge": "421917605"
  },
  {
    "nome": "Vidal Ramos",
    "codigo_ibge": "421920005"
  },
  {
    "nome": "Videira",
    "codigo_ibge": "421930905"
  },
  {
    "nome": "Anta Gorda",
    "codigo_ibge": "421930910"
  },
  {
    "nome": "Lourdes",
    "codigo_ibge": "421930925"
  },
  {
    "nome": "Vitor Meireles",
    "codigo_ibge": "421935805"
  },
  {
    "nome": "Barra da Prata",
    "codigo_ibge": "421935810"
  },
  {
    "nome": "Witmarsum",
    "codigo_ibge": "421940805"
  },
  {
    "nome": "Xanxerê",
    "codigo_ibge": "421950705"
  },
  {
    "nome": "Cambuinzal",
    "codigo_ibge": "421950715"
  },
  {
    "nome": "Xavantina",
    "codigo_ibge": "421960605"
  },
  {
    "nome": "Linha das Palmeiras",
    "codigo_ibge": "421960610"
  },
  {
    "nome": "Xaxim",
    "codigo_ibge": "421970505"
  },
  {
    "nome": "Anita Garibaldi",
    "codigo_ibge": "421970511"
  },
  {
    "nome": "Diadema",
    "codigo_ibge": "421970516"
  },
  {
    "nome": "Zortéa",
    "codigo_ibge": "421985305"
  }
]

erro 400 {
  "name": "UfBadRequestException",
  "message": "UF inválida. Informe a sigla com duas letras (A-Z).",
  "type": "bad_request"
}

erro 404 {
  "name": "EstadoNotFoundException",
  "message": "UF não encontrada.",
  "type": "not_found"
}



