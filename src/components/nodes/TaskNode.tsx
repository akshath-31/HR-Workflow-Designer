import { Handle, Position, NodeProps } from 'reactflow'
import { ClipboardList } from 'lucide-react'
import { TaskNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function TaskNode({ data, selected }: NodeProps<TaskNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-white border rounded-xl p-3 shadow-sm transition-all',
      selected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-200'
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
          <ClipboardList size={16} />
        </div>
        <div>
          <h3 className="font-mono font-bold text-sm text-gray-900 leading-tight">
            {data.title || 'Task'}
          </h3>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            Human Task
          </p>
        </div>
      </div>
      {data.assignee && (
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
            {data.assignee}
          </div>
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  )
}
