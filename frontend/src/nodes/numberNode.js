import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || 0);

  return (
    <BaseNode
      title="Number"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-number`,
        },
      ]}
    >
      <label>
        Value:
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
