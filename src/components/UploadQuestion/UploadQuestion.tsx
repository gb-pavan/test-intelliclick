// import { useState } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [focusedInput, setFocusedInput] = useState<React.ReactNode | number | "question" | null>(null);

//   const handleOptionChange = (index: number, value: string) => {
//     setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
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
//   const handleCalculatorInput = (value: React.ReactNode | number | string) => {
//     if (focusedInput === null) return;

//     const inputValue = typeof value === "number" || typeof value === "string" ? String(value) : value;

//     if (focusedInput === "question") {
//       setQuestion((prev) => (inputValue === "BACKSPACE" ? prev.slice(0, -1) : prev + inputValue));
//     } else if (typeof focusedInput === "number") {
//       setOptions((prev) =>
//         prev.map((opt, i) =>
//           i === focusedInput ? (inputValue === "BACKSPACE" ? opt.slice(0, -1) : opt + inputValue) : opt
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
//           <CalculatorTabs handleCalculatorInput={handleCalculatorInput} />
//         </div>
//       )}
//       <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
//       <input
//         type="text"
//         placeholder="Enter your question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         onFocus={() => setFocusedInput("question")}
//         className="w-full p-2 border rounded mb-4"
//       />
      
//       {options.map((option, index) => (
//         <input
//           key={index}
//           type="text"
//           placeholder={`Option ${index + 1}`}
//           value={option}
//           onChange={(e) => handleOptionChange(index, e.target.value)}
//           onFocus={() => setFocusedInput(index)}
//           className="w-full p-2 border rounded mb-2"
//         />
//       ))}
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

// import { useState } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [focusedInput, setFocusedInput] = useState<"question" | number | null>(null);

//   // Handle option changes
//   const handleOptionChange = (index: number, value: string) => {
//     setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
//   };

//   // Handle LaTeX math input from Calculator
//   const handleCalculatorInput = (value: string) => {
//     if (focusedInput === null) return;

//     // Handle Backspace behavior
//     if (value === "BACKSPACE") {
//       if (focusedInput === "question") {
//         setQuestion((prev) => prev.slice(0, -1));
//       } else {
//         setOptions((prev) =>
//           prev.map((opt, i) => (i === focusedInput ? opt.slice(0, -1) : opt))
//         );
//       }
//       return;
//     }

//     // Insert the math symbol
//     if (focusedInput === "question") {
//       setQuestion((prev) => prev + value);
//     } else if (typeof focusedInput === "number") {
//       setOptions((prev) =>
//         prev.map((opt, i) => (i === focusedInput ? opt + value : opt))
//       );
//     }
//   };

//   // Handle Form Submission
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
//           <CalculatorTabs handleCalculatorInput={handleCalculatorInput} />
//         </div>
//       )}

//       <h2 className="text-xl font-semibold mb-4">Create a Question</h2>

//       {/* Question Input */}
//       <input
//         type="text"
//         placeholder="Enter your question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         onFocus={() => setFocusedInput("question")}
//         className="w-full p-2 border rounded mb-4"
//       />

//       {/* Options Inputs */}
//       {options.map((option, index) => (
//         <input
//           key={index}
//           type="text"
//           placeholder={`Option ${index + 1}`}
//           value={option}
//           onChange={(e) => handleOptionChange(index, e.target.value)}
//           onFocus={() => setFocusedInput(index)}
//           className="w-full p-2 border rounded mb-2"
//         />
//       ))}

//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;

// import { useState, useRef } from "react";
// import CalculatorTabs from "../Calculator/CalculatorTabs";

// const QuestionForm = () => {
//   const [question, setQuestion] = useState<string | React.ReactNode>("");
//   const [options, setOptions] = useState<(string | React.ReactNode)[]>(["", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [focusedInput, setFocusedInput] = useState<"question" | number | null>(null);

//   const questionRef = useRef<HTMLDivElement>(null);
//   const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

//   const handleOptionChange = (index: number, value: string) => {
//     setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
//   };

//   const handleSubmit = async () => {
//     if (!question || (typeof question === "string" && !question.trim()) || options.some((opt) => typeof opt === "string" && !opt.trim())) {
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

//   const handleCalculatorInput = (value: React.ReactNode | number | string) => {
//   if (focusedInput === null) return;

//   if (focusedInput === "question") {
//     setQuestion((prev) => (
//       <>
//         {prev}
//         {value}
//       </>
//     ));
//   } else if (typeof focusedInput === "number") {
//     setOptions((prev) =>
//       prev.map((opt, i) =>
//         i === focusedInput ? (
//           <>
//             {opt}
//             {value}
//           </>
//         ) : (
//           opt
//         )
//       )
//     );
//   }
// };


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
//         className="w-full p-2 border rounded mb-4 min-h-[40px] cursor-text"
//       >
//         {question || <span className="text-gray-400">Enter your question</span>}
//       </div>

//       {/* Options Inputs (ContentEditable) */}
//       {options.map((option, index) => (
//         <div
//           key={index}
//           // ref={(el) => (optionRefs.current[index] = el)}
//           ref={(el) => {
//             optionRefs.current[index] = el;
//           }}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={() => setFocusedInput(index)}
//           onInput={(e) => handleOptionChange(index, e.currentTarget.innerHTML)}
//           className="w-full p-2 border rounded mb-2 min-h-[40px] cursor-text"
//         >
//           {option || <span className="text-gray-400">Option {index + 1}</span>}
//         </div>
//       ))}

