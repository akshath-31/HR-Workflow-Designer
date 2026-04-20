import KeyValueEditor from './KeyValueEditor'
import { StartNodeData } from '../../types/workflow'

interface Props {
  data: StartNodeData
  onChange: (data: Partial<StartNodeData>) => void
}

export default function StartNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Step Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. Onboarding Start"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Initial Metadata
        </label>
        <KeyValueEditor
          pairs={data.metadata}
          onChange={(metadata) => onChange({ metadata })}
          addLabel="Add Metadata"
        />
      </div>
    </div>
  )
}
