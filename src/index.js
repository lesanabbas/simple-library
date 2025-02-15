// src/index.js

// Import styles
import './styles/main.scss';

// Export button and input components globally
const SimpleLibrary = {};

// Button component
SimpleLibrary.Button = function Button() {
  return `<button class="btn">Click Me</button>`;
};

// Input Box component
SimpleLibrary.InputBox = function InputBox() {
  return `<input type="text" class="input-box" placeholder="Enter text here..." />`;
};

// Expose SimpleLibrary globally (so it can be accessed via 'SimpleLibrary' in other projects)
if (typeof window !== 'undefined') {
  window.SimpleLibrary = SimpleLibrary;
}

export default SimpleLibrary;
