import React from 'react'
import { Download, Upload, Trash2, GitPullRequest, LayoutDashboard, Layout } from 'lucide-react'
import { useWorkflowStore } from '../store/workflowStore'
import dagre from 'dagre'
import { WorkflowNode, WorkflowEdge } from '../types/workflow'

export default function Toolbar() {
  const { nodes, edges, setNodes, setEdges, clearCanvas } = useWorkflowStore()

  const handleClear = () => {
    if (confirm('Clear entire workflow canvas? This cannot be undone.')) {
      clearCanvas()
    }
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (json.nodes && json.edges) {
          setNodes(json.nodes)
          setEdges(json.edges)
        } else {
          alert('Invalid workflow file format')
        }
      } catch (err) {
        alert('Failed to parse workflow file')
      }
    }
    reader.readAsText(file)
  }

  const handleAutoLayout = () => {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: 'TB', ranksep: 80, nodesep: 50 })

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 200, height: 80 })
    })

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    const nextNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 100,
          y: nodeWithPosition.y - 40,
        },
      }
    })

    setNodes(nextNodes as WorkflowNode[])
  }

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
          <GitPullRequest size={20} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900">HR Workflow Designer</h1>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest -mt-0.5">Internal Tools Studio</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleAutoLayout}
          className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 rounded text-xs font-semibold border border-gray-200 shadow-sm transition-all"
        >
          <Layout size={14} className="text-blue-600" />
          Auto Layout
        </button>

        <label className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 rounded text-xs font-semibold border border-gray-200 shadow-sm transition-all cursor-pointer">
          <Upload size={14} className="text-blue-600" />
          Import JSON
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 bg-transparent hover:bg-red-50 text-gray-500 hover:text-red-600 rounded text-xs font-semibold transition-all"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded border border-gray-200">
          <span className="text-[10px] text-gray-500 uppercase font-bold">Nodes</span>
          <span className="text-[10px] text-gray-900 font-mono">{nodes.length}</span>
        </div>
      </div>
    </div>
  )
}
