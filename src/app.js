import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from './components/ui/button';
import { Stage, Layer, Text, Line, Transformer } from "react-konva";
import useImage from "use-image";
import html2canvas from "html2canvas";

function Home() {
  const [text, setText] = useState("Your Design Here");
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(20);
  const [fontStyle, setFontStyle] = useState("normal");
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [templates, setTemplates] = useState([]);
  const gridSize = 20;

  // Handle Selection of Items
  const handleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const saveToHistory = (newItems) => {
    setItems(newItems);
  };

  const addText = () => {
    saveToHistory([
      ...items,
      { type: "text", text, x: 50, y: 50, color, fontSize, fontStyle, locked: false, id: items.length, layer: items.length },
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
    <div className="bg-tan min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-700 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Ink N Threadworks</h1>
        <div>
          <Button variant="ghost" className="text-white">Products</Button>
          <Button variant="ghost" className="text-white">Design Tool</Button>
          <Button variant="ghost" className="text-white">Track Order</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 bg-white">
        <h2 className="text-4xl font-bold text-black">Create Custom Apparel with Ease</h2>
        <p className="text-gray-700 mt-2">Upload your design, customize, and place your order in minutes!</p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Button className="bg-gray-700 text-white px-6 py-3 rounded-lg">Start Designing</Button>
        </motion.div>
      </header>

      {/* Design Tool */}
      <section className="p-6">
        <h3 className="text-2xl font-semibold text-black">Design Your Apparel</h3>
        <div className="bg-white p-4 shadow-md rounded-lg mt-4">
          <Stage width={400} height={400} className="border border-gray-500" onMouseDown={() => setSelectedIds([])}>
            <Layer>
              {/* Grid Overlay */}
              {[...Array(20)].map((_, i) => (
                <Line key={`v-${i}`} points={[i * gridSize, 0, i * gridSize, 400]} stroke="#bbb" strokeWidth={0.5} />
              ))}
              {[...Array(20)].map((_, i) => (
                <Line key={`h-${i}`} points={[0, i * gridSize, 400, i * gridSize]} stroke="#bbb" strokeWidth={0.5} />
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
                <Transformer nodes={items.filter((item) => selectedIds.includes(item.id)).map((item) => item.ref).filter(Boolean)} />
              )}
            </Layer>
          </Stage>

          <div className="mt-4">
            <Button onClick={saveTemplate} className="ml-2 bg-gray-700 text-white px-4 py-2">Save Template</Button>
            {templates.map((template) => (
              <div key={template.id} className="inline-block m-2">
                <img src={template.preview} alt={`Template ${template.id + 1}`} className="w-20 h-20 border" />
                <Button onClick={() => loadTemplate(template.id)} className="block mt-1 bg-gray-700 text-white px-4 py-2">Load</Button>
              </div>
            ))}
            <Button onClick={exportDesign} className="ml-2 bg-gray-700 text-white px-4 py-2">Export Design</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 text-white text-center p-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Ink N Threadworks - All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/Ink-N-Thread">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
