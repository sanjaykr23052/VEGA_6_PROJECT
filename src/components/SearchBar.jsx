import React, { useState, useRef } from 'react';
import '../index.css';
import { Stage, Layer, Image as KonvaImage, Text, Rect, Circle, Transformer } from 'react-konva';

function SearchBar({ setSelectedImage }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [konvaImage, setKonvaImage] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const stageRef = useRef();

  const fetchImages = async () => {
    const API_KEY = '48287163-8a84ac5f73e96fb481b7cb09f';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data.hits);
      setError('');
    } catch (error) {
      setError('Error fetching images: ' + error.message);
      setResults([]);
    }
  };

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'updated-image.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchImages();
    }
  };

  const openModal = (imageURL) => {
    setShowModal(true);
    setSelectedImage(imageURL);

    const img = new window.Image();
    img.src = imageURL;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setKonvaImage(img);
    };
  };

  const closeModal = () => {
    setShowModal(false);
    setKonvaImage(null);
    setElements([]);
  };

  const addText = () => {
    setElements([
      ...elements,
      {
        type: 'text',
        id: `text-${elements.length}`,
        text: 'Edit Me!',
        x: 50,
        y: 50,
        fontSize: 24,
        draggable: true,
        isEditing: false,
      },
    ]);
  };

  const addRectangle = () => {
    setElements([
      ...elements,
      {
        type: 'rect',
        id: `rect-${elements.length}`,
        x: 100,
        y: 100,
        width: 100,
        height: 50,
        fill: 'red',
        draggable: true,
      },
    ]);
  };

  const addCircle = () => {
    setElements([
      ...elements,
      {
        type: 'circle',
        id: `circle-${elements.length}`,
        x: 200,
        y: 200,
        radius: 50,
        fill: 'blue',
        draggable: true,
      },
    ]);
  };

  const handleTransformEnd = (id, newAttrs) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...newAttrs } : el))
    );
  };

  const handleTextDblClick = (id) => {
    const element = elements.find((el) => el.id === id);
    if (element.type === 'text') {
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, isEditing: true } : el
      );
      setElements(updatedElements);
    }
  };

  const handleTextEdit = (id, newText) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, text: newText, isEditing: false } : el
    );
    setElements(updatedElements);
  };

  const handleSelect = (id) => {
    setSelectedElementId(id);
  };

  return (
    <nav className="bg-gray-800 w-full fixed top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://vega6.com/assets/images/logo%201.png"
            alt="Vega 6 Logo"
            className="h-8 mr-4"
          />
          <h1 className="text-2xl font-bold text-white mr-8">Project By Sanjay Kumar</h1>
          <div className="flex items-center">
            <input
              type="text"
              className="bg-gray-700 text-white rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700"
              placeholder="Search for images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md ml-4"
              onClick={fetchImages}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 p-2">{error}</div>}
      <div className="results overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 h-[calc(100vh-16rem)]">
        {results.map((image) => (
          <div
            key={image.id}
            className="image-item relative group"
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <img
              src={image.webformatURL}
              alt={image.tags}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out rounded-md"
              onClick={() => openModal(image.webformatURL)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Add Captions</span>
              </div>
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-white rounded-md p-4 relative">
            <button
              className="absolute top-0 right-0 m-4 text-white"
              onClick={closeModal}
            >
              Close
            </button>
            <div className="flex mb-4">
              <button onClick={addText} className="mr-2 bg-blue-500 text-white p-2 rounded">
                Add Text
              </button>
              <button onClick={addRectangle} className="mr-2 bg-green-500 text-white p-2 rounded">
                Add Rectangle
              </button>
              <button onClick={addCircle} className="mr-2 bg-red-500 text-white p-2 rounded">
                Add Circle
              </button>
              <button
                onClick={downloadImage}
                className="mr-2 bg-purple-500 text-white p-2 rounded"
              >
                Download Image
              </button>
            </div>

            <Stage
              width={800}
              height={600}
              ref={stageRef}
              onClick={() => setSelectedElementId(null)}
              onTap={() => setSelectedElementId(null)}
            >
              <Layer>
                {konvaImage && (
                  <KonvaImage
                    image={konvaImage}
                    width={konvaImage.width}
                    height={konvaImage.height}
                  />
                )}
                {elements.map((element) => {
                  if (element.type === 'text') {
                    return (
                      <Text
                        key={element.id}
                        text={element.text}
                        x={element.x}
                        y={element.y}
                        fontSize={element.fontSize}
                        draggable={element.draggable}
                        onDblClick={() => handleTextDblClick(element.id)}
                        onClick={() => handleSelect(element.id)}
                        onTap={() => handleSelect(element.id)}
                      />
                    );
                  } else if (element.type === 'rect' || element.type === 'circle') {
                    return (
                      <React.Fragment key={element.id}>
                        {element.type === 'rect' ? (
                          <Rect
                            x={element.x}
                            y={element.y}
                            width={element.width}
                            height={element.height}
                            fill={element.fill}
                            draggable={element.draggable}
                            onTransformEnd={(newAttrs) => handleTransformEnd(element.id, newAttrs)}
                            onClick={() => handleSelect(element.id)}
                            onTap={() => handleSelect(element.id)}
                          />
                        ) : (
                          <Circle
                            x={element.x}
                            y={element.y}
                            radius={element.radius}
                            fill={element.fill}
                            draggable={element.draggable}
                            onTransformEnd={(newAttrs) => handleTransformEnd(element.id, newAttrs)}
                            onClick={() => handleSelect(element.id)}
                            onTap={() => handleSelect(element.id)}
                          />
                        )}
                        {selectedElementId === element.id && (
                          <Transformer
                            boundBoxFunc={(oldBox, newBox) => {
                              if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                              }
                              return newBox;
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      )}
    </nav>
  );
}

export default SearchBar;
