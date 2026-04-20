import { useSimulation } from '../hooks/useSimulation'
import { Play, Loader2, ChevronUp, ChevronDown, Download } from 'lucide-react'
import { useState } from 'react'
import { useWorkflowStore } from '../store/workflowStore'
import { clsx } from 'clsx'
import { SimulationValidation } from './SimulationValidation'
import { SimulationExecutionLog } from './SimulationExecutionLog'

export default function SimulationPanel() {
  const { runSimulation, isRunning, result, validationErrors } = useSimulation()
  const { nodes, edges, setSelectedNode } = useWorkflowStore()
  const [isOpen, setIsOpen] = useState(true)

  const downloadJson = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'workflow.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={clsx(
      "bg-white border-t border-gray-300 overflow-hidden transition-all duration-300 flex flex-col",
      isOpen ? "h-64" : "h-10"
    )}>
      {/* Header */}
      <div className="px-4 py-2 bg-white border-b border-gray-300 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-900"
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          <div className="flex items-center gap-2">
            <Play size={14} className="text-green-500" fill="currentColor" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Workflow Simulation</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadJson}
            className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded text-[11px] font-semibold border border-gray-300 transition-colors"
          >
            <Download size={14} />
            Export JSON
          </button>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded text-[11px] font-bold shadow-sm transition-colors"
          >
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
            Run Simulation
          </button>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Validation Errors */}
          <SimulationValidation validationErrors={validationErrors} setSelectedNode={setSelectedNode} />

          {/* Right: Execution Log */}
          <SimulationExecutionLog result={result} />
        </div>
      )}
    </div>
  )
}
