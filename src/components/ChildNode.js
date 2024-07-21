// src/components/ChildNode.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ChildNode = ({ node, highlightedNodeId, onNodeClick, onLeafClick, onHighlight }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle click on a node (expand/collapse)
  const handleNodeClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to parent elements
    if (node.children) {
      setIsOpen(prevState => {
        const newState = !prevState;
        onNodeClick(node.id, newState);
        return newState;
      });
    }
    onHighlight(node.id);
  };

  // Handle click on a leaf node (fetch additional data)
  const handleLeafClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to parent elements
    if (!node.children) {
      onLeafClick(node.id);
      onHighlight(node.id);
    }
  };

  // Determine if the current node is highlighted
  const isHighlighted = highlightedNodeId && (node.id === highlightedNodeId || node.children?.some(child => child.id === highlightedNodeId));

  return (
    <div>
      <div
        onClick={handleNodeClick}
        style={{
          cursor: node.children ? 'pointer' : 'default',
          backgroundColor: isHighlighted ? 'lightblue' : 'white',
          padding: '5px',
          userSelect: 'none' // Prevent text selection on click
        }}
      >
        {node.children && (isOpen ? '[-] ' : '[+] ')}
        <span onClick={handleLeafClick}>{node.label}</span>
      </div>
      {node.children && isOpen && (
        <ul style={{ paddingLeft: '20px' }}>
          {node.children.map(child => (
            <ChildNode
              key={child.id}
              node={child}
              highlightedNodeId={highlightedNodeId}
              onNodeClick={onNodeClick}
              onLeafClick={onLeafClick}
              onHighlight={onHighlight}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

ChildNode.propTypes = {
  node: PropTypes.object.isRequired,
  highlightedNodeId: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  onLeafClick: PropTypes.func.isRequired,
  onHighlight: PropTypes.func.isRequired,
};

export default ChildNode;
