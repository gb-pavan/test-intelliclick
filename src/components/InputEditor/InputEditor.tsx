// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';

// interface MathJaxItem {
//   type: 'math' | 'text';
//   value: string;
// }

// const QuestionForm: React.FC = () => {
//   const [items, setItems] = useState<MathJaxItem[]>([
//   { type: 'text', value: 'paven' },
//   { type: 'text', value: 'hello' },
//   { type: 'math', value: '\\int x^2 dx' },
//   { type: 'text', value: 'test' },
//   { type: 'math', value: '\\iint f(x, y) dxdy' },
//   { type: 'text', value: 'sample' },
//   { type: 'math', value: '\\int_0^1 e^x dx' },
//   { type: 'text', value: 'world' },
//   { type: 'math', value: '\\iint_0^1 xy dxdy' },
//   { type: 'text', value: 'example' }
// ]
// );
//   const [inputText, setInputText] = useState('');
//   const [mathJaxLoaded, setMathJaxLoaded] = useState(false);
//   const mathJaxRefs = useRef<HTMLSpanElement[]>([]); // Ref for each MathJax element
//   const observers = useRef<MutationObserver[]>([]); // Ref for MutationObservers
//     const containerRef = useRef<HTMLDivElement>(null);


//   const mathJaxRegex = /^(\\[a-zA-Z]+(?:\{.*\}|\[.*\])?(?:[\^_].*?)?|[0-9]+|[+\-*/=><!]|[,.;:])$/;

//   useEffect(() => {
//   if (mathJaxLoaded && typeof window !== "undefined" && (window as any).MathJax) {
//     (window as any).MathJax.Hub?.Queue(["Typeset", (window as any).MathJax.Hub])

//       .then(() => console.log("MathJax typeset completed"))
//       .catch((err: any) => console.error("MathJax rendering error:", err));
//   }
// }, [mathJaxLoaded, items]); // Re-run when items change


//   const processInput = useCallback(() => {
//     // ... (same as before)
//   }, [inputText]);

//   useEffect(() => {
//     processInput();
//   }, [inputText, processInput]);

//   // ... (handleInputChange and handleKeyDown - same as before)

//   useEffect(() => {
//     if (typeof window !== 'undefined' && (window as any).MathJax) {
//       setMathJaxLoaded(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (mathJaxLoaded) {
//       mathJaxRefs.current.forEach((span, index) => {
//         if (span) {
//           const observer = new MutationObserver(() => {
//             if (span.innerHTML !== "") {
//               observer.disconnect();
//             }
//           });

//           observers.current[index] = observer; // Store observer in array
//           observer.observe(span, { childList: true, subtree: true });
//         }
//       });
//     }

//     return () => {
//       observers.current.forEach(observer => {
//         if (observer) {
//           observer.disconnect();
//         }
//       });
//       observers.current = []; // Clear the observers array
//       mathJaxRefs.current = []; // Clear the refs array
//     };
//   }, [mathJaxLoaded, items]);

//   const handleInput = useCallback(() => {
//     if (!containerRef.current) return;
//     const textContent = containerRef.current.innerText.trim();
//     const newItems: MathJaxItem[] = textContent.split(' ').map((word) => {
//       return /\\[a-zA-Z]+/.test(word) ? { type: 'math', value: word } : { type: 'text', value: word };
//     });
//     setItems(newItems);
//   }, []);

//   return (
//     <MathJaxContext config={{ 
//   tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
//   options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] }
// }}>
      
//       <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap',border: '1px solid #ccc', 
//           padding: '8px' }} ref={containerRef}
//         contentEditable
//         suppressContentEditableWarning
//         onInput={handleInput}>
        
//           {items.map((item, index) => (
//             <React.Fragment key={index}>
//               {item.type === 'math' && mathJaxLoaded ? (
//                 <span ref={el => { if (el) mathJaxRefs.current[index] = el; }}>

//                   <MathJax key={item.value}>{`\\(${item.value}\\)`}</MathJax>
//                 </span>
//               ) : item.type === 'math' && !mathJaxLoaded ? (
//                 <span>{item.value}</span>
//               ) : (
//                 <span>{item.value} </span>
//               )}
//             </React.Fragment>
//           ))}
        
//       </div>
//     </MathJaxContext>
//   );
// };

// export default QuestionForm;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { MathJax, MathJaxContext } from "better-react-mathjax";

// interface MathJaxItem {
//   type: "math" | "text";
//   value: string;
// }

// const QuestionForm: React.FC = () => {
//   const [items, setItems] = useState<MathJaxItem[]>([
//     { type: "text", value: "paven" },
//     { type: "text", value: "hello" },
//     { type: "math", value: "\\int x^2 dx" },
//     { type: "text", value: "test" },
//     { type: "math", value: "\\iint f(x, y) dxdy" },
//     { type: "text", value: "sample" },
//     { type: "math", value: "\\int_0^1 e^x dx" },
//     { type: "text", value: "world" },
//     { type: "math", value: "\\iint_0^1 xy dxdy" },
//     { type: "text", value: "example" },
//   ]);
  
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [cursorIndex, setCursorIndex] = useState<number>(0);

