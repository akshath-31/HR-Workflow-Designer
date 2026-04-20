import { Handle, Position, NodeProps } from 'reactflow'
import { CheckSquare } from 'lucide-react'
import { ApprovalNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function ApprovalNode({ data, selected }: NodeProps<ApprovalNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-white border rounded-xl p-3 shadow-sm transition-all',
      selected ? 'border-yellow-500 ring-2 ring-yellow-500/30' : 'border-gray-200'
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-yellow-50 rounded-lg text-yellow-600">
          <CheckSquare size={16} />
        </div>
        <div>
          <h3 className="font-mono font-bold text-sm text-gray-900 leading-tight">
            {data.title || 'Approval'}
          </h3>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            Decision Point
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        <div className="text-[10px] text-yellow-700 font-bold bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
          {data.approverRole}
        </div>
        <div className="text-[10px] text-gray-400 font-mono italic flex items-center">
          Threshold: {data.autoApproveThreshold}%
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-yellow-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-yellow-500 border-2 border-white"
      />
    </div>
  )
}
