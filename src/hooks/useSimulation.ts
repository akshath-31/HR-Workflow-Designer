import { useState } from 'react'
import { useWorkflowStore } from '../store/workflowStore'
import { simulateWorkflow } from '../api/simulate'
import { validateWorkflow } from '../utils/graphValidation'
import type { SimulationResult, ValidationError } from '../types/workflow'

export function useSimulation() {
  const { nodes, edges } = useWorkflowStore()
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const runSimulation = async () => {
    setIsRunning(true)
    setResult(null)

    const errors = validateWorkflow(nodes, edges)
    setValidationErrors(errors)

    const hasBlockingErrors = errors.some(e => e.severity === 'error')
    if (hasBlockingErrors) {
      setIsRunning(false)
      return
    }

    try {
      const res = await simulateWorkflow({ nodes, edges })
      setResult(res)
    } catch (err) {
      setResult({ success: false, steps: [], error: String(err) })
    } finally {
      setIsRunning(false)
    }
  }

  return { runSimulation, isRunning, result, validationErrors }
}
