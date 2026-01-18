import { Handle } from 'reactflow';

export const BaseNode = ({ title, handles = [], children }) => {
  return (
    <div
      style={{
        width: 200,
        height: 80,
        border: '1px solid black',
        boxSizing: 'border-box',
        padding: 4,
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div>
        <span>{title}</span>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};
