import { clsx } from 'clsx'
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react'
import type { ValidationError } from '../types/workflow'

interface Props {
  validationErrors: ValidationError[]
  setSelectedNode: (id: string | null) => void
}

export function SimulationValidation({ validationErrors, setSelectedNode }: Props) {
  return (
    <div className="w-1/3 border-r border-gray-300 flex flex-col overflow-hidden">
      <div className="px-4 py-1.5 bg-gray-50 border-b border-gray-300">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Validation</h4>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {validationErrors.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <CheckCircle2 size={32} className="text-green-500/20 mb-2" />
            <p className="text-[11px] text-gray-500">Workflow satisfies all graph requirements.</p>
          </div>
        ) : (
          validationErrors.map((err, i) => (
            <div 
              key={i} 
              onClick={() => err.nodeId && setSelectedNode(err.nodeId)}
              className={clsx(
                "p-2 rounded border flex gap-3 group transition-colors",
                err.severity === 'error' ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200",
                err.nodeId ? "cursor-pointer hover:bg-opacity-10" : ""
              )}
            >
              {err.severity === 'error' ? 
                <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" /> : 
                <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
              }
              <div className="flex-1 min-w-0">
                <p className={clsx(
                  "text-[11px] leading-relaxed",
                  err.severity === 'error' ? "text-red-500" : "text-yellow-500"
                )}>
                  {err.message}
                </p>
                {err.nodeId && (
                  <span className="text-[9px] text-gray-500 group-hover:text-blue-500">Click to locate node</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
