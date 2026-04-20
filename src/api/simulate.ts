import type { WorkflowNode, WorkflowEdge, SimulationResult, SimulationStep } from '../types/workflow'

interface SimulatePayload {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export async function simulateWorkflow(payload: SimulatePayload): Promise<SimulationResult> {
  await new Promise(resolve => setTimeout(resolve, 800))

  const { nodes, edges } = payload

  // Build adjacency map for traversal
  const adjacency = new Map<string, string[]>()
  nodes.forEach(n => adjacency.set(n.id, []))
  edges.forEach(e => {
    adjacency.get(e.source)?.push(e.target)
  })

  // Find start node
  const startNode = nodes.find(n => n.data.type === 'start')
  if (!startNode) {
    return { success: false, steps: [], error: 'No Start node found in workflow.' }
  }

  // BFS traversal to simulate execution order
  const visited = new Set<string>()
  const queue: string[] = [startNode.id]
  const steps: SimulationStep[] = []

  const getNodeTitle = (node: WorkflowNode): string => {
    const d = node.data
    if (d.type === 'start') return d.title || 'Start'
    if (d.type === 'task') return d.title || 'Task'
    if (d.type === 'approval') return d.title || 'Approval'
    if (d.type === 'automated') return d.title || 'Automated Step'
    if (d.type === 'end') return d.endMessage || 'End'
    return 'Unknown'
  }

  const getStepMessage = (node: WorkflowNode): string => {
    const d = node.data
    if (d.type === 'start') return `Workflow initiated: "${d.title}"`
    if (d.type === 'task') return `Task assigned to ${d.assignee || 'unassigned'}: "${d.description || d.title}"`
    if (d.type === 'approval') return `Awaiting approval from ${d.approverRole} (auto-approve threshold: ${d.autoApproveThreshold})`
    if (d.type === 'automated') return `Executing action: ${d.actionId} with params: ${JSON.stringify(d.actionParams)}`
    if (d.type === 'end') return `Workflow complete. Summary: ${d.includeSummary ? 'Enabled' : 'Disabled'}`
    return 'Processing...'
  }

  while (queue.length > 0) {
    const nodeId = queue.shift()!
    if (visited.has(nodeId)) continue
    visited.add(nodeId)

    const node = nodes.find(n => n.id === nodeId)
    if (!node) continue

    steps.push({
      nodeId: node.id,
      nodeType: node.data.type,
      nodeTitle: getNodeTitle(node),
      status: 'success',
      message: getStepMessage(node),
      timestamp: new Date().toISOString(),
    })

    const nextIds = adjacency.get(nodeId) || []
    queue.push(...nextIds)
  }

  return { success: true, steps }
}
