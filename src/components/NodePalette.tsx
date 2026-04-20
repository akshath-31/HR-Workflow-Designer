import React from 'react'
import { Play, ClipboardList, CheckSquare, Zap, StopCircle } from 'lucide-react'
import { useWorkflowStore } from '../store/workflowStore'
import { NodeType } from '../types/workflow'

interface PaletteItem {
  type: NodeType
  label: string
  description: string
  icon: typeof Play
  color: string
}

const PALETTE_ITEMS: PaletteItem[] = [
  {
    type: 'start',
    label: 'Start',
    description: 'Workflow entry point',
    icon: Play,
    color: 'border-[#238636]'
  },
  {
    type: 'task',
    label: 'Task',
    description: 'Assign a human task',
    icon: ClipboardList,
    color: 'border-[#1f6feb]'
  },
  {
    type: 'approval',
    label: 'Approval',
    description: 'Require approval',
    icon: CheckSquare,
    color: 'border-[#9e6a03]'
  },
  {
    type: 'automated',
    label: 'Automated',
    description: 'Trigger system action',
    icon: Zap,
    color: 'border-[#8957e5]'
  },
  {
    type: 'end',
    label: 'End',
    description: 'Workflow completion',
    icon: StopCircle,
    color: 'border-[#da3633]'
  }
]

export default function NodePalette() {
  const { nodes, edges } = useWorkflowStore()

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const hasStart = nodes.some(n => n.data.type === 'start')
  const hasEnd = nodes.some(n => n.data.type === 'end')

  return (
    <div className="w-60 h-full bg-[#161b22] border-r border-[#30363d] flex flex-col">
      <div className="p-4 border-b border-[#30363d]">
        <h2 className="text-xs font-bold text-[#8b949e] uppercase tracking-widest">Node Palette</h2>
        <p className="text-[10px] text-[#8b949e] mt-1">Drag and drop nodes onto the canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {PALETTE_ITEMS.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className={`cursor-grab active:cursor-grabbing bg-[#1c2128] border-l-4 ${item.color} rounded p-3 hover:bg-[#1c2128]/80 hover:translate-x-1 transition-all group border-y border-r border-y-[#30363d] border-r-[#30363d] shadow-sm`}
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-[#0f1117] rounded text-[#c9d1d9] group-hover:text-[#58a6ff] transition-colors">
                <item.icon size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#e6edf3]">{item.label}</h3>
                <p className="text-[10px] text-[#8b949e]">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#0f1117] border-t border-[#30363d]">
        <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-3">Workflow Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#8b949e]">Total Nodes</span>
            <span className="text-[#e6edf3] font-mono">{nodes.length}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#8b949e]">Connections</span>
            <span className="text-[#e6edf3] font-mono">{edges.length}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#8b949e]">Has Start</span>
            <span className={hasStart ? 'text-[#3fb950]' : 'text-[#f85149]'}>{hasStart ? '✓' : '✗'}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#8b949e]">Has End</span>
            <span className={hasEnd ? 'text-[#3fb950]' : 'text-[#f85149]'}>{hasEnd ? '✓' : '✗'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
