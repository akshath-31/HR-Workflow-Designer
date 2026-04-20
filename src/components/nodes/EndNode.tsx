import { Handle, Position, NodeProps } from 'reactflow'
import { StopCircle } from 'lucide-react'
import { EndNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function EndNode({ data, selected }: NodeProps<EndNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-white border rounded-xl p-3 shadow-sm transition-all',
      selected ? 'border-red-500 ring-2 ring-red-500/30' : 'border-gray-200'
    )}>
      <div className="flex items-center gap-3 mb-1">
        <div className="p-1.5 bg-red-50 rounded-lg text-red-600">
          <StopCircle size={16} />
        </div>
        <div>
          <h3 className="font-mono font-bold text-sm text-gray-900 leading-tight line-clamp-1">
            {data.endMessage || 'End'}
          </h3>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            Exit Point
          </p>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-red-500 border-2 border-white"
      />
    </div>
  )
}
