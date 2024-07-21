import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/actions';
import PropTypes from 'prop-types';

const ThemeToggle = () => {
  // Access the Redux dispatch function to dispatch actions
  const dispatch = useDispatch();
  
  // Access the current theme from the Redux store
  const theme = useSelector(state => state.theme);

  // Effect to apply the current theme to the document body class when the theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]); // Depend on theme to reapply class on theme change

  // Handler for toggling the theme between 'light' and 'dark'
  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme)); // Dispatch action to update theme in Redux store
  };

  return (
    <div className='toggle-button'>
      <label className="switch">
        {/* Checkbox input for toggling the theme */}
        <input
          type="checkbox"
          checked={theme === 'dark'} // Check if the current theme is 'dark'
          onChange={handleToggle} // Toggle theme on change
        />
        {/* Slider component for visual representation of the toggle switch */}
        <span className="slider round"></span>
      </label>
    </div>
  );
};

// Prop types for ThemeToggle component
ThemeToggle.propTypes = {
  theme: PropTypes.string,
};

export default ThemeToggle;