//   const updateCursorPosition = useCallback((index: number) => {
//     setCursorIndex(index);
//   }, []);

//   const handleKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLDivElement>) => {
//       if (!containerRef.current) return;

//       if (event.key === "ArrowLeft") {
//         event.preventDefault();
//         if (cursorIndex > 0) {
//           updateCursorPosition(cursorIndex - 1);
//         }
//       }

//       if (event.key === "ArrowRight") {
//         event.preventDefault();
//         if (cursorIndex < items.length - 1) {
//           updateCursorPosition(cursorIndex + 1);
//         }
//       }

//       if (event.key === "Backspace") {
//         event.preventDefault();
//         if (cursorIndex === 0) return;

//         const newItems = [...items];
//         const currentItem = newItems[cursorIndex];

//         if (currentItem.type === "math") {
//           newItems.splice(cursorIndex, 1);
//           updateCursorPosition(Math.max(0, cursorIndex - 1));
//         } else if (currentItem.type === "text" && currentItem.value.length > 1) {
//           newItems[cursorIndex] = { type: "text", value: currentItem.value.slice(0, -1) };
//         } else {
//           newItems.splice(cursorIndex, 1);
//           updateCursorPosition(Math.max(0, cursorIndex - 1));
//         }

//         setItems(newItems);
//       }
//     },
//     [items, cursorIndex, updateCursorPosition]
//   );

//   return (
//     <MathJaxContext
//       config={{
//         tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
//         options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] },
//       }}
//     >
//       <div
//         ref={containerRef}
//         contentEditable
//         suppressContentEditableWarning
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           flexWrap: "wrap",
//           border: "1px solid #ccc",
//           padding: "8px",
//           cursor: "text",
//           minHeight: "30px",
//         }}
//         onKeyDown={handleKeyDown}
//       >
//         {items.map((item, index) => (
//           <React.Fragment key={index}>
//             {item.type === "math" ? (
//               <span
//                 style={{ margin: "0 4px", cursor: "pointer", backgroundColor: cursorIndex === index ? "#ddd" : "transparent" }}
//                 onClick={() => updateCursorPosition(index)}
//               >
//                 <MathJax>{`\\(${item.value}\\)`}</MathJax>
//               </span>
//             ) : (
//               <span
//                 style={{ margin: "0 4px", cursor: "text", backgroundColor: cursorIndex === index ? "#ddd" : "transparent" }}
//                 onClick={() => updateCursorPosition(index)}
//               >
//                 {item.value}
//               </span>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </MathJaxContext>
//   );
// };

// export default QuestionForm;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { MathJax, MathJaxContext } from "better-react-mathjax";

// interface MathJaxItem {
//   type: "math" | "text";
//   value: string;
// }

// const QuestionForm: React.FC = () => {
//   const [items, setItems] = useState<MathJaxItem[]>([
//     { type: 'text', value: 'paven' },
//     { type: 'text', value: 'hello' },
//     { type: 'math', value: '\\int x^2 dx' },
//     { type: 'text', value: 'test' },
//     { type: 'math', value: '\\iint f(x, y) dxdy' },
//     { type: 'text', value: 'sample' },
//     { type: 'math', value: '\\int_0^1 e^x dx' },
//     { type: 'text', value: 'world' },
//     { type: 'math', value: '\\iint_0^1 xy dxdy' },
//     { type: 'text', value: 'example' }
//   ]);
  
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [cursorIndex, setCursorIndex] = useState<number>(0);

//   const updateCursorPosition = useCallback((index: number) => {
//     setCursorIndex(index);
//   }, []);

//   const handleKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLDivElement>) => {
//       if (!containerRef.current) return;

//       if (event.key === "ArrowLeft") {
//         event.preventDefault();
//         if (cursorIndex > 0) {
//           updateCursorPosition(cursorIndex - 1);
//         }
//       }

//       if (event.key === "ArrowRight") {
//         event.preventDefault();
//         if (cursorIndex < items.length - 1) {
//           updateCursorPosition(cursorIndex + 1);
//         }
//       }

//       if (event.key === "Backspace") {
//         event.preventDefault();
//         if (items.length === 0) return; // No items to delete

//         const newItems = [...items];
//         const currentItem = newItems[cursorIndex];

//         if (currentItem.type === "math") {
//           newItems.splice(cursorIndex, 1);
//           updateCursorPosition(Math.max(0, cursorIndex - 1));
//         } else if (currentItem.type === "text" && currentItem.value.length > 1) {
//           newItems[cursorIndex] = { type: "text", value: currentItem.value.slice(0, -1) };
//         } else {
//           newItems.splice(cursorIndex, 1);
//           updateCursorPosition(Math.max(0, cursorIndex - 1));
//         }

