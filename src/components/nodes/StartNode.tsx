import { Handle, Position, NodeProps } from 'reactflow'
import { Play } from 'lucide-react'
import { StartNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function StartNode({ data, selected }: NodeProps<StartNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-white border rounded-xl p-3 shadow-sm transition-all',
      selected ? 'border-green-500 ring-2 ring-green-500/30' : 'border-gray-200'
    )}>
      <div className="flex items-center gap-3 mb-1">
        <div className="p-1.5 bg-green-50 rounded-lg text-green-600">
          <Play size={16} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-mono font-bold text-sm text-gray-900 leading-tight">
            {data.title || 'Start'}
          </h3>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            Entry Point
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
    </div>
  )
}
