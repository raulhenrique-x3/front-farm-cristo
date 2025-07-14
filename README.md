Aqui está um **README detalhado** para o projeto Expo (React Native) que você enviou. O conteúdo foi gerado com base nos arquivos reais, dependências e funcionalidades atuais do app:

---

# 📱 Projeto Expo - App Mobile

Este é um projeto desenvolvido com [Expo](https://expo.dev/) utilizando o `expo-router` para rotas baseadas em arquivos. O app possui autenticação, consumo de API com `axios`, cache de dados com `React Query`, e uso de componentes estilizados com `RNEUI`.

## 🚀 Tecnologias e Bibliotecas Utilizadas

### 📦 Dependências principais

| Biblioteca                                                                                                        | Descrição                                                   |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `expo`                                                                                                            | Framework que simplifica o desenvolvimento com React Native |
| `expo-router`                                                                                                     | Sistema de rotas baseado em arquivos para projetos Expo     |
| `@tanstack/react-query`                                                                                           | Gerenciamento de estado e cache para dados assíncronos      |
| `axios`                                                                                                           | Cliente HTTP para comunicação com APIs                      |
| `expo-secure-store`                                                                                               | Armazenamento seguro para dados sensíveis como tokens       |
| `react-hook-form`                                                                                                 | Controle de formulários com validações                      |
| `@rneui/themed` e `@rneui/base`                                                                                   | Componentes estilizados reutilizáveis (UI)                  |
| `react-navigation`                                                                                                | Navegação por abas e pilha no app                           |
| `expo-haptics`, `expo-blur`, `expo-constants`, `expo-splash-screen`, `expo-image`, `expo-font`, `expo-status-bar` | Vários recursos nativos do Expo utilizados no app           |
| `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-screens`                          | Melhor experiência e controle de gestos e layout            |

---

## 🏗️ Estrutura do Projeto

```
projeto/
│
├── app/                    # Estrutura de rotas (expo-router)
│   ├── _layout.tsx        # Layout principal da navegação
│   ├── index.tsx          # Página inicial (home)
│   └── (auth)/            # Rotas relacionadas à autenticação
│       ├── _layout.tsx
│       └── index.tsx
│
├── api/                   # Configuração do cliente Axios
│   ├── client.ts          # Setup com interceptors e token
│   └── index.ts           # (Pode ser usado para exportações agrupadas)
│
├── utils/                 # Utilitários
│   └── handleAxiosError.ts # Tratamento de erros do Axios com Alert
│
├── assets/                # Fontes, imagens, logos
│
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configurações TypeScript
```

---

## 🔐 Autenticação e Segurança

O token JWT é armazenado de forma segura usando o `expo-secure-store`. Antes de cada requisição, o `axios` injeta automaticamente o token no header `Authorization`.

### Exemplo:

```ts
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
```

---

## ❗ Tratamento de Erros

Todos os erros de requisições são tratados por um utilitário:

```ts
import { handleAxiosError } from "@/utils/handleAxiosError";

try {
  await api.get("/user");
} catch (err) {
  handleAxiosError(err);
}
```

Isso exibe um `Alert` amigável ao usuário com a mensagem de erro vinda da API ou uma mensagem genérica.

---

## ⚙️ Scripts Disponíveis

| Comando                 | Descrição                              |
| ----------------------- | -------------------------------------- |
| `npm start`             | Inicia o servidor Expo                 |
| `npm run android`       | Inicia o app no emulador Android       |
| `npm run ios`           | Inicia o app no simulador iOS          |
| `npm run web`           | Inicia o app no navegador              |
| `npm run reset-project` | Limpa o projeto e recria arquivos base |

---

## 📦 Como instalar e rodar

```bash
# 1. Instale as dependências
npm install

# 2. Rode o projeto
npx expo start
```

---

## ✍️ Como implementar novas funcionalidades

### 1. Criar uma nova tela

Crie um novo arquivo `.tsx` em `app/` ou `app/(auth)/`:

O `expo-router` detecta automaticamente a rota: `/profile`.

### 2. Fazer uma requisição com React Query

```tsx
import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";

const fetchUser = () => api.get("/user").then((res) => res.data);

export function useUser() {
  return useQuery(["user"], fetchUser);
}
```

---

Se desejar, posso gerar um README em formato Markdown pronto para ser colado no GitHub. Deseja isso?
