import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  BackgroundVariant 
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useWorkflowStore } from '../store/workflowStore'
import { useWorkflow } from '../hooks/useWorkflow'
import StartNode from './nodes/StartNode'
import TaskNode from './nodes/TaskNode'
import ApprovalNode from './nodes/ApprovalNode'
import AutomatedNode from './nodes/AutomatedNode'
import EndNode from './nodes/EndNode'

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
}

export default function WorkflowCanvas() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    setSelectedNode 
  } = useWorkflowStore()
  
  const { onDragOver, onDrop } = useWorkflow()

  return (
    <div className="flex-1 relative bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        deleteKeyCode={['Backspace', 'Delete']}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          color="#cbd5e1" 
          gap={30} 
        />
        <Controls 
          className="bg-white border-gray-200 fill-gray-600 shadow-sm" 
          style={{ 
            button: { backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' },
            path: { fill: '#4b5563' }
          }} 
        />
        <MiniMap 
          style={{ 
            background: 'white', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }} 
          maskColor="rgba(248, 250, 252, 0.7)"
          nodeColor={(node) => {
            switch (node.data.type) {
              case 'start': return '#22c55e'
              case 'task': return '#3b82f6'
              case 'approval': return '#f59e0b'
              case 'automated': return '#8b5cf6'
              case 'end': return '#ef4444'
              default: return '#e5e7eb'
            }
          }}
        />
      </ReactFlow>
    </div>
  )
}
