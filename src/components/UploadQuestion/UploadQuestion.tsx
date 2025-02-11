// import { useState, useRef } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [content, setContent] = useState("");
//   const editorRef = useRef<HTMLDivElement>(null);
//   const selectionRef = useRef<Range | null>(null);

//   // Save cursor position
//   const saveSelection = () => {
//     const selection = window.getSelection();
//     if (selection && selection.rangeCount > 0) {
//       selectionRef.current = selection.getRangeAt(0);
//     }
//   };

//   // Restore cursor position
//   const restoreSelection = () => {
//     const selection = window.getSelection();
//     if (selection && selectionRef.current) {
//       selection.removeAllRanges();
//       selection.addRange(selectionRef.current);
//     }
//   };

//   const insertElement = (html: string) => {
//     if (!editorRef.current) return;

//     restoreSelection(); //
//   const selection = window.getSelection();
//   if (!selection || selection.rangeCount === 0) return;

//   const range = selection.getRangeAt(0);
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;

//   const fragment = document.createDocumentFragment();
//   let lastNode: Node | null = null;

//   while (tempDiv.firstChild) {
//     lastNode = fragment.appendChild(tempDiv.firstChild);
//   }

//   range.deleteContents();
//   range.insertNode(fragment);

//   // Ensure cursor appears after inserted content
//   if (lastNode) {
//     range.setStartAfter(lastNode);
//     range.setEndAfter(lastNode);
//     selection.removeAllRanges();
//     selection.addRange(range);
//   }

//   // Update state to reflect new content
//   setContent(editorRef.current?.innerHTML || "");
  
//   // Focus back on the editor to keep the cursor active
//   if (editorRef.current) {
//     editorRef.current.focus();
//   }
// };

// console.log("content",content);


//   const handleCalculatorInput = (value: string) => {
//     console.log("calciInput");
//   };

//   const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
//     setContent(e.currentTarget.innerText);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent new lines
//     }
//   };

//   return (
//     <div className="w-full p-4 bg-white shadow-lg rounded-lg mt-10">
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={() => setShowCalculator(!showCalculator)}
//           className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-fit mx-auto"
//         >
//           {showCalculator ? "Hide Calculator" : "Show Calculator"}
//         </button>
//       </div>
//       {showCalculator && (
//         <div className="mt-4 p-4 border rounded shadow">
//           <CalculatorTabs handleCalculatorInput={handleCalculatorInput} insertElement={insertElement} restoreSelection={restoreSelection} />
//         </div>
//       )}
//       <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         onInput={handleInput}
//         onKeyDown={handleKeyDown}
//         onMouseUp={saveSelection} // Save cursor position when clicking inside editor
//         onKeyUp={saveSelection}   // Save cursor when typing
//         style={{
//           border: "1px solid black",
//           minHeight: "50px",
//           padding: "10px",
//           cursor: "text",
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         }}
//         onFocus={(e) => {
//           if (e.currentTarget.innerText === "") {
//             e.currentTarget.innerHTML = "<br>"; // Keeps cursor visible in empty div
//           }
//         }}
//       >
//       </div>
//       <br />
//     </div>
//   );
// };

// export default QuestionForm;

// import { useState } from "react";
// import { MathJax, MathJaxContext } from "better-react-mathjax";
// import { Dialog, DialogContent, DialogTitle } from "@mui/material";

// const MathRenderer = ({ expression, onClick }: { expression: string; onClick: () => void }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="border px-3 py-2 rounded cursor-pointer hover:bg-gray-100 min-h-[40px] flex items-center"
//     >
//       <MathJaxContext>
//         <MathJax>{`\\(${expression}\\)`}</MathJax>
//       </MathJaxContext>
//     </div>
//   );
// };

// const QuestionForm = () => {
//   const [open, setOpen] = useState(false);
//   const [integralType, setIntegralType] = useState<"single" | "double" | "triple">("single");

//   // Limits
//   const [upperLimitX, setUpperLimitX] = useState("");
//   const [lowerLimitX, setLowerLimitX] = useState("");
//   const [upperLimitY, setUpperLimitY] = useState("");
//   const [lowerLimitY, setLowerLimitY] = useState("");
//   const [upperLimitZ, setUpperLimitZ] = useState("");
//   const [lowerLimitZ, setLowerLimitZ] = useState("");

