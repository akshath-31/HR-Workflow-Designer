import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import { useWorkflowStore } from '../store/workflowStore'
import type { NodeType } from '../types/workflow'

export function useWorkflow() {
  const { addNode } = useWorkflowStore()
  const { screenToFlowPosition } = useReactFlow()

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/reactflow') as NodeType
    if (!type) return
    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
    addNode(type, position)
  }, [addNode, screenToFlowPosition])

  return { onDragOver, onDrop }
}
