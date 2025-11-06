# Remote Application - Module Federation

Este é o projeto **Remote** configurado com:

- ⚡ **Vite** - Build tool
- ⚛️ **React 19** - Framework
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Styling
- 🔧 **ESLint** - Code quality
- 🔗 **Module Federation** - Expondo componentes para outros apps

## 🚀 Como usar

### Desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5001`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
# ou
npm run serve
```

## 📦 Module Federation - Remote

Este projeto está configurado como **Remote** e expõe componentes para serem consumidos por aplicações Host.

### Componentes Expostos

Este remote expõe os seguintes componentes:

```typescript
exposes: {
  './App': './src/App.tsx',           // Componente principal
  './Button': './src/components/Button.tsx',  // Componente Button reutilizável
}
```

### Remote Entry URL

```
http://localhost:5001/assets/remoteEntry.js
```

### Como consumir este remote

No projeto **Host**, configure o `vite.config.ts`:

```typescript
federation({
  name: 'host',
  remotes: {
    remote: 'http://localhost:5001/assets/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
})
```

E use os componentes:

```typescript
import { lazy, Suspense } from 'react';

// Importar componentes do remote
const RemoteApp = lazy(() => import('remote/App'));
const RemoteButton = lazy(() => import('remote/Button'));

// Usar no seu componente
function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteApp />
      <RemoteButton onClick={() => alert('Clicked!')}>
        Click Me
      </RemoteButton>
    </Suspense>
  );
}
```

## 📁 Estrutura do Projeto

```
remote/
├── src/
│   ├── components/
│   │   └── Button.tsx   # Componente exposto
│   ├── App.tsx          # Componente principal exposto
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind imports
├── vite.config.ts       # Configuração Vite + Federation (Remote)
├── tailwind.config.js   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── .eslintrc.cjs        # Configuração ESLint
```

## 🎨 Componentes

### Button

Componente de botão reutilizável com variantes:

```tsx
<Button variant="primary" onClick={handleClick}>
  Primary Button
</Button>

<Button variant="secondary">
  Secondary Button
</Button>

<Button variant="success">
  Success Button
</Button>

<Button variant="danger">
  Danger Button
</Button>
```

## 🔍 Lint

```bash
npm run lint
```

## 📝 Notas

- Roda na porta **5001** para evitar conflito com o host
- CORS habilitado para permitir consumo por outros apps
- Componentes otimizados para compartilhamento via Module Federation
- TypeScript strict mode habilitado
- Tailwind com JIT mode para builds otimizadas
```
