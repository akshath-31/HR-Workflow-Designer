import type { Node, Edge } from 'reactflow'

// Node data shapes — one interface per node type
export interface StartNodeData {
  type: 'start'
  title: string
  metadata: Array<{ key: string; value: string }>
}

export interface TaskNodeData {
  type: 'task'
  title: string
  description: string
  assignee: string
  dueDate: string
  customFields: Array<{ key: string; value: string }>
}

export interface ApprovalNodeData {
  type: 'approval'
  title: string
  approverRole: 'Manager' | 'HRBP' | 'Director'
  autoApproveThreshold: number
}

export interface AutomationAction {
  id: string
  label: string
  params: string[]
}

export interface AutomatedNodeData {
  type: 'automated'
  title: string
  actionId: string
  actionParams: Record<string, string>
}

export interface EndNodeData {
  type: 'end'
  endMessage: string
  includeSummary: boolean
}

export type NodeData = StartNodeData | TaskNodeData | ApprovalNodeData | AutomatedNodeData | EndNodeData
export type NodeType = NodeData['type']

// React Flow node type (extends the library's Node)
export type WorkflowNode = Node<NodeData>
export type WorkflowEdge = Edge

// Simulation types
export interface SimulationStep {
  nodeId: string
  nodeType: NodeType
  nodeTitle: string
  status: 'success' | 'pending' | 'error'
  message: string
  timestamp: string
}

export interface SimulationResult {
  success: boolean
  steps: SimulationStep[]
  error?: string
}

// Validation types
export interface ValidationError {
  nodeId?: string
  message: string
  severity: 'error' | 'warning'
}
