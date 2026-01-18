import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ConcatNode = ({ id }) => {
  return (
    <BaseNode
      title="Concat"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-a`,
          style: { top: '30%' },
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-b`,
          style: { top: '60%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-out`,
        },
      ]}
    >
      <span>Concatenates two inputs</span>
    </BaseNode>
  );
};
