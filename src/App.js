import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CarModel from './components/CarModel';
import Chatbot from './components/Chatbot';
import { HexColorPicker } from 'react-colorful';
import { FaPalette, FaTools, FaGlassMartiniAlt, FaBrush } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [carColor, setCarColor] = useState(''); // Default color

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleColorChange = (newColor) => {
    setCarColor(newColor);
    setShowColorPicker(false); // Close color picker after selecting color
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="model-container">
          <div className='car-heading'>
            <h1>Bharat Car Crafter</h1>

          </div>
          <div className="dropdown-container">
            <label htmlFor="model-select">Choose a model: </label>
            <select id="model-select" value={selectedModel} onChange={handleModelChange}>
              <option value="">--Please choose a model--</option>
              <option value="/model/tata_punch.glb">Tata Punch</option>
              <option value="/model/tata_nano.glb">Tata Nano</option>
              <option value="/model/brezza.glb">Tata Harrier</option>
              <option value="/model/swift.glb">Tata Altroz</option>
              {/* Add more options here */}
            </select>
          </div>
          {selectedModel && (
            <Canvas>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={1.9} />
              <CarModel modelPath={selectedModel} carColor={carColor} />
              <OrbitControls />
            </Canvas>
          )}
          {showColorPicker && (
            <div className="color-picker">
              <HexColorPicker color={carColor} onChange={handleColorChange} />
            </div>
          )}
        </div>
        <div className="chatbot-container">
          <Chatbot />
        </div>
      </div>
      <div className="customization-buttons">
        <button onClick={() => setShowColorPicker(!showColorPicker)}>
          <FaPalette /> Color
        </button>
        <button>
          <FaTools /> Accessories
        </button>
        <button>
          <FaGlassMartiniAlt /> Glass Type
        </button>
        <button>
          <FaBrush /> Detailing
        </button>
      </div>
    </div>
  );
};

export default App;





// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import CarModel from './components/CarModel';
// import Chatbot from './components/Chatbot';
// import './App.css';

// const App = () => {
//   const [selectedModel, setSelectedModel] = useState('');

//   const handleModelChange = (event) => {
//     setSelectedModel(event.target.value);
//   };

//   return (
//     <div className="app-container">
     
//       <div className="content-container">
//         <div className="model-container">
//         <div className="dropdown-container">
//         <label htmlFor="model-select">Choose a model: </label>
//         <select id="model-select" value={selectedModel} onChange={handleModelChange}>
//           <option value="">--Please choose a model--</option>
//           <option value="/model/tata_punch.glb">Tata Punch</option>
//           <option value="/model/tata_nano.glb">Tata Nano</option>
//           <option value="/model/brezza.glb">Tata Harrier</option>
//           <option value="/model/swift.glb">Tata Altroz</option>
//           {/* Add more options here */}
//         </select>
//       </div>
//           {selectedModel && (
//             <Canvas>
              
//               <ambientLight intensity={1.3} />
//               <directionalLight position={[10, 10, 5]} intensity={2.9} />
//               <CarModel modelPath={selectedModel} />
//               <OrbitControls />
//             </Canvas>
//           )}
//         </div>
//         <div className="chatbot-container">
//           <Chatbot />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
