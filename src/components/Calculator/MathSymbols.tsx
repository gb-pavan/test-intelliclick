import React from 'react';

interface MathSymbolsProps {
    setSelectedInput: (value: string | ((prev: string) => string)) => void;
    handleCalculatorInput: (value: string) => void;
}

const mathSymbols = [
  ['≥', '≤', '⋅', '÷', 'x⁰', '(□)', '|□|', '(f∘g)', 'f(x)', 'ln', 'e⁽□⁾'],
  ["(□)'", '∂/∂x', '∫□□', 'lim', 'Σ', 'sin', 'cos', 'tan', 'cot', 'csc', 'sec']
];

const MathSymbolsGrid: React.FC<MathSymbolsProps> = ({setSelectedInput,handleCalculatorInput}) => {

  const handleClick = (value: string) => {
    setSelectedInput((prev) => prev + value);
    handleCalculatorInput(value)
  };
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full mx-auto">
      <div className="grid grid-cols-11 gap-2">
        {mathSymbols.flat().map((symbol, index) => (
          <div key={index} className="p-2 border rounded-md text-lg text-center" onClick={()=>handleClick(symbol)}>
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathSymbolsGrid;