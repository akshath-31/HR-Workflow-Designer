import { clsx } from 'clsx'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { SimulationResult } from '../types/workflow'

interface Props {
  result: SimulationResult | null
}

export function SimulationExecutionLog({ result }: Props) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-4 py-1.5 bg-gray-50 border-b border-gray-300">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Execution Log</h4>
      </div>
      <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
        {!result ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <p className="text-[11px] text-gray-500">Ready to simulate workflow execution.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#30363d]">
            {result.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="mt-1">
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-gray-900">{step.nodeTitle}</span>
                    <span className="text-[9px] px-1.5 border border-gray-300 rounded text-gray-500 bg-white uppercase tracking-wider">
                      {step.nodeType}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">{step.message}</p>
                </div>
                <div className="shrink-0 text-[10px] font-mono text-blue-500/50">
                  {new Date(step.timestamp).toLocaleTimeString([], { hour12: false })}
                </div>
              </div>
            ))}
            {!result.success && (
              <div className="px-4 py-3 bg-red-50 flex gap-4">
                <XCircle size={14} className="text-red-500 mt-1" />
                <div className="flex-1">
                  <h4 className="text-[11px] font-bold text-red-500 mb-1">Simulation Error</h4>
                  <p className="text-[11px] text-gray-500">{result.error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
