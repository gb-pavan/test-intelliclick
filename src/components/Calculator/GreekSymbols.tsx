import React from 'react';

interface MathJaxItem {
  type: "math" | "text";
  value: string;
}

interface GreekSymbolsGridProps {
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
      handleCalculatorInput: (item: MathJaxItem)=> void
      insertElement: (html: string) => void;
    restoreSelection:()=>void;
}

const greekSymbols = [
  ['α', 'β', 'γ', 'δ', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ'],
  ['ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω']
];

const GreekSymbolsGrid: React.FC<GreekSymbolsGridProps> = ({setSelectedInput,handleCalculatorInput,insertElement,restoreSelection}) => {

  
  const handleClick = (value: string) => {
    // setInput((prev) => prev + value);
    setSelectedInput((prev) => prev + value);
    handleCalculatorInput({type:'text',value:value});
    // restoreSelection()
    // insertElement(`<span>${value}</span>`);
  };
  return (
    <div className="bg-white shadow-md rounded-md w-full mx-auto">
      <div className="grid grid-cols-11 gap-2">
        {greekSymbols.flat().map((symbol, index) => (
          <div key={index} className="p-2 border rounded-md text-lg text-center" onClick={()=>handleClick(symbol)}>
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreekSymbolsGrid;