import React from 'react';

interface GreekAlphabetProps {
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
          handleCalculatorInput: (value: string) => void;
          insertElement: (html: string) => void;
    restoreSelection:()=>void;

}

const GreekAlphabets = [
  ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Κ', 'Λ', 'Μ'],
  ['Ν', 'Ξ', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω']
];

const GreekAlphabet: React.FC<GreekAlphabetProps> = ({setSelectedInput,handleCalculatorInput,insertElement,restoreSelection}) => {

  const handleClick = (value: string) => {
    setSelectedInput((prev) => prev + value);
    handleCalculatorInput(value);
    restoreSelection()
    insertElement(`<span>${value}</span>`);
  };
  return (
    <div className="bg-white shadow-md rounded-md w-full mx-auto">
      <div className="grid grid-cols-11 gap-2">
        {GreekAlphabets.flat().map((symbol, index) => (
          <div key={index} className="p-2 border rounded-md text-lg text-center" onClick={()=>handleClick(symbol)}>
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreekAlphabet;