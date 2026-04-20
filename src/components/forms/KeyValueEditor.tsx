import { Plus, X } from 'lucide-react'

interface KeyValueEditorProps {
  pairs: Array<{ key: string; value: string }>
  onChange: (pairs: Array<{ key: string; value: string }>) => void
  addLabel?: string
}

export default function KeyValueEditor({ pairs, onChange, addLabel = 'Add Field' }: KeyValueEditorProps) {
  const addPair = () => {
    onChange([...pairs, { key: '', value: '' }])
  }

  const removePair = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index))
  }

  const updatePair = (index: number, field: 'key' | 'value', val: string) => {
    onChange(pairs.map((p, i) => i === index ? { ...p, [field]: val } : p))
  }

  return (
    <div className="space-y-2">
      {pairs.map((pair, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Key"
            value={pair.key}
            onChange={(e) => updatePair(index, 'key', e.target.value)}
            className="flex-1 min-w-0 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="Value"
            value={pair.value}
            onChange={(e) => updatePair(index, 'value', e.target.value)}
            className="flex-1 min-w-0 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
          />
          <button
            onClick={() => removePair(index)}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={addPair}
        className="flex items-center gap-1.5 text-[11px] font-medium text-blue-500 hover:text-blue-400 transition-colors mt-1"
      >
        <Plus size={12} />
        {addLabel}
      </button>
    </div>
  )
}
