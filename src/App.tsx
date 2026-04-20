import { ReactFlowProvider } from 'reactflow'
import Toolbar from './components/Toolbar'
import NodePalette from './components/NodePalette'
import ConfigPanel from './components/ConfigPanel'
import SimulationPanel from './components/SimulationPanel'
import WorkflowCanvas from './components/WorkflowCanvas'

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 text-gray-900">
      <Toolbar />
      
      <div className="flex flex-1 overflow-hidden">
        <NodePalette />
        
        <div className="flex-1 flex flex-col relative">
          <ReactFlowProvider>
            <WorkflowCanvas />
          </ReactFlowProvider>
          <SimulationPanel />
        </div>
        
        <ConfigPanel />
      </div>
    </div>
  )
}
