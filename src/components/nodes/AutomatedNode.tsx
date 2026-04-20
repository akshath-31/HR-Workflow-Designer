import { Handle, Position, NodeProps } from 'reactflow'
import { Zap } from 'lucide-react'
import { AutomatedNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function AutomatedNode({ data, selected }: NodeProps<AutomatedNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-[#2d1b69] border-2 rounded-lg p-3 shadow-xl transition-all',
      selected ? 'border-[#8957e5] ring-2 ring-[#8957e5]/50' : 'border-[#8957e5]/50'
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-[#8957e5] rounded-md text-white">
          <Zap size={16} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-mono font-medium text-sm text-white leading-tight">
            {data.title || 'Automated Step'}
          </h3>
          <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
            System Action
          </p>
        </div>
      </div>
      {data.actionId && (
        <div className="mt-2 text-[10px] text-[#8957e5] font-semibold bg-[#8957e5]/10 px-2 py-0.5 rounded border border-[#8957e5]/30 inline-block">
          Action: {data.actionId.replace('_', ' ')}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-[#8957e5] border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-[#8957e5] border-2 border-white"
      />
    </div>
  )
}
