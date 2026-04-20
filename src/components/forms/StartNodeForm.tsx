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
        <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
          Step Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full bg-[#0f1117] border border-[#30363d] rounded px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
          placeholder="e.g. Onboarding Start"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
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
