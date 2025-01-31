import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const operations = [
  { label: 'sin', value: 'sin(' },
  { label: 'cos', value: 'cos(' },
  { label: 'tan', value: 'tan(' },
  { label: 'cot', value: 'cot(' },
  { label: 'sec', value: 'sec(' },
  { label: 'csc', value: 'csc(' },
  { label: 'sinh', value: 'sinh(' },
  { label: 'cosh', value: 'cosh(' },
  { label: 'tanh', value: 'tanh(' },
  { label: 'coth', value: 'coth(' },
  { label: 'sech', value: 'sech(' },
  { label: 'arcsin', value: 'arcsin(' },
  { label: 'arccos', value: 'arccos(' },
  { label: 'arctan', value: 'arctan(' },
  { label: 'arccot', value: 'arccot(' },
  { label: 'arcsec', value: 'arcsec(' },
  { label: 'arccsc', value: 'arccsc(' },
  { label: 'arcsinh', value: 'arcsinh(' },
  { label: 'arccosh', value: 'arccosh(' },
  { label: 'arctanh', value: 'arctanh(' },
  { label: 'arccoth', value: 'arccoth(' },
  { label: 'arcsech', value: 'arcsech(' },
];

interface TrigonometricFunctionsProps {
  // setSelectedInput: (value: string) => void;
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
}


const TrigonometricFunctions: React.FC<TrigonometricFunctionsProps> = ({ setSelectedInput }) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
    setSelectedInput((prev) => prev + value);
  };

  const handleEvaluate = () => {
    try {
      const evalResult = evaluate(input); // Trigonometric and hyperbolic functions supported by mathjs
      setResult(evalResult.toString());
    } catch {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="bg-white shadow-md rounded-md w-full mx-auto">
      {/* <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md text-lg"
          placeholder="Enter expression"
        />
        <p className="mt-2 text-green-600 font-semibold">Result: {result}</p>
      </div>

      <h3 className="text-lg font-medium mb-2">Trigonometric and Hyperbolic Functions</h3> */}
      <div className="grid grid-cols-11 gap-2">
        {operations.map((operation) => (
          <button
            key={operation.label}
            onClick={() => handleClick(operation.value)}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm"
          >
            {operation.label}
          </button>
        ))}
      </div>

      {/* <div className="mt-4 flex gap-2">
        <button
          onClick={handleEvaluate}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Evaluate
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Clear
        </button>
      </div> */}
    </div>
  );
};

export default TrigonometricFunctions;
