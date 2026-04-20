import { clsx } from 'clsx'
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react'
import type { ValidationError } from '../types/workflow'

interface Props {
  validationErrors: ValidationError[]
  setSelectedNode: (id: string | null) => void
}

export function SimulationValidation({ validationErrors, setSelectedNode }: Props) {
  return (
    <div className="w-1/3 border-r border-[#30363d] flex flex-col overflow-hidden">
      <div className="px-4 py-1.5 bg-[#1c2128] border-b border-[#30363d]">
        <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Validation</h4>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {validationErrors.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <CheckCircle2 size={32} className="text-[#3fb950]/20 mb-2" />
            <p className="text-[11px] text-[#8b949e]">Workflow satisfies all graph requirements.</p>
          </div>
        ) : (
          validationErrors.map((err, i) => (
            <div 
              key={i} 
              onClick={() => err.nodeId && setSelectedNode(err.nodeId)}
              className={clsx(
                "p-2 rounded border flex gap-3 group transition-colors",
                err.severity === 'error' ? "bg-[#f85149]/5 border-[#f85149]/20" : "bg-[#d29922]/5 border-[#d29922]/20",
                err.nodeId ? "cursor-pointer hover:bg-opacity-10" : ""
              )}
            >
              {err.severity === 'error' ? 
                <XCircle size={14} className="text-[#f85149] shrink-0 mt-0.5" /> : 
                <AlertTriangle size={14} className="text-[#d29922] shrink-0 mt-0.5" />
              }
              <div className="flex-1 min-w-0">
                <p className={clsx(
                  "text-[11px] leading-relaxed",
                  err.severity === 'error' ? "text-[#f85149]" : "text-[#d29922]"
                )}>
                  {err.message}
                </p>
                {err.nodeId && (
                  <span className="text-[9px] text-[#8b949e] group-hover:text-[#58a6ff]">Click to locate node</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
