// src/components/ParentNode.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

const ParentNode = ({ items, onClick }) => {
  // State to manage which nodes are highlighted in each tree structure
  const [highlightedNodeIdMap, setHighlightedNodeIdMap] = useState({});
  // State to manage the list of all highlighted nodes
  const [highlightedNodes, setHighlightedNodes] = useState([]);

  // Handler for node click events
  const handleNodeClick = (id, isOpen, treeId) => {
    onClick(id, isOpen);
    // Update the highlighted node ID map for the specific tree
    setHighlightedNodeIdMap((prevMap) => ({
      ...prevMap,
      [treeId]: id,
    }));
  };

  // Handler for highlight events
  const handleHighlight = (nodeId, isHighlighted) => {
    setHighlightedNodes((prev) => {
      if (isHighlighted) {
        return [...prev, nodeId]; // Add node ID to highlighted nodes
      } else {
        return prev.filter((id) => id !== nodeId); // Remove node ID from highlighted nodes
      }
    });
  };

  return (
    <div className="parent-node-container">
      {items.map((item) => (
        <TreeNode
          key={item.id}
          node={item}
          highlightedNodes={highlightedNodes}
          highlightedNodeId={highlightedNodeIdMap[item.id]}
          onClick={(id, isOpen) => handleNodeClick(id, isOpen, item.id)}
          onHighlight={(id) => handleHighlight(id, item.id)}
        />
      ))}
    </div>
  );
};

ParentNode.propTypes = {
  // Prop types for the items and onClick function
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      children: PropTypes.array,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ParentNode;
