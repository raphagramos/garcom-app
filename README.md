# Garçom (Expo + TypeScript + styled-components)

Fluxo:
1) Cadastrar lanche com ingredientes.
2) Escolher um lanche e **desmarcar** os ingredientes que o cliente **não quer**.
3) Salvar o pedido (guardado localmente).

## Como usar com Expo

Crie um projeto novo em TypeScript (ou use o seu):

```bash
npx create-expo-app garcom --template blank-typescript
cd garcom
```

Instale as dependências usadas nesta base:

```bash
# navegação
npm i @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# estilo
npm i styled-components

# estado + persistência local
npm i zustand @react-native-async-storage/async-storage
```

Agora, substitua/adicione os arquivos do diretório `src/` e `App.tsx` por estes do pacote.

Rode:

```bash
npm start
```

## Pastas

- `src/store`: Zustand stores para lanches e pedidos (persistidos com AsyncStorage).
- `src/screens`: telas (Home, Lanches, Cadastro, Pedido).
- `src/components`: Button, Card, Input, IngredientFlag.
- `src/navigation`: rotas com Native Stack.
- `src/styles`: tema simples (cores).

## Observação

- Em **Pedido** os ingredientes iniciam **ligados (incluídos)**; o garçom desmarca para marcar como **SEM**.
- Os pedidos e lanches ficam em armazenamento local (AsyncStorage). Para backend real, troque as stores por chamadas de API.
