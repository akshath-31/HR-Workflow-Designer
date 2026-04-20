import KeyValueEditor from './KeyValueEditor'
import { TaskNodeData } from '../../types/workflow'

interface Props {
  data: TaskNodeData
  onChange: (data: Partial<TaskNodeData>) => void
}

export default function TaskNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
          Task Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full bg-[#0f1117] border border-[#30363d] rounded px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
          placeholder="e.g. Identity Verification"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          className="w-full bg-[#0f1117] border border-[#30363d] rounded px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none resize-none"
          placeholder="What needs to be done?"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
            Assignee
          </label>
          <input
            type="text"
            value={data.assignee}
            onChange={(e) => onChange({ assignee: e.target.value })}
            className="w-full bg-[#0f1117] border border-[#30363d] rounded px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
            placeholder="Name or ID"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={data.dueDate}
            onChange={(e) => onChange({ dueDate: e.target.value })}
            className="w-full bg-[#0f1117] border border-[#30363d] rounded px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
          Custom Fields
        </label>
        <KeyValueEditor
          pairs={data.customFields}
          onChange={(customFields) => onChange({ customFields })}
          addLabel="Add Custom Field"
        />
      </div>
    </div>
  )
}
