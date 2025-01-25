import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const FullCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [isRadians, setIsRadians] = useState<boolean>(true);

  const handleButtonClick = (value: string) => {
  if (value === '=') {
    try {
      const evaluation = math.evaluate(input);
      console.log("evaluation",evaluation);
      setInput(evaluation.toString());
    } catch (error) {
      setInput('Error');
    }
  } else if (value === 'clear') {
    setInput('');
  } else if (value === 'Radians' || value === 'Degrees') {
    setIsRadians(value === 'Radians');
  } else if (value === 'x^') {
    setInput(input + '^');
  } else if (value === '×'){
    setInput(input + '*');
  } else if (value === '÷'){
    setInput(input + '/');
  } else if (value === '√'){
    setInput(input + 'sqrt(');
  }else if (value === 'arcsin') {

    try {
      const inputValue = parseFloat(input);
      if (isNaN(inputValue)) {
        setInput('Error: Invalid Input');
      } else if (inputValue < -1 || inputValue > 1) {
        setInput('Error: Input Out of Range');
      } else {
        const result = isRadians
          ? math.asin(inputValue)
          : (math.asin(inputValue) as number) * (180 / Math.PI);
        setInput(result.toString());
      }
    } catch (error) {
      setInput('Error');
    }
  }
  
  else {
    setInput(input + value);
  }
};


  return (
    <div className="flex flex-col items-center w-full max-w-xl p-4 mx-auto bg-white shadow-md rounded-md">
      <div className="w-full p-4 mb-4 text-lg font-medium text-gray-800 bg-gray-100 rounded-md">
        <div className="text-gray-700">{input || '0'}</div>
      </div>

      <div className="grid grid-cols-7 gap-2 w-full">
      
        {['Radians','Degrees','!','(', ')', '%', 'clear'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {['arcsin', 'sin', '√', '7', '8', '9', '÷'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className={`p-2 rounded-md ${
      isRadians ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
    }`}
          >
            {key}
          </button>
        ))}

        {['arccos', 'cos', 'ln', '4', '5', '6', '×'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {['arctan', 'tan', 'log', '1', '2', '3', '-'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {['π', 'e', 'x^', '0', '.', '=', '+'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        
      </div>
    </div>
  );
};

export default FullCalculator;
