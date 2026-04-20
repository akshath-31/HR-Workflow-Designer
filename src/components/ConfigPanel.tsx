import { useWorkflowStore } from '../store/workflowStore'
import { Trash2, AlertCircle } from 'lucide-react'
import StartNodeForm from './forms/StartNodeForm'
import TaskNodeForm from './forms/TaskNodeForm'
import ApprovalNodeForm from './forms/ApprovalNodeForm'
import AutomatedNodeForm from './forms/AutomatedNodeForm'
import EndNodeForm from './forms/EndNodeForm'

export default function ConfigPanel() {
  const { nodes, selectedNodeId, updateNodeData, deleteNode } = useWorkflowStore()
  
  const node = nodes.find(n => n.id === selectedNodeId)

  if (!selectedNodeId || !node) {
    return (
      <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col items-center justify-center p-8 text-center shadow-sm z-10">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">No Node Selected</h3>
        <p className="text-xs text-gray-500">Select a node on the canvas to configure its properties</p>
      </div>
    )
  }

  const renderForm = () => {
    switch (node.data.type) {
      case 'start':
        return <StartNodeForm data={node.data} onChange={(data) => updateNodeData(node.id, data)} />
      case 'task':
        return <TaskNodeForm data={node.data} onChange={(data) => updateNodeData(node.id, data)} />
      case 'approval':
        return <ApprovalNodeForm data={node.data} onChange={(data) => updateNodeData(node.id, data)} />
      case 'automated':
        return <AutomatedNodeForm data={node.data} onChange={(data) => updateNodeData(node.id, data)} />
      case 'end':
        return <EndNodeForm data={node.data} onChange={(data) => updateNodeData(node.id, data)} />
      default:
        return null
    }
  }

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col z-10 shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Configure Node</h2>
          <span className="text-[10px] font-mono text-gray-500">{node.id}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {renderForm()}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => deleteNode(node.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 rounded text-xs font-semibold transition-all"
        >
          <Trash2 size={14} />
          Delete Node
        </button>
      </div>
    </div>
  )
}
