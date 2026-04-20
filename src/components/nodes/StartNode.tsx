import { Handle, Position, NodeProps } from 'reactflow'
import { Play } from 'lucide-react'
import { StartNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function StartNode({ data, selected }: NodeProps<StartNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-[#1a4a2e] border-2 rounded-lg p-3 shadow-xl transition-all',
      selected ? 'border-[#238636] ring-2 ring-[#238636]/50' : 'border-[#238636]/50'
    )}>
      <div className="flex items-center gap-3 mb-1">
        <div className="p-1.5 bg-[#238636] rounded-md text-white">
          <Play size={16} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-mono font-medium text-sm text-white leading-tight">
            {data.title || 'Start'}
          </h3>
          <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
            Entry Point
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-[#238636] border-2 border-white"
      />
    </div>
  )
}
