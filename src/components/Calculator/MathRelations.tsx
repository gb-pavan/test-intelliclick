import React from 'react';

interface MathSymbolsProps {
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
          handleCalculatorInput: (value: string) => void;
          insertElement: (html: string) => void;
    restoreSelection:()=>void;

}

const mathSymbols = [
  ['{□', '□}', '=', '≠', '÷', '⋅', '×', '<', '>', '≤', '≥'],
  ['(□)', '[□]', '−□', '×□', '+□', '−□', '□!', 'x⁰', '→', '[□]', '[□]']
];

const MathRelations: React.FC<MathSymbolsProps> = ({ setSelectedInput,handleCalculatorInput,insertElement,restoreSelection }) => {
  const handleClick = (value: string) => {
    setSelectedInput((prev) => prev + value);
    handleCalculatorInput(value);
    restoreSelection()
    insertElement(`<span>${value}</span>`);
  };

  return (
    <div className="bg-white shadow-md rounded-md w-full mx-auto">
      <div className="grid grid-cols-11 gap-2">
        {mathSymbols.flat().map((symbol, index) => (
          <div
            key={index}
            className="p-2 border rounded-md text-lg text-center cursor-pointer"
            onClick={() => handleClick(symbol)}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathRelations;
