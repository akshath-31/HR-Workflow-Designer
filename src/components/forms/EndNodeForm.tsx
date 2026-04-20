import { EndNodeData } from '../../types/workflow'

interface Props {
  data: EndNodeData
  onChange: (data: Partial<EndNodeData>) => void
}

export default function EndNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Final Message
        </label>
        <textarea
          value={data.endMessage}
          onChange={(e) => onChange({ endMessage: e.target.value })}
          rows={3}
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
          placeholder="Workflow completed message..."
        />
      </div>

      <div className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Include Summary</h4>
          <p className="text-[10px] text-gray-500">Generate a detailed execution report</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.includeSummary}
            onChange={(e) => onChange({ includeSummary: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  )
}
