import React, { useLayoutEffect, useState, useRef } from 'react';
import { ReactFlow, ReactFlowProvider, useReactFlow, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialEdges = [
  { id: 'e1-2', source: '1', target: '3', type: 'smoothstep', animated: true },
  { id: 'e2-2', source: '2', target: '3', type: 'smoothstep', animated: true },
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', animated: true },
  { id: 'e5-4', source: '5', target: '4', type: 'smoothstep', animated: true },
  { id: 'e4-6', source: '4', target: '6', type: 'smoothstep', animated: true },
];

type FlowProps = {
  containerWidth: number;
  containerHeight: number;
};

function Flow({ containerWidth, containerHeight }: FlowProps) {
  const { fitView } = useReactFlow();

  const [nodes, setNodes] = useState([
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Blockchain Node1' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: '2', position: { x: 0, y: 0 }, data: { label: 'Blockchain Node2' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: '3', position: { x: 0, y: 0 }, data: { label: 'Central Ledger' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: '4', position: { x: 0, y: 0 }, data: { label: 'Positions' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: '5', position: { x: 0, y: 0 }, data: { label: 'Prices' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: '6', position: { x: 0, y: 0 }, data: { label: 'Dashboard' }, sourcePosition: Position.Right, targetPosition: Position.Left },
  ]);

  useLayoutEffect(() => {
    // Calculate dynamic positions based on container dimensions
    const spacingX = containerWidth / 6;
    const centerY = containerHeight / 2;

    const nodePositions = [
      { id: '1', position: { x: spacingX / 2, y: centerY - 100 } },
      { id: '2', position: { x: spacingX / 2, y: centerY + 100 } },
      { id: '3', position: { x: spacingX * 2, y: centerY } },
      { id: '4', position: { x: spacingX * 3.5, y: centerY } },
      { id: '5', position: { x: spacingX * 2.5, y: centerY - 150 } },
      { id: '6', position: { x: spacingX * 5, y: centerY } },
    ];

    setNodes(
      nodes.map((node) => ({
        ...node,
        position: nodePositions.find((pos) => pos.id === node.id)?.position || node.position,
      }))
    );

    fitView({ padding: 0.1 }); // Dynamically fit the view
  }, [containerWidth, containerHeight, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={initialEdges}
      nodesDraggable={false}
      panOnDrag={false}
      zoomOnScroll={false}
    />
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Flow containerWidth={containerSize.width} containerHeight={containerSize.height} />
      </ReactFlowProvider>
    </div>
  );
}