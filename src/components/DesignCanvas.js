import React, { useState, useRef } from "react";
import { Stage, Layer, Text, Line, Transformer } from "react-konva";
import html2canvas from "html2canvas";
import Button from "./ui/Button";

const gridSize = 20;

const DesignCanvas = () => {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const transformerRef = useRef(null);

  // Handle selection
  const handleSelection = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? [] : [id]));
  };

  // Add text to canvas
  const addText = () => {
    setItems([
      ...items,
      {
        type: "text",
        text: "Your Text Here",
        x: 50,
        y: 50,
        color: "black",
        fontSize: 20,
        fontStyle: "normal",
        id: items.length,
      },
    ]);
  };

  // Export design as an image
  const exportDesign = async () => {
    const canvas = document.querySelector("canvas");
    const snapshot = await html2canvas(canvas);
    const link = document.createElement("a");
    link.href = snapshot.toDataURL("image/png");
    link.download = "design.png";
    link.click();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold text-black">Design Your Apparel</h3>
      
      <Stage
        width={400}
        height={400}
        className="border border-gray-500 mt-4"
        onMouseDown={() => setSelectedIds([])}
      >
        <Layer>
          {/* Grid Overlay */}
          {[...Array(20)].map((_, i) => (
            <Line
              key={`v-${i}`}
              points={[i * gridSize, 0, i * gridSize, 400]}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <Line
              key={`h-${i}`}
              points={[0, i * gridSize, 400, i * gridSize]}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))}

          {/* Render text items */}
          {items.map((item) => (
            <Text
              key={item.id}
              text={item.text}
              x={item.x}
              y={item.y}
              fill={item.color}
              fontSize={item.fontSize}
              fontStyle={item.fontStyle}
              draggable
              onClick={() => handleSelection(item.id)}
            />
          ))}

          {/* Transformer for selected item */}
          {selectedIds.length > 0 && (
            <Transformer ref={transformerRef} />
          )}
        </Layer>
      </Stage>

      <div className="mt-4 space-x-2">
        <Button onClick={addText} className="bg-blue-600 text-white">Add Text</Button>
        <Button onClick={exportDesign} className="bg-green-600 text-white">Export Design</Button>
      </div>
    </div>
  );
};

export default DesignCanvas;
