# Remote Application - Module Federation

This is the **Remote** project configured with:

- ⚡ **Vite** - Build tool
- ⚛️ **React 19** - Framework
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Styling
- 🔧 **ESLint** - Code quality
- 🔗 **Module Federation** - Exposing components to other apps

## 🚀 How to use

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5001`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
# or
npm run serve
```

## 📦 Module Federation - Remote

This project is configured as a **Remote** and exposes components to be consumed by Host applications.

### Exposed Components

This remote exposes the following components:

```typescript
exposes: {
  './App': './src/App.tsx',           // Main component
  './Button': './src/components/Button.tsx',  // Reusable Button component
}
```

### Remote Entry URL

```
http://localhost:5001/assets/remoteEntry.js
```

### How to consume this remote

In the **Host** project, configure `vite.config.ts`:

```typescript
federation({
  name: 'host',
  remotes: {
    remote: 'http://localhost:5001/assets/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
})
```

And use the components:

```typescript
import { lazy, Suspense } from 'react';

// Import components from remote
const RemoteApp = lazy(() => import('remote/App'));
const RemoteButton = lazy(() => import('remote/Button'));

// Use in your component
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

## 📁 Project Structure

```
remote/
├── src/
│   ├── components/
│   │   └── Button.tsx   # Exposed component
│   ├── App.tsx          # Main exposed component
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind imports
├── vite.config.ts       # Vite + Federation config (Remote)
├── tailwind.config.js   # Tailwind config
├── tsconfig.json        # TypeScript config
└── .eslintrc.cjs        # ESLint config
```

## 🎨 Components

### Button

Reusable button component with variants:

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

## 📝 Notes

- Runs on port **5001** to avoid conflicts with the host
- CORS enabled to allow consumption by other apps
- Components optimized for sharing via Module Federation
- TypeScript strict mode enabled
- Tailwind with JIT mode for optimized builds
```
