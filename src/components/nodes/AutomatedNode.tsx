import { Handle, Position, NodeProps } from 'reactflow'
import { Zap } from 'lucide-react'
import { AutomatedNodeData } from '../../types/workflow'
import { clsx } from 'clsx'

export default function AutomatedNode({ data, selected }: NodeProps<AutomatedNodeData>) {
  return (
    <div className={clsx(
      'min-w-[200px] bg-white border rounded-xl p-3 shadow-sm transition-all',
      selected ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-gray-200'
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
          <Zap size={16} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-mono font-bold text-sm text-gray-900 leading-tight">
            {data.title || 'Automated Step'}
          </h3>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            System Action
          </p>
        </div>
      </div>
      {data.actionId && (
        <div className="mt-2 text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block">
          Action: {data.actionId.replace('_', ' ')}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
    </div>
  )
}
