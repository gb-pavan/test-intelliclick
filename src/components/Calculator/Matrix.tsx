import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const operations = [
  { label: '□²', value: '^2' },
  { label: 'x^□', value: '^' },
  { label: '√□', value: 'sqrt(' },
  { label: '∛□', value: 'cbrt(' },
  { label: '□□', value: '**' },
  { label: 'log□', value: 'log(' },
  { label: 'π', value: 'pi' },
  { label: 'θ', value: 'theta' },
  { label: '∞', value: 'Infinity' },
  { label: '∫', value: 'integral(' },
  { label: 'd/dx', value: 'derivative(' },
];

const matrices = [
  '(2×2)', '(2×3)', '(3×3)', '(3×2)', '(4×2)', '(4×3)', '(3×4)',
  '(2×4)', '(5×2)', '(5×5)', '()', '(1×2)', '(1×3)', '(1×4)', '(1×5)',
];

const Matrix: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleEvaluate = () => {
    try {
      const evalResult = evaluate(input);
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
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Math Operation Panel</h2>

      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md text-lg"
          placeholder="Enter expression"
        />
        <p className="mt-2 text-green-600 font-semibold">Result: {result}</p>
      </div>

      <div className="grid grid-cols-11 gap-2 mb-4">
        {operations.map((op) => (
          <button
            key={op.label}
            onClick={() => handleClick(op.value)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-lg"
          >
            {op.label}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-medium mb-2">Matrices</h3>
      <div className="grid grid-cols-11 gap-2">
        {matrices.map((matrix) => (
          <button
            key={matrix}
            onClick={() => handleClick(matrix)}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm"
          >
            {matrix}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
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
      </div>
    </div>
  );
};

export default Matrix;
