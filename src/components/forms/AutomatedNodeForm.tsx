import { useState, useEffect } from 'react'
import { AutomatedNodeData, AutomationAction } from '../../types/workflow'
import { getAutomations } from '../../api/automations'

interface Props {
  data: AutomatedNodeData
  onChange: (data: Partial<AutomatedNodeData>) => void
}

export default function AutomatedNodeForm({ data, onChange }: Props) {
  const [actions, setActions] = useState<AutomationAction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAutomations().then(res => {
      setActions(res)
      setLoading(false)
    })
  }, [])

  const selectedAction = actions.find(a => a.id === data.actionId)

  const handleActionChange = (actionId: string) => {
    const action = actions.find(a => a.id === actionId)
    // Reset params when action changes
    const initialParams: Record<string, string> = {}
    action?.params.forEach(p => initialParams[p] = '')
    onChange({ actionId, actionParams: initialParams, title: action?.label || data.title })
  }

  const handleParamChange = (key: string, val: string) => {
    onChange({
      actionParams: { ...data.actionParams, [key]: val }
    })
  }

  if (loading) return <div className="text-xs text-gray-500 animate-pulse">Loading automation actions...</div>

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Step Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. Notify Slack"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          System Action
        </label>
        <select
          value={data.actionId}
          onChange={(e) => handleActionChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none"
        >
          <option value="" disabled>Select an action</option>
          {actions.map(action => (
            <option key={action.id} value={action.id}>{action.label}</option>
          ))}
        </select>
      </div>

      {selectedAction && (
        <div className="space-y-3 pt-2 border-t border-gray-300">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Action Parameters</h4>
          {selectedAction.params.map(param => (
            <div key={param}>
              <label className="block text-[10px] font-medium text-gray-700 mb-1 capitalize">
                {param.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                value={data.actionParams[param] || ''}
                onChange={(e) => handleParamChange(param, e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder={`Enter ${param}...`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
