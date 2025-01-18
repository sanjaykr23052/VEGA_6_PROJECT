// import React, { useState, useRef, useEffect } from 'react';
// import { Stage, Layer, Image as KonvaImage, Text, Rect, Circle, Transformer } from 'react-konva';

// function ShowModal({ imageURL, onClose }) {
//   const [konvaImage, setKonvaImage] = useState(null);
//   const [elements, setElements] = useState([]);
//   const [selectedElementId, setSelectedElementId] = useState(null);
//   const stageRef = useRef();

//   // Load the image when `imageURL` changes
//   useEffect(() => {
//     if (imageURL) {
//       const img = new window.Image();
//       img.src = imageURL;
//       img.crossOrigin = 'anonymous';
//       img.onload = () => setKonvaImage(img);
//     }
//   }, [imageURL]);

//   const addText = () => {
//     setElements([
//       ...elements,
//       {
//         type: 'text',
//         id: `text-${elements.length}`,
//         text: 'Edit Me!',
//         x: 50,
//         y: 50,
//         fontSize: 24,
//         draggable: true,
//       },
//     ]);
//   };

//   const addRectangle = () => {
//     setElements([
//       ...elements,
//       {
//         type: 'rect',
//         id: `rect-${elements.length}`,
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 50,
//         fill: 'red',
//         draggable: true,
//       },
//     ]);
//   };

//   const addCircle = () => {
//     setElements([
//       ...elements,
//       {
//         type: 'circle',
//         id: `circle-${elements.length}`,
//         x: 200,
//         y: 200,
//         radius: 50,
//         fill: 'blue',
//         draggable: true,
//       },
//     ]);
//   };

//   const handleTransformEnd = (id, newAttrs) => {
//     setElements((prev) =>
//       prev.map((el) => (el.id === id ? { ...el, ...newAttrs } : el))
//     );
//   };

//   const handleSelect = (id) => {
//     setSelectedElementId(id);
//   };

//   const downloadImage = () => {
//     const uri = stageRef.current.toDataURL();
//     const link = document.createElement('a');
//     link.download = 'updated-image.png';
//     link.href = uri;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
//       <div className="bg-white rounded-md p-4 relative">
//         <button className="absolute top-0 right-0 m-4 text-white" onClick={onClose}>
//           Close
//         </button>
//         <div className="flex mb-4">
//           <button onClick={addText} className="mr-2 bg-blue-500 text-white p-2 rounded">
//             Add Text
//           </button>
//           <button onClick={addRectangle} className="mr-2 bg-green-500 text-white p-2 rounded">
//             Add Rectangle
//           </button>
//           <button onClick={addCircle} className="mr-2 bg-red-500 text-white p-2 rounded">
//             Add Circle
//           </button>
//           <button onClick={downloadImage} className="mr-2 bg-purple-500 text-white p-2 rounded">
//             Download Image
//           </button>
//         </div>

//         <Stage
//           width={800}
//           height={600}
//           ref={stageRef}
//           onClick={() => setSelectedElementId(null)}
//           onTap={() => setSelectedElementId(null)}
//         >
//           <Layer>
//             {konvaImage && (
//               <KonvaImage
//                 image={konvaImage}
//                 width={konvaImage.width}
//                 height={konvaImage.height}
//               />
//             )}
//             {elements.map((element) => {
//               if (element.type === 'text') {
//                 return (
//                   <Text
//                     key={element.id}
//                     text={element.text}
//                     x={element.x}
//                     y={element.y}
//                     fontSize={element.fontSize}
//                     draggable={element.draggable}
//                     onClick={() => handleSelect(element.id)}
//                     onTap={() => handleSelect(element.id)}
//                   />
//                 );
//               } else if (element.type === 'rect' || element.type === 'circle') {
//                 return (
//                   <React.Fragment key={element.id}>
//                     {element.type === 'rect' ? (
//                       <Rect
//                         x={element.x}
//                         y={element.y}
//                         width={element.width}
//                         height={element.height}
//                         fill={element.fill}
//                         draggable={element.draggable}
//                         onTransformEnd={(newAttrs) => handleTransformEnd(element.id, newAttrs)}
//                         onClick={() => handleSelect(element.id)}
//                         onTap={() => handleSelect(element.id)}
//                       />
//                     ) : (
//                       <Circle
//                         x={element.x}
//                         y={element.y}
//                         radius={element.radius}
//                         fill={element.fill}
//                         draggable={element.draggable}
//                         onTransformEnd={(newAttrs) => handleTransformEnd(element.id, newAttrs)}
//                         onClick={() => handleSelect(element.id)}
//                         onTap={() => handleSelect(element.id)}
//                       />
//                     )}
//                     {selectedElementId === element.id && (
//                       <Transformer
//                         boundBoxFunc={(oldBox, newBox) => {
//                           if (newBox.width < 5 || newBox.height < 5) {
//                             return oldBox;
//                           }
//                           return newBox;
//                         }}
//                       />
//                     )}
//                   </React.Fragment>
//                 );
//               }
//               return null;
//             })}
//           </Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// }

// export default ShowModal;
