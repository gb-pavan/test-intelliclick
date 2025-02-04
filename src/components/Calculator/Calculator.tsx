import React, { useState } from 'react';
import { create, all } from 'mathjs';

interface CalculatorProps {
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
}

const math = create(all);

const Calculator: React.FC<CalculatorProps> = ({setSelectedInput}) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | number>('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const evaluation = math.evaluate(input); // Evaluate mathematical expression
        setResult(evaluation);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setSelectedInput(prev => prev + input + value);
      setInput(input + value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg p-4 mx-auto bg-white shadow-md rounded-md">
      <div className="w-full p-4 mb-4 text-lg font-medium text-gray-800 bg-gray-100 rounded-md">
        <div className="text-gray-700">{input || '0'}</div>
        <div className="mt-2 text-sm text-gray-500">{result || ''}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full">
        {[
          'x^2', 'sqrt', 'log', 'π',
          'sin', 'cos', 'tan', 'cot',
          'Σ', '∫', 'd/dx', 'C',
          '7', '8', '9', '/',
          '4', '5', '6', '*',
          '1', '2', '3', '-',
          '0', '.', '=', '+',
          'simplify', 'solve for', 'inverse', 'ln',
        ].map((key, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(key)}
            className="p-4 text-sm font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600"
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
