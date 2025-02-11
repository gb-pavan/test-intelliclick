// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import InputEditor from "../InputEditor/InputEditor";

// const MathJax = dynamic(() => import("better-react-mathjax").then((mod) => mod.MathJax), { ssr: false });

// const QuestionForm: React.FC = () => {
//   const [activeField, setActiveField] = useState<string | null>(null);
//   const [content, setContent] = useState({
//     question: "",
//     options: ["", "", "", ""]
//   });

//   const handleChange = (key: "question" | "options", index: number, value: string) => {
//     setContent((prev) => ({
//       ...prev,
//       [key]: key === "options" ? prev.options.map((opt, i) => (i === index ? value : opt)) : value,
//     }));
//   };

//   return (
//     <div className="p-4 w-full max-w-2xl mx-auto space-y-4">
//       <h2 className="text-lg font-semibold">Create Question</h2>
//       <InputEditor
//         value={content.question}
//         onChange={(value) => handleChange("question", -1, value)}
//         isActive={activeField === "question"}
//         onFocus={() => setActiveField("question")}
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {content.options.map((option, index) => (
//           <InputEditor
//             key={index}
//             value={option}
//             onChange={(value) => handleChange("options", index, value)}
//             isActive={activeField === `option-${index}`}
//             onFocus={() => setActiveField(`option-${index}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import InputEditor from "../InputEditor/InputEditor";

// interface MathJaxItem {
//   type: "math" | "text";
//   value: string;
// }

// const MathJax = dynamic(() => import("better-react-mathjax").then((mod) => mod.MathJax), { ssr: false });

// const QuestionForm: React.FC = () => {
//   const [activeField, setActiveField] = useState<string | null>(null);
//   const [content, setContent] = useState({
//     question: "",
//     options: ["", "", "", ""]
//   });
//   const [question, setQuestion] = useState<MathJaxItem[]>([
//   { type: "text", value: "paven" },
//   { type: "text", value: "hello" },
//   { type: "math", value: "\\int x^2 dx" },
// ]);

// const [option1, setOption1] = useState<MathJaxItem[]>([
//   { type: "text", value: "test" },
//   { type: "math", value: "\\iint f(x, y) dxdy" },
// ]);

// const [option2, setOption2] = useState<MathJaxItem[]>([
//   { type: "text", value: "sample" },
//   { type: "math", value: "\\int_0^1 e^x dx" },
// ]);

// const [option3, setOption3] = useState<MathJaxItem[]>([
//   { type: "text", value: "world" },
//   { type: "math", value: "\\iint_0^1 xy dxdy" },
// ]);

// const [option4, setOption4] = useState<MathJaxItem[]>([
//   { type: "text", value: "example" },
// ]);


//   const handleChange = (key: "question" | "options", index: number, value: string) => {
//     setContent((prev) => ({
//       ...prev,
//       [key]: key === "options" ? prev.options.map((opt, i) => (i === index ? value : opt)) : value,
//     }));
//   };

//   return (
//     <div className="p-4 w-full h-screen flex flex-col space-y-4">
//       <h2 className="text-lg font-semibold">Create Question</h2>
//       <InputEditor
//         value={content.question}
//         onChange={(value) => handleChange("question", -1, value)}
//         isActive={activeField === "question"}
//         onFocus={() => setActiveField("question")}
//         className="w-full flex-grow"
//       />
//       <div className="flex flex-col gap-4 flex-grow">
//         {content.options.map((option, index) => (
//           <InputEditor
//             key={index}
//             value={option}
//             onChange={(value) => handleChange("options", index, value)}
//             isActive={activeField === `option-${index}`}
//             onFocus={() => setActiveField(`option-${index}`)}
//             className="w-full flex-grow"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionForm;

import React, { useState } from "react";
import dynamic from "next/dynamic";
import InputEditor from "../InputEditor/InputEditor";
import CalculatorTabs from "../Calculator/CalculatorTabs";

interface MathJaxItem {
  type: "math" | "text";
  value: string;
}

const MathJax = dynamic(() => import("better-react-mathjax").then((mod) => mod.MathJax), { ssr: false });

const QuestionForm: React.FC = () => {
  const [activeField, setActiveField] = useState<string | null>(null);
    const [showCalculator, setShowCalculator] = useState(false);


  const [question, setQuestion] = useState<MathJaxItem[]>([
    { type: "text", value: "paven" },
    { type: "text", value: "hello" },
    { type: "math", value: "\\int x^2 dx" },
  ]);

  const [option1, setOption1] = useState<MathJaxItem[]>([
    { type: "text", value: "test" },
    { type: "math", value: "\\iint f(x, y) dxdy" },
  ]);

  const [option2, setOption2] = useState<MathJaxItem[]>([
    { type: "text", value: "sample" },
    { type: "math", value: "\\int_0^1 e^x dx" },
  ]);

  const [option3, setOption3] = useState<MathJaxItem[]>([
    { type: "text", value: "world" },
    { type: "math", value: "\\iint_0^1 xy dxdy" },
  ]);

  const [option4, setOption4] = useState<MathJaxItem[]>([
    { type: "text", value: "example" },
  ]);

  const handleCalculatorInput = (item:MathJaxItem) => {
    switch (activeField) {
      case 'option0':
        setOption1(prev => [...prev, item]);
        break;
      case 'option1':
        setOption2(prev => [...prev, item]);
        break;
      case 'option2':
        setOption3(prev => [...prev, item]);
        break;
      case 'option3':
        setOption4(prev => [...prev, item]);
        break;
      default:
        setQuestion(prev => [...prev,item]);
    }
  }

  const handleQuestionChange = (value: MathJaxItem[]) => {
    setQuestion(value);
  };

  const handleOptionChange = (index: number, value: MathJaxItem[]) => {
    switch (index) {
      case 0:
        setOption1(value);
        break;
      case 1:
        setOption2(value);
        break;
      case 2:
        setOption3(value);
        break;
      case 3:
        setOption4(value);
        break;
      default:
        break;
    }
  };

  console.log("active",activeField);
  console.log("ques",question);
  return (
    <div className="p-4 w-full h-screen flex flex-col space-y-4">
       <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          {showCalculator ? "Hide Calculator" : "Show Calculator"}
        </button>
      </div>
      
      {/* Calculator Display */}
      {showCalculator && (
        <div className="mt-4 p-4 border rounded shadow">
          <CalculatorTabs handleCalculatorInput={handleCalculatorInput} />
        </div>
      )}
      <h2 className="text-lg font-semibold">Create Question</h2>
      
      {/* Question Editor */}
      <InputEditor
        value={question}
        onChange={handleQuestionChange}
        isActive={activeField === "question"}
        onFocus={() => setActiveField("question")}
        className="w-full flex-grow"
      />

      {/* Options Editors */}
      <div className="flex flex-col gap-4 flex-grow">
        {[option1, option2, option3, option4].map((option, index) => (
          <InputEditor
            key={index}
            value={option}
            onChange={(value) => handleOptionChange(index, value)}
            isActive={activeField === `option${index}`}
            onFocus={() => setActiveField(`option${index}`)}
            className="w-full flex-grow"
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;



