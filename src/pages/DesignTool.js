import React, { useState } from "react";
import { Stage, Layer, Text, Line, Transformer } from "react-konva";
import html2canvas from "html2canvas";
import Button from "./Button"; // Ensure this is correctly linked to your Button component

const DesignTool = () => {
  const [text, setText] = useState("Your Design Here");
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(20);
  const [fontStyle, setFontStyle] = useState("normal");
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [templates, setTemplates] = useState([]);
  const gridSize = 20;

  const handleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const addText = () => {
    setItems([
      ...items,
      {
        type: "text",
        text,
        x: 50,
        y: 50,
        color,
        fontSize,
        fontStyle,
        locked: false,
        id: items.length,
      },
    ]);
  };

  const saveTemplate = async () => {
    const canvas = document.querySelector("canvas");
    const snapshot = await html2canvas(canvas);
    const imageData = snapshot.toDataURL("image/png");
    setTemplates([...templates, { id: templates.length, design: [...items], preview: imageData }]);
  };

  const loadTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setItems([...template.design]);
    }
  };

  const exportDesign = () => {
    const canvas = document.querySelector("canvas");
    html2canvas(canvas).then((snapshot) => {
      const link = document.createElement("a");
      link.href = snapshot.toDataURL("image/png");
      link.download = "design.png";
      link.click();
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-black text-center mb-4">
        Customize Your Design
      </h2>

      {/* Control Panel */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-500 px-2 py-1 rounded"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10"
        />
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="border border-gray-500 px-2 py-1 rounded"
        >
          {[20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
        <Button onClick={addText}>Add Text</Button>
      </div>

      {/* Design Area */}
      <div className="flex justify-center">
        <Stage
          width={400}
          height={400}
          className="border border-gray-500"
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

            {items.map((item) =>
              item.type === "text" ? (
                <Text
                  key={item.id}
                  text={item.text}
                  x={item.x}
                  y={item.y}
                  fill={item.color}
                  fontSize={item.fontSize}
                  fontStyle={item.fontStyle}
                  draggable={!item.locked}
                  onClick={() => handleSelection(item.id)}
                />
              ) : null
            )}

            {selectedIds.length > 0 && (
              <Transformer
                nodes={items.filter((item) => selectedIds.includes(item.id)).map((item) => item.ref)}
              />
            )}
          </Layer>
        </Stage>
      </div>

      {/* Buttons for Saving & Exporting */}
      <div className="mt-4 text-center">
        <Button onClick={saveTemplate} className="ml-2 bg-gray-700 text-white px-4 py-2">
          Save Template
        </Button>
        {templates.map((template) => (
          <div key={template.id} className="inline-block m-2">
            <img src={template.preview} alt={`Template ${template.id + 1}`} className="w-20 h-20 border" />
            <Button onClick={() => loadTemplate(template.id)}>Load</Button>
          </div>
        ))}
        <Button onClick={exportDesign} className="ml-2 bg-gray-700 text-white px-4 py-2">
          Export Design
        </Button>
      </div>
    </div>
  );
};

export default DesignTool;
