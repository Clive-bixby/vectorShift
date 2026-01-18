import { Handle } from 'reactflow';

export const BaseNode = ({ title, handles = [], children }) => {
  return (
    <div
      style={{
        width: 220,
        minHeight: 100,
        background: 'var(--bg-node)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: '12px 14px',
        boxSizing: 'border-box',
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            background: '#6366f1',
            width: 8,
            height: 8,
            border: '2px solid white',
            ...handle.style,
          }}
        />
      ))}

      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 6,
        }}
      >
        <span>{title}</span>
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
};
