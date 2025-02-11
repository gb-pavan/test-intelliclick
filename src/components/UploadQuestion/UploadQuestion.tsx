// import { useState,useRef } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {
//     const editorRef = useRef(null);

//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [focusedInput, setFocusedInput] = useState<"question" | number | null>(null);

//   const handleOptionChange = (index: number, value: string) => {
//     setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
//   };

//   const insertElement = (html: string) => {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     const range = selection.getRangeAt(0);
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;

//     const fragment = document.createDocumentFragment();
//     while (tempDiv.firstChild) {
//       fragment.appendChild(tempDiv.firstChild);
//     }

//     range.deleteContents();
//     range.insertNode(fragment);

//     // Ensure lastChild exists before setting cursor position
//     if (fragment.lastChild) {
//       range.setStartAfter(fragment.lastChild);
//       range.setEndAfter(fragment.lastChild);
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!question.trim() || options.some((opt) => !opt.trim())) {
//       alert("Please fill in the question and all options.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch("/api/questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question, options }),
//       });
//       if (response.ok) {
//         alert("Question submitted successfully!");
//         setQuestion("");
//         setOptions(["", "", "", ""]);
//       } else {
//         alert("Failed to submit the question.");
//       }
//     } catch (error) {
//       console.error("Error submitting question:", error);
//       alert("An error occurred. Please try again.");
//     }
//     setLoading(false);
//   };

//   // Handle input change based on focused field
//   const handleCalculatorInput = (value: string) => {
//     if (focusedInput === null) return;

//     if (focusedInput === "question") {
//       setQuestion((prev) => (value === "BACKSPACE" ? prev.slice(0, -1) : prev + value));
//     } else {
//       setOptions((prev) =>
//         prev.map((opt, i) =>
//           i === focusedInput ? (value === "BACKSPACE" ? opt.slice(0, -1) : opt + value) : opt
//         )
//       );
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
//           <CalculatorTabs handleCalculatorInput={handleCalculatorInput} insertElement={insertElement}/>
//         </div>
//       )}
//       <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
      
//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         onFocus={() => setFocusedInput("question")}
//         onInput={(e) => setQuestion(e.currentTarget.textContent || "")}
//         style={{
//           border: "1px solid lightgray",
//           minHeight: "50px",
//           padding: "10px",
//           cursor: "text",
//           whiteSpace: "pre-wrap",
//           position: "relative",
//         }}
//       >
//         {question === "" && (
//           <span style={{ color: "gray", opacity: 0.6, pointerEvents: "none" }}>
//             Enter your question...
//           </span>
//         )}
//         {question}
//       </div>
//       {options.map((option, index) => (
//   <div
//     key={index}
//     ref={editorRef}
//     contentEditable
//     suppressContentEditableWarning
//     onFocus={() => setFocusedInput(index)}
//     onInput={(e) => handleOptionChange(index, e.currentTarget.textContent || "")}
//     style={{
//       border: "1px solid lightgray",
//       minHeight: "40px",
//       padding: "8px",
//       cursor: "text",
//       whiteSpace: "pre-wrap",
//       borderRadius: "4px",
//       backgroundColor: "white",
//     }}
//   >
//         {option || <span style={{ color: "gray", opacity: 0.6 }}>Option {index + 1}</span>}

//   </div>
// ))}

//         <div className="flex justify-center mt-4">
//             <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 disabled:bg-gray-400"
//             >
//                 {loading ? "Submitting..." : "Submit"}
//             </button>
//         </div>
//     </div>
//   );
// };

// export default QuestionForm;


// import { useState,useRef } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {

//   const [showCalculator, setShowCalculator] = useState(false);
//   const editorRef = useRef<HTMLDivElement>(null);

//   const insertElement = (html: string) => {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     const range = selection.getRangeAt(0);
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;

//     const fragment = document.createDocumentFragment();
//     while (tempDiv.firstChild) {
//       fragment.appendChild(tempDiv.firstChild);
//     }

//     range.deleteContents();
//     range.insertNode(fragment);

//     // Ensure lastChild exists before setting cursor position
//     if (fragment.lastChild) {
//       range.setStartAfter(fragment.lastChild);
//       range.setEndAfter(fragment.lastChild);
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   };

//   const handleCalculatorInput = (value: string) => {
//     console.log("calciInput");
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
//           <CalculatorTabs handleCalculatorInput={handleCalculatorInput} insertElement={insertElement}/>
//         </div>
//       )}
//       <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         style={{
//           border: "1px solid black",
//           minHeight: "50px",
//           padding: "10px",
//           cursor: "text",
//           whiteSpace: "pre-wrap",
//         }}
//       />
//       <br />    
     
   
//     </div>
//   );
// };

// export default QuestionForm;

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

import { useState, useRef } from "react";
import CalculatorTabs from "../Calculator/CalculatorTabs";

const QuestionForm = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);

  // Save cursor position
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0);
    }
  };

  // Restore cursor position
  const restoreSelection = () => {
    const selection = window.getSelection();
    if (selection && selectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(selectionRef.current);
    }
  };

  // Insert plain text at cursor position
  const insertElement = (text: string) => {
    if (!editorRef.current) return;
    restoreSelection();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    setContent(editorRef.current.innerText);
    editorRef.current.focus();
  };

  const handleCalculatorInput = (value: string) => {
    insertElement(value);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new lines
    }
  };

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-fit mx-auto"
        >
          {showCalculator ? "Hide Calculator" : "Show Calculator"}
        </button>
      </div>
      {showCalculator && (
        <div className="mt-4 p-4 border rounded shadow">
          <CalculatorTabs handleCalculatorInput={handleCalculatorInput} insertElement={insertElement} restoreSelection={restoreSelection} />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        style={{
          border: "1px solid black",
          minHeight: "50px",
          padding: "10px",
          cursor: "text",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onFocus={(e) => {
          if (e.currentTarget.innerText === "") {
            e.currentTarget.innerHTML = "<br>"; // Keeps cursor visible in empty div
          }
        }}
      ></div>
      <br />
    </div>
  );
};

export default QuestionForm;