//   // Function inside integral
//   const [functionExpr, setFunctionExpr] = useState("");
//   const [integrals, setIntegrals] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const openModal = (type: "single" | "double" | "triple", index: number | null = null) => {
//     setIntegralType(type);
//     setOpen(true);

//     if (index !== null) {
//       setEditingIndex(index);

//       // Parse the existing LaTeX string back into limits & function
//       const existingIntegral = integrals[index];

//       const match = existingIntegral.match(
//         /\\int(?:\^({.*?}))?_({.*?})?\s*(.*?)\s*d([xyz])(?:\s*d([yz]))?(?:\s*d(z))?/
//       );

//       if (match) {
//         setLowerLimitX(match[2]?.replace(/[{}]/g, "") || "");
//         setUpperLimitX(match[1]?.replace(/[{}]/g, "") || "");
//         setFunctionExpr(match[3] || "");
        
//         if (match[5]) {
//           setLowerLimitY(match[2]?.replace(/[{}]/g, "") || "");
//           setUpperLimitY(match[1]?.replace(/[{}]/g, "") || "");
//         }
        
//         if (match[6]) {
//           setLowerLimitZ(match[2]?.replace(/[{}]/g, "") || "");
//           setUpperLimitZ(match[1]?.replace(/[{}]/g, "") || "");
//         }
//       }
//     } else {
//       setEditingIndex(null);
//       setUpperLimitX("");
//       setLowerLimitX("");
//       setUpperLimitY("");
//       setLowerLimitY("");
//       setUpperLimitZ("");
//       setLowerLimitZ("");
//       setFunctionExpr("");
//     }
//   };

//   const handleSubmit = () => {
//     let integralLatex = "";

//     if (integralType === "single") {
//       integralLatex = `\\int_{${lowerLimitX}}^{${upperLimitX}} ${functionExpr} \\,dx`;
//     } else if (integralType === "double") {
//       integralLatex = `\\int_{${lowerLimitY}}^{${upperLimitY}} \\int_{${lowerLimitX}}^{${upperLimitX}} ${functionExpr} \\,dx \\,dy`;
//     } else if (integralType === "triple") {
//       integralLatex = `\\iiint_{${lowerLimitZ}}^{${upperLimitZ}} \\int_{${lowerLimitY}}^{${upperLimitY}} \\int_{${lowerLimitX}}^{${upperLimitX}} ${functionExpr} \\,dx \\,dy \\,dz`;
//     }

//     if (editingIndex !== null) {
//       const updatedIntegrals = [...integrals];
//       updatedIntegrals[editingIndex] = integralLatex;
//       setIntegrals(updatedIntegrals);
//     } else {
//       setIntegrals([...integrals, integralLatex]);
//     }

//     setOpen(false);

//     // Reset inputs
//     setUpperLimitX("");
//     setLowerLimitX("");
//     setUpperLimitY("");
//     setLowerLimitY("");
//     setUpperLimitZ("");
//     setLowerLimitZ("");
//     setFunctionExpr("");
//     setEditingIndex(null);
//   };

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-lg w-full">
//       <h2 className="text-xl font-semibold mb-4">Integral Input</h2>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button onClick={() => openModal("single")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           ∫ Single Integral
//         </button>
//         <button onClick={() => openModal("double")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//           ∬ Double Integral
//         </button>
//         <button onClick={() => openModal("triple")} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
//           ∭ Triple Integral
//         </button>
//       </div>

//       {/* Modal for Input */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>{editingIndex !== null ? "Edit Integral" : "Enter Integral Details"}</DialogTitle>
//         <DialogContent>
//           <div className="flex flex-col gap-3">
//             {/* X Limits (Required for all integrals) */}
//             <label>Lower Limit (x):</label>
//             <input type="text" value={lowerLimitX} onChange={(e) => setLowerLimitX(e.target.value)} className="border px-2 py-1 rounded" />
//             <label>Upper Limit (x):</label>
//             <input type="text" value={upperLimitX} onChange={(e) => setUpperLimitX(e.target.value)} className="border px-2 py-1 rounded" />

//             {/* Y Limits (For Double & Triple Integrals) */}
//             {integralType !== "single" && (
//               <>
//                 <label>Lower Limit (y):</label>
//                 <input type="text" value={lowerLimitY} onChange={(e) => setLowerLimitY(e.target.value)} className="border px-2 py-1 rounded" />
//                 <label>Upper Limit (y):</label>
//                 <input type="text" value={upperLimitY} onChange={(e) => setUpperLimitY(e.target.value)} className="border px-2 py-1 rounded" />
//               </>
//             )}

