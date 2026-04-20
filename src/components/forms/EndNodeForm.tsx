import { EndNodeData } from '../../types/workflow'

interface Props {
  data: EndNodeData
  onChange: (data: Partial<EndNodeData>) => void
}

export default function EndNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
          Final Message
        </label>
        <textarea
          value={data.endMessage}
          onChange={(e) => onChange({ endMessage: e.target.value })}
          rows={3}
          className="w-full bg-[#0f1117] border border-[#30363d] rounded px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none resize-none"
          placeholder="Workflow completed message..."
        />
      </div>

      <div className="flex items-center justify-between p-3 bg-[#0f1117] border border-[#30363d] rounded">
        <div>
          <h4 className="text-sm font-medium text-[#e6edf3]">Include Summary</h4>
          <p className="text-[10px] text-[#8b949e]">Generate a detailed execution report</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.includeSummary}
            onChange={(e) => onChange({ includeSummary: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#238636]"></div>
        </label>
      </div>
    </div>
  )
}
