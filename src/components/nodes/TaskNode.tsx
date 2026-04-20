import { Handle, Position, NodeProps } from 'reactflow'
import { ClipboardList } from 'lucide-react'
import { TaskNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function TaskNode({ data, selected }: NodeProps<TaskNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-[#0d2747] border-2 rounded-lg p-3 shadow-xl transition-all',
      selected ? 'border-[#1f6feb] ring-2 ring-[#1f6feb]/50' : 'border-[#1f6feb]/50'
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-[#1f6feb] rounded-md text-white">
          <ClipboardList size={16} />
        </div>
        <div>
          <h3 className="font-mono font-medium text-sm text-white leading-tight">
            {data.title || 'Task'}
          </h3>
          <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
            Human Task
          </p>
        </div>
      </div>
      {data.assignee && (
        <div className="mt-2 text-[10px] text-[#1f6feb] font-semibold bg-[#1f6feb]/10 px-2 py-0.5 rounded border border-[#1f6feb]/30 inline-block">
          Assignee: {data.assignee}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-[#1f6feb] border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-[#1f6feb] border-2 border-white"
      />
    </div>
  )
}
