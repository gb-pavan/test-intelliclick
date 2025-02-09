// import { useState, useRef } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {
//   const [question, setQuestion] = useState<string>("");
//   const [options, setOptions] = useState<string[]>(["", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [focusedInput, setFocusedInput] = useState<"question" | number | null>(null);

//   const questionRef = useRef<HTMLDivElement>(null);
//   const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

//   const handleOptionChange = (index: number, value: string) => {
//     setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
//   };

//   const handleCalculatorInput = (value: string) => {
//     if (focusedInput === null) return;

//     const integralHTML = `<span class="flex items-center">
//       <span class="text-2xl">∫</span>
//       <input class="w-16 border text-center mx-1" placeholder="Function" type="text">
//       <span>dx</span>
//     </span>`;

//     if (focusedInput === "question") {
//       setQuestion((prev) => prev + value);
//     } else if (typeof focusedInput === "number") {
//       setOptions((prev) =>
//         prev.map((opt, i) => (i === focusedInput ? opt + value : opt))
//       );
//     }
//   };


// const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index?: number) => {
//   if (e.key !== "Backspace") return;

//   const selection = window.getSelection();
//   if (!selection || selection.rangeCount === 0) return;

//   const range = selection.getRangeAt(0);
//   const parentElement = range.startContainer.parentElement;

//   if (parentElement && parentElement.closest(".integral-container")) {
//     e.preventDefault(); // Prevent default backspace behavior

//     const integralContainer = parentElement.closest(".integral-container") as HTMLElement;
//     const inputs = integralContainer.querySelectorAll("input");
//     const dxSpan = integralContainer.querySelector(".dx-span");
//     const integralSymbol = integralContainer.querySelector(".integral-symbol");

//     if (inputs.length > 0) {
//       const lastInput = inputs[inputs.length - 1];

//       if (document.activeElement === lastInput) {
//         if (lastInput.value.length > 0) {
//           lastInput.value = lastInput.value.slice(0, -1);
//           return;
//         } else {
//           lastInput.remove();
//           setTimeout(() => moveCursorToEnd(integralContainer), 0);
//           return;
//         }
//       }
//     }

//     if (dxSpan) {
//       dxSpan.remove();
//       setTimeout(() => moveCursorToEnd(integralContainer), 0);
//       return;
//     }

//     if (integralSymbol) {
//       integralSymbol.remove();
//       setTimeout(() => moveCursorToEnd(integralContainer), 0);
//       return;
//     }

//     const parentEditable = parentElement.closest("[contenteditable]") as HTMLElement;

//     integralContainer.remove();
//     setTimeout(() => moveCursorToEnd(parentEditable), 0);
//   }
// };

// // Function to move the cursor after deletion
// const moveCursorToEnd = (element: HTMLElement) => {
//   const selection = window.getSelection();
//   const range = document.createRange();
//   range.selectNodeContents(element);
//   range.collapse(false); // Move cursor to the end
//   selection?.removeAllRanges();
//   selection?.addRange(range);
// };

//   return (
//     <div className="w-full p-4 bg-white shadow-lg rounded-lg mt-10">
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={() => setShowCalculator(!showCalculator)}
//           className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//         >
//           {showCalculator ? "Hide Calculator" : "Show Calculator"}
//         </button>
//       </div>
//       {showCalculator && (
//         <div className="mt-4 p-4 border rounded shadow">
//           <CalculatorTabs handleCalculatorInput={handleCalculatorInput} />
//         </div>
//       )}
//       <h2 className="text-xl font-semibold mb-4">Create a Question</h2>

//       {/* Question Input (ContentEditable) */}
//       <div
//         ref={questionRef}
//         contentEditable
//         suppressContentEditableWarning
//         onFocus={() => setFocusedInput("question")}
//         onInput={(e) => setQuestion(e.currentTarget.innerHTML)}
//         onKeyDown={(e) => handleKeyDown(e)}
//         dangerouslySetInnerHTML={{ __html: question }}
//         className="w-full p-2 border rounded mb-4 min-h-[40px] cursor-text"
//       />

//       {/* Options Inputs (ContentEditable) */}
//       {options.map((option, index) => (
//         <div
//           key={index}
//           ref={(el) => {
//             optionRefs.current[index] = el;
//           }}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={() => setFocusedInput(index)}
//           onInput={(e) => handleOptionChange(index, e.currentTarget.innerHTML)}
//           onKeyDown={(e) => handleKeyDown(e)}
//           dangerouslySetInnerHTML={{ __html: option }}
//           className="w-full p-2 border rounded mb-2 min-h-[40px] cursor-text"
//         />
//       ))}

