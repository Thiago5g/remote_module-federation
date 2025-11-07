import { useState } from 'react'

type Props = {
  value?: number
  onIncrement?: () => void
  onDecrement?: () => void
}

export default function SharedCounter({ value, onIncrement, onDecrement }: Props) {
  // Fallback local state when running standalone (no props provided)
  const [local, setLocal] = useState(0)
  const current = value ?? local

  const dec = () => {
    console.log('[REMOTE] Decrement clicked')
    if (onDecrement) onDecrement()
    else setLocal((n) => n - 1)
  }
  const inc = () => {
    console.log('[REMOTE] Increment clicked')
    if (onIncrement) onIncrement()
    else setLocal((n) => n + 1)
  }

  return (
    <div className="rounded-xl border bg-white/80 p-4 flex items-center gap-4">
      <span className="text-sm text-gray-600">Shared Counter (Host + Remote):</span>
      <button onClick={dec} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
      <span className="text-xl font-bold w-10 text-center">{current}</span>
      <button onClick={inc} className="px-2 py-1 bg-green-600 text-white rounded">+</button>
    </div>
  )
}
