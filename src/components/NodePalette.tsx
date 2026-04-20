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
    color: 'border-green-500'
  },
  {
    type: 'task',
    label: 'Task',
    description: 'Assign a human task',
    icon: ClipboardList,
    color: 'border-blue-500'
  },
  {
    type: 'approval',
    label: 'Approval',
    description: 'Require approval',
    icon: CheckSquare,
    color: 'border-yellow-500'
  },
  {
    type: 'automated',
    label: 'Automated',
    description: 'Trigger system action',
    icon: Zap,
    color: 'border-purple-500'
  },
  {
    type: 'end',
    label: 'End',
    description: 'Workflow completion',
    icon: StopCircle,
    color: 'border-red-500'
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
    <div className="w-60 h-full bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Node Palette</h2>
        <p className="text-[10px] text-gray-400 mt-1">Drag and drop nodes onto the canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {PALETTE_ITEMS.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className={`cursor-grab active:cursor-grabbing bg-white border-l-4 ${item.color} rounded-lg p-3 hover:bg-gray-50 hover:translate-x-1 transition-all group border border-gray-200 shadow-sm`}
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gray-100 rounded text-gray-500 group-hover:text-blue-600 transition-colors">
                <item.icon size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{item.label}</h3>
                <p className="text-[10px] text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Workflow Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">Total Nodes</span>
            <span className="text-gray-900 font-mono">{nodes.length}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">Connections</span>
            <span className="text-gray-900 font-mono">{edges.length}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">Has Start</span>
            <span className={hasStart ? 'text-green-600' : 'text-red-500'}>{hasStart ? '✓' : '✗'}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">Has End</span>
            <span className={hasEnd ? 'text-green-600' : 'text-red-500'}>{hasEnd ? '✓' : '✗'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
