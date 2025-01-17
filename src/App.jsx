import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import './index.css';
function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <SearchBar setSelectedImage={setSelectedImage} />
    </>
  );
}

export default App;

