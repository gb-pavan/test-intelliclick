import React, { useState } from 'react';
import { evaluate } from 'mathjs';

interface IntegrationAndDerivativesProps {
  // setSelectedInput: (value: string) => void;
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
      insertElement: (html: string) => void;
}

const operations = [
  { label: '∫', value: 'integral(' },
  { label: '∬', value: 'doubleIntegral(' },
  { label: '∭', value: 'tripleIntegral(' },
  { label: '∫□□', value: 'definiteIntegral(lower, upper, ' },
  { label: '∬□□', value: 'doubleDefiniteIntegral(lower1, upper1, lower2, upper2, ' },
  { label: '∭□□□', value: 'tripleDefiniteIntegral(lower1, upper1, lower2, upper2, lower3, upper3, ' },
  { label: 'Σ', value: 'sum(' },
  { label: '∏', value: 'product(' },
  { label: 'lim', value: 'limit(' },
  { label: 'lim→∞', value: 'limitToInfinity(' },
  { label: 'lim x→0-', value: 'limit(x, 0, -)' },
  { label: 'lim x→0+', value: 'limit(x, 0, +)' },
  { label: 'd/dx', value: 'derivative(' },
  { label: 'd²/dx²', value: 'secondDerivative(' },
  { label: '□\'', value: '(□)\'' },
  { label: '□\'\'', value: '(□)\'\'' },
  { label: '∂/∂x', value: 'partialDerivative(' },
];

const IntegrationAndDerivatives: React.FC<IntegrationAndDerivativesProps> = ({setSelectedInput,insertElement}) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleClick = (value: string) => {
    if (value === '∫□□') {
      insertElement(
        `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
          <span style="display: flex; flex-direction: column; align-items: center;">
            <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px;" />
            <span style="font-size: 20px; margin: 0 5px;">∫</span>
            <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px;" />
          </span>
          <input type="text" placeholder="f(x)" style="width: 60px; margin-left: 5px;" autofocus />
        </span>`
      );
    }
    else if (value === '∬□□') {
      insertElement(
        `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
          <!-- Double Integral with Limits (Repeated Twice) -->
          <span style="display: flex; flex-direction: column; align-items: center; margin: 0 5px;">
            <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px; text-align: center;" />
            <span style="font-size: 20px; margin: 0 5px;">∫</span>
            <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px; text-align: center;" />
          </span>
          <span style="display: flex; flex-direction: column; align-items: center; margin: 0 5px;">
            <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px; text-align: center;" />
            <span style="font-size: 20px; margin: 0 5px;">∫</span>
            <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px; text-align: center;" />
          </span>
          <!-- Input Field to the Right -->
          <input type="text" placeholder="Function" style="width: 80px; margin-left: 5px; text-align: center;" />
        </span>`)
    }
    else if (value === '∭□□□') {
      insertElement(
        `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
          <!-- Double Integral with Limits (Repeated Twice) -->
          <span style="display: flex; flex-direction: column; align-items: center; margin: 0 5px;">
            <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px; text-align: center;" />
            <span style="font-size: 20px; margin: 0 5px;">∫</span>
            <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px; text-align: center;" />
          </span>
          <span style="display: flex; flex-direction: column; align-items: center; margin: 0 5px;">
            <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px; text-align: center;" />
            <span style="font-size: 20px; margin: 0 5px;">∫</span>
            <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px; text-align: center;" />
          </span>
          <!-- Input Field to the Right -->
          <input type="text" placeholder="Function" style="width: 80px; margin-left: 5px; text-align: center;" />
        </span>`)
    } else if (value === '∫' || value === '∬' || value === '∭'){
      insertElement(
        `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
          <span style="display: flex; flex-direction: column; align-items: center;">
            <span style="font-size: 20px; margin: 0 5px;">${value}</span>
          </span>
          <input type="text" placeholder="f()" style="width: 40px; margin-left: 5px;" />
        </span>
        `
      )
    }else if (value === 'Σ' || value === '∏') {
      insertElement(
        `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
          <span style="display: flex; flex-direction: column; align-items: center;">
            <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px;" />
            <span style="font-size: 20px; margin: 0 5px;">${value}</span>
            <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px;" />
          </span>
          <input type="text" placeholder="f(x)" style="width: 60px; margin-left: 5px;" autofocus />
        </span>`
      );
    }
    else {
      insertElement(`<span>${value}</span>`)
    }
    setInput((prev) => prev + value);
    setSelectedInput((prev) => prev + value);
  };

  const handleEvaluate = () => {
    try {
      const evalResult = evaluate(input); // Customize evaluation for advanced operations
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

      <h3 className="text-lg font-medium mb-2">Integrals, Derivatives, and Calculus</h3> */}
      <div className="grid grid-cols-8 gap-2">
        {operations.map((operation) => (
          <button
            key={operation.label}
            onClick={() => handleClick(operation.label)}
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

export default IntegrationAndDerivatives;

