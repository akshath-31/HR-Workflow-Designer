import { Handle, Position, NodeProps } from 'reactflow'
import { StopCircle } from 'lucide-react'
import { EndNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function EndNode({ data, selected }: NodeProps<EndNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-[#4a1515] border-2 rounded-lg p-3 shadow-xl transition-all',
      selected ? 'border-[#da3633] ring-2 ring-[#da3633]/50' : 'border-[#da3633]/50'
    )}>
      <div className="flex items-center gap-3 mb-1">
        <div className="p-1.5 bg-[#da3633] rounded-md text-white">
          <StopCircle size={16} />
        </div>
        <div>
          <h3 className="font-mono font-medium text-sm text-white leading-tight line-clamp-1">
            {data.endMessage || 'End'}
          </h3>
          <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
            Exit Point
          </p>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-[#da3633] border-2 border-white"
      />
    </div>
  )
}
