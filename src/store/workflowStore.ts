import { create } from 'zustand'
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'
import type { NodeChange, EdgeChange, Connection } from 'reactflow'
import type { WorkflowNode, WorkflowEdge, NodeData, NodeType } from '../types/workflow'

interface WorkflowState {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNodeId: string | null
  
  // Node operations
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  addNode: (type: NodeType, position: { x: number; y: number }) => void
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void
  setSelectedNode: (nodeId: string | null) => void
  deleteNode: (nodeId: string) => void
  setNodes: (nodes: WorkflowNode[]) => void
  setEdges: (edges: WorkflowEdge[]) => void
  clearCanvas: () => void
}

const DEFAULT_NODE_DATA: Record<NodeType, NodeData> = {
  start: { type: 'start', title: 'Start', metadata: [] },
  task: { type: 'task', title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] },
  approval: { type: 'approval', title: 'Approval Step', approverRole: 'Manager', autoApproveThreshold: 80 },
  automated: { type: 'automated', title: 'Automated Action', actionId: '', actionParams: {} },
  end: { type: 'end', endMessage: 'Workflow Complete', includeSummary: true },
}

let nodeCounter = 1

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes) =>
    set(state => ({ nodes: applyNodeChanges(changes, state.nodes) as WorkflowNode[] })),

  onEdgesChange: (changes) =>
    set(state => ({ edges: applyEdgeChanges(changes, state.edges) as WorkflowEdge[] })),

  onConnect: (connection) =>
    set(state => ({ edges: addEdge({ ...connection, animated: true, style: { stroke: '#58a6ff' } }, state.edges) as WorkflowEdge[] })),

  addNode: (type, position) => {
    const id = `${type}-${nodeCounter++}`
    const newNode: WorkflowNode = {
      id,
      type,
      position,
      data: { ...DEFAULT_NODE_DATA[type] } as NodeData,
    }
    set(state => ({ nodes: [...state.nodes, newNode], selectedNodeId: id }))
  },

  updateNodeData: (nodeId, data) =>
    set(state => ({
      nodes: state.nodes.map(n =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } as NodeData } : n
      )
    })),

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  deleteNode: (nodeId) =>
    set(state => ({
      nodes: state.nodes.filter(n => n.id !== nodeId),
      edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    })),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  clearCanvas: () => set({ nodes: [], edges: [], selectedNodeId: null }),
}))
