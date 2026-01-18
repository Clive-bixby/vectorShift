// textNode.js

import { useState, useEffect, useMemo, useRef } from 'react';
import { Position,  useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;


export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const textareaRef = useRef(null);
  //
  const updateNodeInternals = useUpdateNodeInternals();

 
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.width = "auto";

    el.style.height = `${el.scrollHeight}px`;
    el.style.width = `${Math.min(el.scrollWidth, 400)}px`;
  }, [text]);

 
  const variables = useMemo(() => {
    const matches = [...text.matchAll(VARIABLE_REGEX)];
    return Array.from(new Set(matches.map((m) => m[1])));
  }, [text]);


  const handles = useMemo(() => {
    const spacing = Math.min(20, Math.max(12, 80 / variables.length));
    const inputHandles = variables.map((variable, index) => ({
      id: `var-${variable}`,
      type: 'target',
      position: Position.Left,
      label: variable,
      style: {
        top:`${40 + index * spacing}px`,
        
      },
    }));

    
    const outputHandle = {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
    };

    return [...inputHandles, outputHandle];
  }, [variables, id]);

  //

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, id, updateNodeInternals]);


  return (
    <BaseNode title="Text" handles={handles}>
      <textarea
        ref={textareaRef}
        value={text}
        placeholder="Type here. Use {{variable}} to create inputs."
        onChange={(e) => setText(e.target.value)}
        className="nodrag"
        style={{
          resize: "none",
          overflow: "hidden",
          minWidth: 120,
          minHeight: 30,
          
        }}
      />
    </BaseNode>
  );
};