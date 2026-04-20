import { Handle, Position, NodeProps } from 'reactflow'
import { CheckSquare } from 'lucide-react'
import { ApprovalNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function ApprovalNode({ data, selected }: NodeProps<ApprovalNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-[#3d2c00] border-2 rounded-lg p-3 shadow-xl transition-all',
      selected ? 'border-[#9e6a03] ring-2 ring-[#9e6a03]/50' : 'border-[#9e6a03]/50'
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-[#9e6a03] rounded-md text-white">
          <CheckSquare size={16} />
        </div>
        <div>
          <h3 className="font-mono font-medium text-sm text-white leading-tight">
            {data.title || 'Approval'}
          </h3>
          <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
            Decision Point
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        <div className="text-[10px] text-[#9e6a03] font-semibold bg-[#9e6a03]/10 px-2 py-0.5 rounded border border-[#9e6a03]/30">
          {data.approverRole}
        </div>
        <div className="text-[10px] text-white/40 font-mono italic flex items-center">
          Threshold: {data.autoApproveThreshold}%
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-[#9e6a03] border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-[#9e6a03] border-2 border-white"
      />
    </div>
  )
}
