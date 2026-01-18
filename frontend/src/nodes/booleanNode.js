import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const BooleanNode = ({ id, data }) => {
  const [enabled, setEnabled] = useState(data?.enabled ?? false);

  return (
    <BaseNode
      title="Boolean"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-bool`,
        },
      ]}
    >
      <label>
        Enabled:
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
      </label>
    </BaseNode>
  );
};