//         // If the last item is removed, ensure the state updates properly
//         if (newItems.length === 0) {
//           setItems([{ type: "text", value: "" }]); // Add an empty text item for input
//           updateCursorPosition(0);
//         } else {
//           setItems(newItems);
//         }
//       }
//     },
//     [items, cursorIndex, updateCursorPosition]
//   );

//   return (
//     <MathJaxContext
//       config={{
//         tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
//         options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] },
//       }}
//     >
//       <div
//         ref={containerRef}
//         contentEditable
//         suppressContentEditableWarning
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           flexWrap: "wrap",
//           border: "1px solid #ccc",
//           padding: "8px",
//           cursor: "text",
//           minHeight: "30px",
//         }}
//         onKeyDown={handleKeyDown}
//       >
//         {items.length === 0 ? (
//           <span style={{ color: "#888" }}>Click to type...</span>
//         ) : (
//           items.map((item, index) => (
//             <React.Fragment key={index}>
//               {item.type === "math" ? (
//                 <span
//                   style={{ margin: "0 4px", cursor: "pointer", backgroundColor: cursorIndex === index ? "#ddd" : "transparent" }}
//                   onClick={() => updateCursorPosition(index)}
//                 >
//                   <MathJax>{`\\(${item.value}\\)`}</MathJax>
//                 </span>
//               ) : (
//                 <span
//                   style={{ margin: "0 4px", cursor: "text", backgroundColor: cursorIndex === index ? "#ddd" : "transparent" }}
//                   onClick={() => updateCursorPosition(index)}
//                 >
//                   {item.value}
//                 </span>
//               )}
//             </React.Fragment>
//           ))
//         )}
//       </div>
//     </MathJaxContext>
//   );
// };

// export default QuestionForm;

interface InputEditorProps {
  value: MathJaxItem[];
  onChange: (value: MathJaxItem[]) => void;
  isActive: boolean;
  onFocus: () => void;
  className?: string;
}

import React, { useState, useRef, useCallback } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface MathJaxItem {
  type: "math" | "text";
  value: string;
}

const InputEditor: React.FC<InputEditorProps> = ({ value, onChange, isActive, onFocus, className }) => {
  // const [items, setItems] = useState<MathJaxItem[]>([
  //   { type: "text", value: "" } // Start with an empty text item
  // ]);
  const [items, setItems] = useState<MathJaxItem[]>([...value]);
  const [cursorIndex, setCursorIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateCursorPosition = (index: number) => {
    setCursorIndex(index);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (cursorIndex > 0) updateCursorPosition(cursorIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (cursorIndex < items.length - 1) updateCursorPosition(cursorIndex + 1);
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        if (items.length === 0) return;

        const newItems = [...items];
        if (newItems[cursorIndex].type === "text" && newItems[cursorIndex].value.length > 0) {
          newItems[cursorIndex].value = newItems[cursorIndex].value.slice(0, -1);
        } else if (cursorIndex > 0) {
          newItems.splice(cursorIndex, 1);
          updateCursorPosition(cursorIndex - 1);
        }

        if (newItems.length === 0) {
          setItems([{ type: "text", value: "" }]);
          updateCursorPosition(0);
        } else {
          setItems(newItems);
        }
      }
    },
    [items, cursorIndex]
  );

  const handleBeforeInput = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = (event as unknown as InputEvent).data;

    if (!text) return;
    const newItems = [...items];

    if (newItems[cursorIndex]?.type === "text") {
      newItems[cursorIndex].value += text;
    } else {
      newItems.splice(cursorIndex + 1, 0, { type: "text", value: text });
      updateCursorPosition(cursorIndex + 1);
    }

    setItems(newItems);
  };

  return (
    <MathJaxContext
      config={{
        tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
        options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] }
      }}
    >
      <div
        ref={containerRef}
        contentEditable
        suppressContentEditableWarning
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexWrap: "wrap",
          border: "1px solid #ccc",
          padding: "8px",
          cursor: "text",
          minHeight: "30px"
        }}
        onKeyDown={handleKeyDown}
        onBeforeInput={handleBeforeInput} // Capture user input
      >
        {items.length === 0 ? (
          <span style={{ color: "#888" }}>Click to type...</span>
        ) : (
          items.map((item, index) => (
            <span
              key={index}
              style={{
                margin: "0 4px",
                cursor: "text",
                backgroundColor: cursorIndex === index ? "#ddd" : "transparent"
              }}
              onClick={() => updateCursorPosition(index)}
            >
              {item.type === "math" ? <MathJax>{`\\(${item.value}\\)`}</MathJax> : item.value}
            </span>
          ))
        )}
      </div>
    </MathJaxContext>
  );
};

export default InputEditor;