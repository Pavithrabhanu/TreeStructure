// src/utils/api.js
import { API_URL, getLeafApiUrl } from './constants';

export const fetchTreeData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch tree data:', error);
    return [];
  }
};

export const fetchAdditionalData = async (nodeId) => {
  const url = getLeafApiUrl(nodeId);
  console.log(`Fetching additional data from URL: ${url}`); // Debugging log
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      console.warn(`Data not found for nodeId: ${nodeId}`); // Debugging log
      return null; // Return null if data not found
    }
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(`Fetched additional data for nodeId: ${nodeId}`, data); // Debugging log
    return data;
  } catch (error) {
    console.error('Failed to fetch additional data:', error);
    return null;
  }
};