//             {/* Z Limits (Only for Triple Integrals) */}
//             {integralType === "triple" && (
//               <>
//                 <label>Lower Limit (z):</label>
//                 <input type="text" value={lowerLimitZ} onChange={(e) => setLowerLimitZ(e.target.value)} className="border px-2 py-1 rounded" />
//                 <label>Upper Limit (z):</label>
//                 <input type="text" value={upperLimitZ} onChange={(e) => setUpperLimitZ(e.target.value)} className="border px-2 py-1 rounded" />
//               </>
//             )}

//             <label>Function:</label>
//             <input type="text" value={functionExpr} onChange={(e) => setFunctionExpr(e.target.value)} className="border px-2 py-1 rounded" />

//             <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
//               {editingIndex !== null ? "Update" : "Submit"}
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Rendered Integrals */}
//       {/* <div className="mt-6">
//         <h3 className="text-lg font-semibold">Generated Integrals:</h3>
//         {integrals.map((expr, index) => (
//           <MathRenderer key={index} expression={expr} onClick={() => openModal("single", index)} />
//         ))}
//       </div> */}
//       <div className="mt-6">
//   <h3 className="text-lg font-semibold">Generated Integrals:</h3>
//   {integrals.map((expr, index) => (
//     <div
//       key={index}
//       className="relative flex items-center border p-2 rounded w-full mt-2 bg-white"
//       onClick={() => openModal("single", index)}
//     >
//       <MathRenderer expression={expr} onClick={() => openModal("single", index)}/>
//       <input
//         type="text"
//         className="absolute inset-0 opacity-0 cursor-pointer"
//         value={expr}
//         readOnly
//       />
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default QuestionForm;


// import { useState, useRef } from "react";
// import { MathJax, MathJaxContext } from "better-react-mathjax";
// import { Dialog, DialogContent, DialogTitle } from "@mui/material";

// const MathRenderer = ({ expression, onClick }: { expression: string; onClick: () => void }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="border px-3 py-2 rounded cursor-pointer hover:bg-gray-100 min-h-[40px] flex items-center"
//     >
//       <MathJaxContext>
//         <MathJax>{`\\(${expression}\\)`}</MathJax>
//       </MathJaxContext>
//     </div>
//   );
// };

// const QuestionForm = () => {
//   const [open, setOpen] = useState(false);
//   const [integralType, setIntegralType] = useState<"single" | "double" | "triple">("single");

//   // Limits
//   const [upperLimitX, setUpperLimitX] = useState("");
//   const [lowerLimitX, setLowerLimitX] = useState("");
//   const [upperLimitY, setUpperLimitY] = useState("");
//   const [lowerLimitY, setLowerLimitY] = useState("");
//   const [upperLimitZ, setUpperLimitZ] = useState("");
//   const [lowerLimitZ, setLowerLimitZ] = useState("");

