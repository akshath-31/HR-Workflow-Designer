import { ApprovalNodeData } from '../../types/workflow'

interface Props {
  data: ApprovalNodeData
  onChange: (data: Partial<ApprovalNodeData>) => void
}

export default function ApprovalNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Approval Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. Budget Approval"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Approver Role
        </label>
        <select
          value={data.approverRole}
          onChange={(e) => onChange({ approverRole: e.target.value as "Manager" | "HRBP" | "Director" })}
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none"
        >
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Auto-Approve Threshold
          </label>
          <span className="text-xs font-mono text-blue-500">{data.autoApproveThreshold}%</span>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={data.autoApproveThreshold}
            onChange={(e) => onChange({ autoApproveThreshold: parseInt(e.target.value) })}
            className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={data.autoApproveThreshold}
            onChange={(e) => onChange({ autoApproveThreshold: parseInt(e.target.value) || 0 })}
            className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