//       <div className="flex justify-center mt-4">
//         <button
//           // onClick={handleCalculatorInput}
//           className="bg-gray-500 text-white p-2 rounded mx-2 hover:bg-gray-600"
//         >
//           Insert Integral
//         </button>
//         <button
//           // onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;

// import React, { useRef } from "react";

// const QuestionForm: React.FC = () => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   const insertElement = (element: HTMLElement) => {
//     const editor = editorRef.current;
//     if (!editor) return;

//     const selection = window.getSelection();
//     if (!selection?.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     range.deleteContents(); // Remove any selected content
//     range.insertNode(element); // Insert the new element

//     // Move cursor inside or after the inserted element
//     const newRange = document.createRange();
//     newRange.setStartAfter(element);
//     newRange.collapse(true);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//   };

//   const insertLog = () => {
//     const logSpan = document.createElement("span");
//     logSpan.contentEditable = "true";
//     logSpan.innerHTML = `log(<span contenteditable="true" style="border-bottom:1px dashed gray;"> </span>)`;
//     insertElement(logSpan);
//   };

//   const insertIntegral = () => {
//     const integralSpan = document.createElement("span");
//     integralSpan.innerHTML = "∫ ";
    
//     const input = document.createElement("input");
//     input.type = "text";
//     input.style.width = "40px";
//     input.style.margin = "0 5px";
//     integralSpan.appendChild(input);
//     insertElement(integralSpan);

//     setTimeout(() => input.focus(), 0); // Auto-focus input
//   };

//   const insertDefIntegral = () => {
//   const integralWrapper = document.createElement("span");
//   integralWrapper.style.display = "inline-flex";
//   integralWrapper.style.alignItems = "center";
//   integralWrapper.style.margin = "0 5px";

//   // Upper limit input
//   const upperInput = document.createElement("input");
//   upperInput.type = "text";
//   upperInput.style.width = "40px";
//   upperInput.style.marginBottom = "3px";
//   upperInput.setAttribute("placeholder", "Upper");

//   // Integral symbol
//   const integralSymbol = document.createElement("span");
//   integralSymbol.innerHTML = "∫";
//   integralSymbol.style.fontSize = "20px";
//   integralSymbol.style.margin = "0 5px";

//   // Lower limit input
//   const lowerInput = document.createElement("input");
//   lowerInput.type = "text";
//   lowerInput.style.width = "40px";
//   lowerInput.style.marginTop = "3px";
//   lowerInput.setAttribute("placeholder", "Lower");

//   // Function input
//   const functionInput = document.createElement("input");
//   functionInput.type = "text";
//   functionInput.style.width = "60px";
//   functionInput.style.marginLeft = "5px";
//   functionInput.setAttribute("placeholder", "f(x)");

//   // Wrapping upper & lower limits
//   const limitsWrapper = document.createElement("span");
//   limitsWrapper.style.display = "flex";
//   limitsWrapper.style.flexDirection = "column";
//   limitsWrapper.style.alignItems = "center";
//   limitsWrapper.appendChild(upperInput);
//   limitsWrapper.appendChild(integralSymbol);
//   limitsWrapper.appendChild(lowerInput);

//   // Append all elements
//   integralWrapper.appendChild(limitsWrapper);
//   integralWrapper.appendChild(functionInput);

//   // Insert into editor
//   insertElement(integralWrapper);

//   // Focus on function input
//   setTimeout(() => functionInput.focus(), 0);
// };


//   return (
//     <div>
//       <h2>Question Paper Editor</h2>
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
//       >
//         Solve:
//       </div>
//       <br />
//       <button onClick={insertLog}>log</button>
//       <button onClick={insertIntegral}>∫ Integral</button>
//       <button onClick={insertDefIntegral}>∫ Integral</button>
//     </div>
//   );
// };

// export default QuestionForm;

// import React, { useRef, useState,ReactNode } from "react";

// const QuestionForm: React.FC = () => {
//   const [content, setContent] = useState<(string | ReactNode)[]>(["Solve: "]);
//   const editorRef = useRef<HTMLDivElement>(null);

//   const insertElement = (element: ReactNode) => {
//     setContent((prev) => [...prev, element]);
//   };

//   const insertLog = () => {
//     insertElement(
//       <span contentEditable style={{ margin: "0 5px" }}>
//         log(<span contentEditable style={{ borderBottom: "1px dashed gray" }}> </span>)
//       </span>
//     );
//   };

//   const insertIntegral = () => {
//     insertElement(
//       <span style={{ margin: "0 5px" }}>
//         ∫ <input type="text" style={{ width: "40px", margin: "0 5px" }} autoFocus />
//       </span>
//     );
//   };

