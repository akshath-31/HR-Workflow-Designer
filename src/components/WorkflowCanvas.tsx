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
    <div className="flex-1 relative bg-[#0f1117]">
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
          color="#30363d" 
          gap={30} 
        />
        <Controls 
          className="bg-[#1c2128] border border-[#30363d] fill-white" 
          style={{ 
            button: { backgroundColor: '#1c2128', borderBottom: '1px solid #30363d' },
            path: { fill: '#8b949e' }
          }} 
        />
        <MiniMap 
          style={{ 
            background: '#161b22', 
            borderRadius: '4px',
            border: '1px solid #30363d'
          }} 
          maskColor="rgba(15, 17, 23, 0.7)"
          nodeColor={(node) => {
            switch (node.data.type) {
              case 'start': return '#238636'
              case 'task': return '#1f6feb'
              case 'approval': return '#9e6a03'
              case 'automated': return '#8957e5'
              case 'end': return '#da3633'
              default: return '#30363d'
            }
          }}
        />
      </ReactFlow>
    </div>
  )
}
