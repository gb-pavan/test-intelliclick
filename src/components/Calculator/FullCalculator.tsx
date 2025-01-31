import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

interface FullCalculatorProps {
  // setSelectedInput: (value: string) => void;
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
}

const FullCalculator: React.FC<FullCalculatorProps> = ({setSelectedInput}) => {
  const [input, setInput] = useState<string>('');
  const [isRadians, setIsRadians] = useState<boolean>(true);
  const [isLogMode, setIsLogMode] = useState<boolean>(false);
  const [logBase, setLogBase] = useState<string>('');
  const [logValue, setLogValue] = useState<string>('');


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
    setIsLogMode(false)
    setInput('');
    setSelectedInput('');
  } else if (value === 'Radians' || value === 'Degrees') {
    setIsRadians(value === 'Radians');
  } else if (value === 'x^') {
    setInput(input + '^');
    setSelectedInput(input + '^');
  } else if (value === '×'){
    setInput(input + '*');
    setSelectedInput(input + '*');
  } else if (value === '÷'){
    setInput(input + '/');
    setSelectedInput(prev => prev  + '/');
  } else if (value === '√'){
    setInput(input + 'sqrt(');
    setSelectedInput(input + 'sqrt(');
  }else if (value === 'log') {
      setIsLogMode(true);
    }else if (['arcsin', 'arccos', 'arctan'].includes(value)) {
  try {
    const inputValue = parseFloat(input);
    if (isNaN(inputValue)) {
      setInput('Error: Invalid Input');
    } else {
      // Check input range for arcsin and arccos
      if ((value === 'arcsin' || value === 'arccos') && (inputValue < -1 || inputValue > 1)) {
        setInput('Error: Input Out of Range');
        return;
      }

      // Perform calculations based on the selected function
      const result = (() => {
        if (value === 'arcsin') {
          return isRadians
            ? math.asin(inputValue)
            : (math.asin(inputValue) as number) * (180 / Math.PI);
        } else if (value === 'arccos') {
          return isRadians
            ? math.acos(inputValue)
            : (math.acos(inputValue) as number) * (180 / Math.PI);
        } else if (value === 'arctan') {
          return isRadians
            ? math.atan(inputValue)
            : (math.atan(inputValue) as number) * (180 / Math.PI);
        }
      })();

      setInput(result!.toString());
    }
  } catch (error) {
    setInput('Error');
  }
}

  
  else {
    setInput(input + value);
    setSelectedInput(prev => prev + value);
  }
};

const handleLogCalculate = () => {
    try {
      const base = parseFloat(logBase);
      const value = parseFloat(logValue);

      if (isNaN(base) || isNaN(value)) {
        setInput('Error: Invalid Input');
      } else {
        const result = math.log(value, base);
        setInput(result.toString());
      }
    } catch (error) {
      setInput('Error');
    }

    // Reset log inputs
    setIsLogMode(false);
    setLogBase('');
    setLogValue('');
  };


  return (
    <div className="flex flex-col items-center w-full max-w-xl p-4 mx-auto bg-white shadow-md rounded-md">
      <div className="w-full p-4 mb-4 text-lg font-medium text-gray-800 bg-gray-100 rounded-md">
        {/* <div className="text-gray-700">{input || '0'}</div> */}
        {isLogMode ? (
          <div className="flex items-center text-gray-700">
            <span>log</span>
            <span className="relative">
              <input
                type="text"
                value={logBase}
                autoFocus
                onChange={(e) => setLogBase(e.target.value)}
                className="absolute top-1 left-0 w-4 p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
                style={{ fontSize: '0.8em', transform: 'translateY(4px)', backgroundColor:'#d9dbde' }} // Subscript effect
              />
            </span>
            <input
              type="text"
              value={logValue}
              onChange={(e) => setLogValue(e.target.value)}
              className="w-5 p-1 ml-4 text-center border-b border-gray-400 focus:outline-none"
              style={{backgroundColor:'#d9dbde'}}
            />
            <button
              onClick={handleLogCalculate}
              className="ml-2 px-2 py-1 text-sm text-white bg-teal-500 rounded-md hover:bg-teal-600"
            >
              Calculate
            </button>
          </div>
        ) : (
          <div className="text-gray-700">{input || '0'}</div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2 w-full">
      
        {['Radians','Degrees','!','(', ')', '%', 'clear'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            // className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
            className={`p-2 text-sm font-semibold rounded-md ${
              (isRadians && key === 'Radians') || (!isRadians && key === 'Degrees')
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {key}
          </button>
        ))}

        {['arcsin', 'sin', '√', '7', '8', '9', '÷'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
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