//   // Function inside integral
//   const [functionExpr, setFunctionExpr] = useState("");
//   const [integrals, setIntegrals] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   // Editable input ref for blinking cursor
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const openModal = (type: "single" | "double" | "triple", index: number | null = null) => {
//     setIntegralType(type);
//     setOpen(true);

//     if (index !== null) {
//       setEditingIndex(index);
//       const existingIntegral = integrals[index];

//       // Parse the existing LaTeX string back into limits & function
//       const match = existingIntegral.match(
//         /\\int(?:\^({.*?}))?_({.*?})?\s*(.*?)\s*d([xyz])(?:\s*d([yz]))?(?:\s*d(z))?/
//       );

//       if (match) {
//         setLowerLimitX(match[2]?.replace(/[{}]/g, "") || "");
//         setUpperLimitX(match[1]?.replace(/[{}]/g, "") || "");
//         setFunctionExpr(match[3] || "");

//         if (match[5]) {
//           setLowerLimitY(match[2]?.replace(/[{}]/g, "") || "");
//           setUpperLimitY(match[1]?.replace(/[{}]/g, "") || "");
//         }

//         if (match[6]) {
//           setLowerLimitZ(match[2]?.replace(/[{}]/g, "") || "");
//           setUpperLimitZ(match[1]?.replace(/[{}]/g, "") || "");
//         }
//       }
//     } else {
//       // Reset form for new integral
//       setEditingIndex(null);
//       setUpperLimitX("");
//       setLowerLimitX("");
//       setUpperLimitY("");
//       setLowerLimitY("");
//       setUpperLimitZ("");
//       setLowerLimitZ("");
//       setFunctionExpr("");
//     }
//   };

//   const handleSubmit = () => {
//     let integralLatex = "";

//     if (integralType === "single") {
//       integralLatex = `\\int_{${lowerLimitX}}^{${upperLimitX}} ${functionExpr} \\,dx`;
//     } else if (integralType === "double") {
//       integralLatex = `\\int_{${lowerLimitY}}^{${upperLimitY}} \\int_{${lowerLimitX}}^{${upperLimitX}} ${functionExpr} \\,dx \\,dy`;
//     } else if (integralType === "triple") {
//       integralLatex = `\\iiint_{${lowerLimitZ}}^{${upperLimitZ}} \\int_{${lowerLimitY}}^{${upperLimitY}} \\int_{${lowerLimitX}}^{${upperLimitX}} ${functionExpr} \\,dx \\,dy \\,dz`;
//     }

//     if (editingIndex !== null) {
//       const updatedIntegrals = [...integrals];
//       updatedIntegrals[editingIndex] = integralLatex;
//       setIntegrals(updatedIntegrals);
//     } else {
//       setIntegrals([...integrals, integralLatex]);
//     }

//     setOpen(false);
//     setEditingIndex(null);
//   };

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-lg w-full">
//       <h2 className="text-xl font-semibold mb-4">Integral Input</h2>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button onClick={() => openModal("single")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           ∫ Single Integral
//         </button>
//         <button onClick={() => openModal("double")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//           ∬ Double Integral
//         </button>
//         <button onClick={() => openModal("triple")} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
//           ∭ Triple Integral
//         </button>
//       </div>

//       {/* Modal for Input */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>{editingIndex !== null ? "Edit Integral" : "Enter Integral Details"}</DialogTitle>
//         <DialogContent>
//           <div className="flex flex-col gap-3">
//             {/* X Limits (Required for all integrals) */}
//             <label>Lower Limit (x):</label>
//             <input type="text" value={lowerLimitX} onChange={(e) => setLowerLimitX(e.target.value)} className="border px-2 py-1 rounded" />
//             <label>Upper Limit (x):</label>
//             <input type="text" value={upperLimitX} onChange={(e) => setUpperLimitX(e.target.value)} className="border px-2 py-1 rounded" />

//             <label>Function:</label>
//             <input type="text" value={functionExpr} onChange={(e) => setFunctionExpr(e.target.value)} className="border px-2 py-1 rounded" />

//             <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
//               {editingIndex !== null ? "Update" : "Submit"}
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Rendered Integrals */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Generated Integrals:</h3>
//         {integrals.map((expr, index) => (
//           <div
//             key={index}
//             className="relative flex items-center border p-2 rounded w-full mt-2 bg-white cursor-pointer"
            
//           >
//             <MathRenderer expression={expr} onClick={() => openModal("single", index)} />
            
//             {/* Editable Input (for blinking cursor) */}
//             <input
//               ref={inputRef}
//               type="text"
//               className="absolute inset-0 w-full h-full opacity-0 cursor-text"
//               value={expr}
//               readOnly
//               onFocus={() => inputRef.current?.setSelectionRange(expr.length, expr.length)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;
// import { useState, useRef } from "react";
// import { MathJax, MathJaxContext } from "better-react-mathjax";

// // MathRenderer Component (Unchanged)
// const MathRenderer = ({ expression, onClick }: { expression: string; onClick: () => void }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="px-3 py-2 rounded cursor-pointer hover:bg-gray-100 min-h-[40px] flex items-center"
//     >
//       <MathJaxContext>
//         <MathJax>{`\\(${expression}\\)`}</MathJax>
//       </MathJaxContext>
//     </div>
//   );
// };

// const QuestionForm = () => {
//   const [integrals, setIntegrals] = useState<string[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Function to add a new integral
//   const addIntegral = (latex: string) => {
//     setIntegrals([...integrals, latex]);
//   };

//   // Function to handle integral click for editing
//   const handleIntegralClick = (index: number) => {
//     setEditingIndex(index);

//     setTimeout(() => {
//       const contentDiv = contentRefs.current[index];
//       if (contentDiv) {
//         const range = document.createRange();
//         const sel = window.getSelection();
//         range.selectNodeContents(contentDiv);
//         range.collapse(false); // Move cursor to the end
//         sel?.removeAllRanges();
//         sel?.addRange(range);
//         contentDiv.focus();
//       }
//     }, 0);
//   };

//   // Function to handle content change
//   const handleContentChange = (index: number) => {
//     if (contentRefs.current[index]) {
//       const updatedText = contentRefs.current[index]?.innerText || "";
//       const updatedIntegrals = [...integrals];
//       updatedIntegrals[index] = updatedText;
//       setIntegrals(updatedIntegrals);
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-lg w-full">
//       <h2 className="text-xl font-semibold mb-4">Integral Input</h2>

//       {/* Add Integral Button */}
//       <button
//         onClick={() => addIntegral("\\int_{0}^{1} x^2 dx")}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add ∫ Integral
//       </button>

//       {/* Rendered Integrals */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Generated Integrals:</h3>
//         {integrals.map((expr, index) => (
//           <div
//             key={index}
//             ref={(el) => (contentRefs.current[index] = el)}
//             className="relative flex items-center border p-2 rounded w-full mt-2 bg-white cursor-text min-h-[40px]"
//             contentEditable={editingIndex === index} // Make it editable when clicked
//             suppressContentEditableWarning={true} // Suppress React warning
//             onClick={() => handleIntegralClick(index)} // Click anywhere to edit
//             onBlur={() => setEditingIndex(null)} // Stop editing when clicked outside
//             onInput={() => handleContentChange(index)} // Update state on edit
//           >
//             <MathRenderer expression={expr} onClick={() => handleIntegralClick(index)} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;

// import React, { useRef, useState } from "react";

// const QuestionForm = () => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const [content, setContent] = useState("");
//   let selection: Range | null = null;

//   const saveSelection = () => {
//     const selectionObj = window.getSelection();
//     if (selectionObj && selectionObj.rangeCount > 0) {
//       selection = selectionObj.getRangeAt(0);
//     }
//   };

//   const restoreSelection = () => {
//     if (selection) {
//       const selectionObj = window.getSelection();
//       selectionObj?.removeAllRanges();
//       selectionObj?.addRange(selection);
//     }
//   };

//   const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
//     setContent(e.currentTarget.innerText);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const br = document.createElement("br");
//       const range = window.getSelection()?.getRangeAt(0);
//       if (range) {
//         range.deleteContents();
//         range.insertNode(br);
//         range.setStartAfter(br);
//         range.setEndAfter(br);
//         const selection = window.getSelection();
//         selection?.removeAllRanges();
//         selection?.addRange(range);
//       }
//     }
//   };

//   return (
//     <div
//       ref={editorRef}
//       contentEditable
//       suppressContentEditableWarning
//       onInput={handleInput}
//       onKeyDown={handleKeyDown}
//       onMouseUp={saveSelection}
//       onKeyUp={saveSelection}
//       style={{
//         border: "1px solid black",
//         minHeight: "50px",
//         padding: "10px",
//         cursor: "text",
//         whiteSpace: "nowrap",
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//       }}
//       onFocus={(e) => {
//         if (e.currentTarget.innerText === "") {
//           e.currentTarget.innerHTML = "<br>";
//         }
//       }}
//     ></div>
//   );
// };

// export default QuestionForm;

import React, { useRef, useState } from "react";
import CalculatorTabs from "../Calculator/CalculatorTabs";

const QuestionForm = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [content, setContent] = useState("");
  let selection: Range | null = null;

  const saveSelection = () => {
    const selectionObj = window.getSelection();
    if (selectionObj && selectionObj.rangeCount > 0) {
      selection = selectionObj.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (selection) {
      const selectionObj = window.getSelection();
      selectionObj?.removeAllRanges();
      selectionObj?.addRange(selection);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const br = document.createElement("br");
      const range = window.getSelection()?.getRangeAt(0);
      if (range) {
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
  <div className="w-full p-4 bg-white shadow-lg rounded-lg mt-10">
  {/* Button on top */}
  <button
    onClick={() => setShowCalculator(!showCalculator)}
    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-fit mx-auto block"
  >
    {showCalculator ? "Hide Calculator" : "Show Calculator"}
  </button>

  {/* Calculator appears below the button when shown */}
  {showCalculator && (
    <div className="mt-4 p-4 border rounded shadow">
      <CalculatorTabs       
        restoreSelection={restoreSelection}
      />
    </div>
  )}
</div>

);

};

export default QuestionForm;













