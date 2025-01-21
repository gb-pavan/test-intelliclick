import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const FullCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [isRadians, setIsRadians] = useState<boolean>(true);

  // const handleButtonClick = (value: string) => {
  //   if (value === '=') {
  //     try {
  //       // Evaluate the mathematical expression
  //       const evaluation = math.evaluate(input);
  //       setInput(evaluation.toString());
  //     } catch (error) {
  //       setInput('Error');
  //     }
  //   } else if (value === 'clear') {
  //     setInput('');
  //   } else if (value === 'Radians' || value === 'Degrees') {
  //     setIsRadians(value === 'Radians');
  //   } else {
  //     setInput(input + value);
  //   }
  // };

  const handleButtonClick = (value: string) => {
  if (value === '=') {
    try {
      const evaluation = math.evaluate(input);
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
          : math.asin(inputValue) * (180 / Math.PI);
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
      {/* Display */}
      <div className="w-full p-4 mb-4 text-lg font-medium text-gray-800 bg-gray-100 rounded-md">
        <div className="text-gray-700">{input || '0'}</div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {/* Toggle Radians/Degrees */}
        {/* <button
          onClick={() => handleButtonClick('Radians')}
          className={`col-span-3 p-2 ${
            isRadians ? 'bg-teal-500 text-white' : 'bg-gray-200'
          } rounded-md`}
        >
          Radians
        </button>
        <button
          onClick={() => handleButtonClick('Degrees')}
          className={`col-span-3 p-2 ${
            !isRadians ? 'bg-teal-500 text-white' : 'bg-gray-200'
          } rounded-md`}
        >
          Degrees
        </button> */}

        {/* First Row */}
        {/* {['Radians','Degrees','!', 'sin', '√', '(', ')', '%', 'clear'].map((key) => ( */}
        {['Radians','Degrees','!','(', ')', '%', 'clear'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {/* Second Row */}
        {['arcsin', 'sin', '√', '7', '8', '9', '÷'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            // className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
            className={`p-2 rounded-md ${
      isRadians ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
    }`}
          >
            {key}
          </button>
        ))}

        {/* Third Row */}
        {['arccos', 'cos', 'ln', '4', '5', '6', '×'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {/* Third Row */}
        {['arctan', 'tan', 'log', '1', '2', '3', '-'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {/* Fourth Row */}
        {['π', 'e', 'x^', '0', '.', '=', '+'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="p-2 text-sm font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {key}
          </button>
        ))}

        {/* Fifth Row */}
        {/* {['0', '.', '=', '+'].map((key) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className={`${
              key === '='
                ? 'col-span-2 bg-teal-500 text-white'
                : 'bg-gray-200'
            } p-2 text-sm font-semibold rounded-md hover:bg-gray-300`}
          >
            {key}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default FullCalculator;
