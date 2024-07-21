// src/components/TreeNode.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchAdditionalData } from '../utils/dynamicApi';

// TreeNode component: Represents a node in the tree structure
const TreeNode = ({ node, highlightedNodes, onClick, onHighlight }) => {
  // State to manage whether the node is open (expanded) or closed (collapsed)
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the visibility of additional data for leaf nodes
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  // State to store the fetched additional data
  const [additionalData, setAdditionalData] = useState(null);
  // State to manage any errors while fetching additional data
  const [dataError, setDataError] = useState(false);

  // Function to handle toggle actions (expand/collapse or fetch/show additional data)
  const handleToggle = async () => {
    if (node.children) {
      // If the node has children, toggle its open state
      const newOpenState = !isOpen;
      setIsOpen(newOpenState);
      onClick(node.id, newOpenState); // Notify parent about the toggle
    } else {
      // If the node is a leaf, fetch and show additional data
      if (!showAdditionalData) {
        try {
          const data = await fetchAdditionalData(node.id);
          setAdditionalData(data || null);
          setDataError(!data); // Set error state if data is not fetched
        } catch {
          setAdditionalData(null);
          setDataError(true);
        }
      }
      setShowAdditionalData(!showAdditionalData);
    }

    // Highlight the current node
    const isCurrentlyHighlighted = highlightedNodes.includes(node.id);
    onHighlight(node.id, !isCurrentlyHighlighted);
  };

  // Determine if the node or any of its children are highlighted
  const isHighlighted = highlightedNodes.includes(node.id) || node.children?.some(child => highlightedNodes.includes(child.id));

  return (
    <div className={`tree-node ${isHighlighted ? 'highlighted' : ''}`}>
      <div
        className={`node-label ${node.children ? 'parent-node' : 'leaf-node'} ${isOpen ? 'text-highlight' : ''}`}
        onClick={handleToggle}
      >
        {node.children && <span className="toggle-icon">{isOpen ? '[-]' : '[+]'}</span>}
        <span className="node-label-text">{node.label}</span>
      </div>
      {node.children && isOpen && (
        <div className={`children ${isOpen ? 'text-highlight' : ''}`}>
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              highlightedNodes={highlightedNodes}
              onClick={onClick}
              onHighlight={onHighlight}
            />
          ))}
        </div>
      )}
      {!node.children && showAdditionalData && (
        <div className="additional-data">
          {dataError ? <p>No data available</p> : <div className="description">{additionalData?.description || 'No description available'}</div>}
        </div>
      )}
    </div>
  );
};

// PropTypes validation to ensure the correct prop types are passed to the component
TreeNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array,
  }).isRequired,
  highlightedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  onHighlight: PropTypes.func.isRequired,
};

export default TreeNode;
