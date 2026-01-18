import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delay || 1000);

  return (
    <BaseNode
      title="Delay"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-in`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-out`,
        },
      ]}
    >
      <label>
        Delay (ms):
        <input
          type="number"
          value={delayMs}
          onChange={(e) => setDelayMs(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
