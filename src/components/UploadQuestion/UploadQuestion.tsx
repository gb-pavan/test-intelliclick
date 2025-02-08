import { useState } from "react";
import CalculatorTabs from "../Calculator/CalculatorTabs";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [focusedInput, setFocusedInput] = useState<React.ReactNode | number | "question" | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
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
  const handleCalculatorInput = (value: React.ReactNode | number | string) => {
    if (focusedInput === null) return;

    const inputValue = typeof value === "number" || typeof value === "string" ? String(value) : value;

    if (focusedInput === "question") {
      setQuestion((prev) => (inputValue === "BACKSPACE" ? prev.slice(0, -1) : prev + inputValue));
    } else if (typeof focusedInput === "number") {
      setOptions((prev) =>
        prev.map((opt, i) =>
          i === focusedInput ? (inputValue === "BACKSPACE" ? opt.slice(0, -1) : opt + inputValue) : opt
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
          <CalculatorTabs handleCalculatorInput={handleCalculatorInput} />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Create a Question</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onFocus={() => setFocusedInput("question")}
        className="w-full p-2 border rounded mb-4"
      />
      
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          onFocus={() => setFocusedInput(index)}
          className="w-full p-2 border rounded mb-2"
        />
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


