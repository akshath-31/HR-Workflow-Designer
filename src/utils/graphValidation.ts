import type { WorkflowNode, WorkflowEdge, ValidationError } from '../types/workflow'

export function validateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]): ValidationError[] {
  const errors: ValidationError[] = []

  // Must have exactly one Start node
  const startNodes = nodes.filter(n => n.data.type === 'start')
  if (startNodes.length === 0) errors.push({ message: 'Workflow must have a Start node.', severity: 'error' })
  if (startNodes.length > 1) errors.push({ message: 'Workflow can only have one Start node.', severity: 'error' })

  // Must have at least one End node
  const endNodes = nodes.filter(n => n.data.type === 'end')
  if (endNodes.length === 0) errors.push({ message: 'Workflow must have an End node.', severity: 'error' })

  // Every non-end node must have at least one outgoing edge
  const nodesWithOutgoing = new Set(edges.map(e => e.source))
  nodes.filter(n => n.data.type !== 'end').forEach(node => {
    if (!nodesWithOutgoing.has(node.id)) {
      const title = 'title' in node.data ? node.data.title : node.id;
      errors.push({ nodeId: node.id, message: `Node "${title}" has no outgoing connection.`, severity: 'warning' })
    }
  })

  // Every non-start node must have at least one incoming edge
  const nodesWithIncoming = new Set(edges.map(e => e.target))
  nodes.filter(n => n.data.type !== 'start').forEach(node => {
    if (!nodesWithIncoming.has(node.id)) {
      const title = 'title' in node.data ? node.data.title : node.id;
      errors.push({ nodeId: node.id, message: `Node "${title}" has no incoming connection.`, severity: 'warning' })
    }
  })

  // Cycle detection (DFS)
  const adjacency = new Map<string, string[]>()
  nodes.forEach(n => adjacency.set(n.id, []))
  edges.forEach(e => adjacency.get(e.source)?.push(e.target))

  const visited = new Set<string>()
  const inStack = new Set<string>()

  function hasCycle(nodeId: string): boolean {
    visited.add(nodeId)
    inStack.add(nodeId)
    for (const neighbor of adjacency.get(nodeId) || []) {
      if (!visited.has(neighbor) && hasCycle(neighbor)) return true
      if (inStack.has(neighbor)) return true
    }
    inStack.delete(nodeId)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && hasCycle(node.id)) {
      errors.push({ message: 'Workflow contains a cycle. Cycles are not allowed.', severity: 'error' })
      break
    }
  }

  return errors
}