//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;

import { useState, useRef } from "react";
import CalculatorTabs from "../Calculator/CalculatorTabs";

const QuestionForm = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"question" | number | null>(null);

  const questionRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const handleCalculatorInput = (value: string) => {
    if (focusedInput === null) return;

    const integralHTML = `<span class="flex items-center">
      <span class="text-2xl">∫</span>
      <input class="w-16 border text-center mx-1" placeholder="Function" type="text">
      <span>dx</span>
    </span>`;

    if (focusedInput === "question") {
      setQuestion((prev) => prev + value);
    } else if (typeof focusedInput === "number") {
      setOptions((prev) =>
        prev.map((opt, i) => (i === focusedInput ? opt + value : opt))
      );
    }
  };

  

// const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index?: number) => {
//   if (e.key === "Backspace") {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     const range = selection.getRangeAt(0);
//     const parentElement = range.startContainer.parentElement;

//     if (parentElement && parentElement.classList.contains("math-span")) {
//       e.preventDefault(); // Prevent default backspace behavior

//       const textContent = parentElement.textContent ?? ""; // Ensure textContent is always a string
//       if (textContent.length === 1) {
//         parentElement.remove(); // Remove entire element if empty
//       } else {
//         parentElement.textContent = textContent.slice(0, -1); // Remove last character
//       }
//     }
//   }
// };

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
//         } else {
//           lastInput.remove();
//           moveCursorToEnd(integralContainer);
//         }
//         return;
//       }
//     }

//     if (dxSpan) {
//       dxSpan.remove();
//       moveCursorToEnd(integralContainer);
//       return;
//     }

//     if (integralSymbol) {
//       integralSymbol.remove();
//       moveCursorToEnd(integralContainer);
//       return;
//     }

//     integralContainer.remove();
//     moveCursorToEnd(parentElement.closest("[contenteditable]")!);
//   }
// };


const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index?: number) => {
  if (e.key !== "Backspace") return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const parentElement = range.startContainer.parentElement;

  if (parentElement && parentElement.closest(".integral-container")) {
    e.preventDefault(); // Prevent default backspace behavior

    const integralContainer = parentElement.closest(".integral-container") as HTMLElement;
    const inputs = integralContainer.querySelectorAll("input");
    const dxSpan = integralContainer.querySelector(".dx-span");
    const integralSymbol = integralContainer.querySelector(".integral-symbol");

    if (inputs.length > 0) {
      const lastInput = inputs[inputs.length - 1];

      if (document.activeElement === lastInput) {
        if (lastInput.value.length > 0) {
          lastInput.value = lastInput.value.slice(0, -1);
          return;
        } else {
          lastInput.remove();
          setTimeout(() => moveCursorToEnd(integralContainer), 0);
          return;
        }
      }
    }

    if (dxSpan) {
      dxSpan.remove();
      setTimeout(() => moveCursorToEnd(integralContainer), 0);
      return;
    }

    if (integralSymbol) {
      integralSymbol.remove();
      setTimeout(() => moveCursorToEnd(integralContainer), 0);
      return;
    }

    const parentEditable = parentElement.closest("[contenteditable]") as HTMLElement;

    integralContainer.remove();
    setTimeout(() => moveCursorToEnd(parentEditable), 0);
  }
};

// Function to move the cursor after deletion
const moveCursorToEnd = (element: HTMLElement) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false); // Move cursor to the end
  selection?.removeAllRanges();
  selection?.addRange(range);
};






  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          {showCalculator ? "Hide Calculator" : "Show Calculator"}
        </button>
      </div>
      {showCalculator && (
        <div className="mt-4 p-4 border rounded shadow">
          <CalculatorTabs handleCalculatorInput={handleCalculatorInput} />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Create a Question</h2>

      {/* Question Input (ContentEditable) */}
      <div
        ref={questionRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setFocusedInput("question")}
        onInput={(e) => setQuestion(e.currentTarget.innerHTML)}
        onKeyDown={(e) => handleKeyDown(e)}
        dangerouslySetInnerHTML={{ __html: question }}
        className="w-full p-2 border rounded mb-4 min-h-[40px] cursor-text"
      />

      {/* Options Inputs (ContentEditable) */}
      {options.map((option, index) => (
        <div
          key={index}
          ref={(el) => {
            optionRefs.current[index] = el;
          }}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => setFocusedInput(index)}
          onInput={(e) => handleOptionChange(index, e.currentTarget.innerHTML)}
          onKeyDown={(e) => handleKeyDown(e)}
          dangerouslySetInnerHTML={{ __html: option }}
          className="w-full p-2 border rounded mb-2 min-h-[40px] cursor-text"
        />
      ))}

      <div className="flex justify-center mt-4">
        <button
          // onClick={handleCalculatorInput}
          className="bg-gray-500 text-white p-2 rounded mx-2 hover:bg-gray-600"
        >
          Insert Integral
        </button>
        <button
          // onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;


