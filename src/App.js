import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ParentNode from './components/ParentNode';
import ThemeToggle from './components/ThemeToggle';
import { fetchTreeData, fetchAdditionalData } from './utils/dynamicApi';
import { setTreeData, setAdditionalData, setHighlightedNodes } from './redux/actions';
import './App.css';
import './ThemeToggle.css';
import './TreeMenu.css';

const App = () => {
  // Use dispatch to send actions to the Redux store
  const dispatch = useDispatch();
  
  // Access tree data, additional data, highlighted nodes, and current theme from the Redux store
  const treeData = useSelector((state) => state.treeData);
  const additionalData = useSelector((state) => state.additionalData);
  const highlightedNodes = useSelector((state) => state.highlightedNodes);
  const theme = useSelector((state) => state.theme);

  // Effect to load tree data when the component mounts
  useEffect(() => {
    const loadTreeData = async () => {
      // Fetch tree data from API and update Redux store
      const data = await fetchTreeData();
      dispatch(setTreeData(data));
    };

    loadTreeData();
  }, [dispatch]); // Depend on dispatch to ensure effect runs only once on mount

  // Handler for node click events
  const handleNodeClick = (nodeId, isOpening) => {
    const newHighlightedNodes = new Set(highlightedNodes);

    // Add or remove nodes from highlighted nodes based on whether the node is opening or closing
    if (isOpening) {
      addToHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    } else {
      removeFromHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    }
    // Update the Redux store with the new list of highlighted nodes
    dispatch(setHighlightedNodes([...newHighlightedNodes]));
  };

  // Function to add nodes and their children to the highlighted set
  const addToHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
    const traverse = (node) => {
      if (node.id === targetNodeId) {
        highlightedSet.add(node.id);
        if (node.children) {
          node.children.forEach((child) => {
            highlightedSet.add(child.id);
            traverse(child);
          });
        }
      } else if (node.children) {
        node.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
  };

  // Function to remove nodes and their children from the highlighted set
  const removeFromHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
    const traverse = (node) => {
      if (node.id === targetNodeId) {
        highlightedSet.delete(node.id);
        if (node.children) {
          node.children.forEach((child) => {
            highlightedSet.delete(child.id);
            traverse(child);
          });
        }
      } else if (node.children) {
        node.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
  };

  // Handler for leaf node click events to fetch additional data
  const handleLeafClick = async (nodeId) => {
    try {
      const data = await fetchAdditionalData(nodeId);
      dispatch(setAdditionalData(data));
    } catch (error) {
      dispatch(setAdditionalData(null)); // Set additional data to null on error
    }
  };

  return (
    <div className={`App ${theme}`}>
      {/* Render the theme toggle button */}
      <ThemeToggle />
      <div className='main-container-parent'>
        <h1>Dynamic Tree Structure</h1>
        {/* Render the ParentNode component with current tree data and handlers */}
        <ParentNode
          items={treeData}
          highlightedNodes={highlightedNodes}
          onClick={handleNodeClick}
        />
      </div>
      <div className="additional-data-container">
        {/* Display additional data if available */}
        {additionalData ? (
          <div className="additional-data">
            <h2>Additional Data:</h2>
            <div className="description">{additionalData.description || 'No description available'}</div>
          </div>
        ) : (
          <p>No additional data or node not clicked.</p>
        )}
      </div>
    </div>
  );
};

export default App;