//   const insertDefIntegral = () => {
//     insertElement(
//       <span style={{ display: "inline-flex", alignItems: "center", margin: "0 5px" }}>
//         <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <input type="text" placeholder="Upper" style={{ width: "40px", marginBottom: "3px" }} />
//           <span style={{ fontSize: "20px", margin: "0 5px" }}>∫</span>
//           <input type="text" placeholder="Lower" style={{ width: "40px", marginTop: "3px" }} />
//         </span>
//         <input type="text" placeholder="f(x)" style={{ width: "60px", marginLeft: "5px" }} autoFocus />
//       </span>
//     );
//   };

//   return (
//     <div>
//       <h2>Question Paper Editor</h2>
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
//       >
//         {content.map((el, index) => (
//           <React.Fragment key={index}>{el}</React.Fragment>
//         ))}
//       </div>
//       <br />
//       <button onClick={insertLog}>log</button>
//       <button onClick={insertIntegral}>∫ Integral</button>
//       <button onClick={insertDefIntegral}>∫ Definite Integral</button>
//     </div>
//   );
// };

// export default QuestionForm;

// import React, { useRef } from "react";

// const QuestionForm: React.FC = () => {
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


//   const insertLog = () => {
//     insertElement(
//       ` log(<span contentEditable style="border-bottom: 1px dashed gray;"> </span>) `
//     );
//   };

//   const insertIntegral = () => {
//     insertElement(
//       ` ∫ <input type="text" style="width: 40px; margin: 0 5px;" autofocus /> `
//     );
//   };

//   const insertDefIntegral = () => {
//     insertElement(
//       `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
//         <span style="display: flex; flex-direction: column; align-items: center;">
//           <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px;" />
//           <span style="font-size: 20px; margin: 0 5px;">∫</span>
//           <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px;" />
//         </span>
//         <input type="text" placeholder="f(x)" style="width: 60px; margin-left: 5px;" autofocus />
//       </span>`
//     );
//   };

//   return (
//     <div>
//       <h2>Question Paper Editor</h2>
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
//       <button onClick={insertLog}>log</button>
//       <button onClick={insertIntegral}>∫ Integral</button>
//       <button onClick={insertDefIntegral}>∫ Definite Integral</button>
//     </div>
//   );
// };

// export default QuestionForm;

import { useState,useRef } from "react";
import CalculatorTabs from "../Calculator/CalculatorTabs";

const QuestionForm = () => {
    const editorRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"question" | number | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const insertElement = (html: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    range.deleteContents();
    range.insertNode(fragment);

    // Ensure lastChild exists before setting cursor position
    if (fragment.lastChild) {
      range.setStartAfter(fragment.lastChild);
      range.setEndAfter(fragment.lastChild);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleSubmit = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill in the question and all options.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options }),
      });
      if (response.ok) {
        alert("Question submitted successfully!");
        setQuestion("");
        setOptions(["", "", "", ""]);
      } else {
        alert("Failed to submit the question.");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Handle input change based on focused field
  const handleCalculatorInput = (value: string) => {
    if (focusedInput === null) return;

    if (focusedInput === "question") {
      setQuestion((prev) => (value === "BACKSPACE" ? prev.slice(0, -1) : prev + value));
    } else {
      setOptions((prev) =>
        prev.map((opt, i) =>
          i === focusedInput ? (value === "BACKSPACE" ? opt.slice(0, -1) : opt + value) : opt
        )
      );
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
          <CalculatorTabs handleCalculatorInput={handleCalculatorInput} insertElement={insertElement}/>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
      
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setFocusedInput("question")}
        onInput={(e) => setQuestion(e.currentTarget.textContent || "")}
        style={{
          border: "1px solid lightgray",
          minHeight: "50px",
          padding: "10px",
          cursor: "text",
          whiteSpace: "pre-wrap",
          position: "relative",
        }}
      >
        {question === "" && (
          <span style={{ color: "gray", opacity: 0.6, pointerEvents: "none" }}>
            Enter your question...
          </span>
        )}
        {question}
      </div>

      
      {/* {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          onFocus={() => setFocusedInput(index)}
          className="w-full p-2 border rounded mb-2"
        />
        
      ))} */}
      {options.map((option, index) => (
  <div
    key={index}
    ref={editorRef}
    contentEditable
    suppressContentEditableWarning
    onFocus={() => setFocusedInput(index)}
    onInput={(e) => handleOptionChange(index, e.currentTarget.textContent || "")}
    style={{
      border: "1px solid lightgray",
      minHeight: "40px",
      padding: "8px",
      cursor: "text",
      whiteSpace: "pre-wrap",
      borderRadius: "4px",
      backgroundColor: "white",
    }}
  >
        {option || <span style={{ color: "gray", opacity: 0.6 }}>Option {index + 1}</span>}

  </div>
))}

        <div className="flex justify-center mt-4">
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </div>
    </div>
  );
};

export default QuestionForm;





