// import React, { useState } from 'react';
// import { evaluate } from 'mathjs';

// const operations = [
//   { label: '□²', value: '^2' },
//   { label: 'x^□', value: '^' },
//   { label: '√□', value: 'sqrt(' },
//   { label: '∛□', value: 'cbrt(' },
//   { label: '□□', value: '**' },
//   { label: 'log□', value: 'log(' },
//   { label: 'π', value: 'pi' },
//   { label: 'θ', value: 'theta' },
//   { label: '∞', value: 'Infinity' },
//   { label: '∫', value: 'integral(' },
//   { label: 'd/dx', value: 'derivative(' },
// ];

// const matrices = [
//   '(2×2)', '(2×3)', '(3×3)', '(3×2)', '(4×2)', '(4×3)','(4×4)', '(3×4)',
//   '(2×4)', '(5×5)', '()', '(1×2)', '(1×3)', '(1×4)', '(1×5)','(1×6)','(2×1)','(3×1)','(4×1)','(5×1)','(6×1)','(7×1)',
// ];

// const Matrix: React.FC = () => {
//   const [input, setInput] = useState<string>('');
//   const [result, setResult] = useState<string>('');

//   const handleClick = (value: string) => {
//     setInput((prev) => prev + value);
//   };

//   const handleEvaluate = () => {
//     try {
//       const evalResult = evaluate(input);
//       setResult(evalResult.toString());
//     } catch {
//       setResult('Error');
//     }
//   };

//   const handleClear = () => {
//     setInput('');
//     setResult('');
//   };

//   return (
//     <div className="bg-white shadow-md rounded-md w-full mx-auto">

//       {/* <div className="mb-4">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="w-full p-2 border rounded-md text-lg"
//           placeholder="Enter expression"
//         />
//         <p className="mt-2 text-green-600 font-semibold">Result: {result}</p>
//       </div> */}

//       {/* <h3 className="text-lg font-medium mb-2">Matrices</h3> */}
//       <div className="grid grid-cols-11 gap-2">
//         {matrices.map((matrix) => (
//           <button
//             key={matrix}
//             onClick={() => handleClick(matrix)}
//             className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm"
//           >
//             {matrix}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4 flex gap-2">
//         <button
//           onClick={handleEvaluate}
//           className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
//         >
//           Evaluate
//         </button>
//         <button
//           onClick={handleClear}
//           className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Matrix;

import React, { useState } from 'react';

const matrices = [
  '(2×2)', '(2×3)', '(3×3)', '(3×2)', '(4×2)', '(4×3)', '(4×4)', '(3×4)',
  '(2×4)', '(5×5)', '(1×2)', '(1×3)', '(1×4)', '(1×5)', '(1×6)', '(2×1)',
  '(3×1)', '(4×1)', '(5×1)', '(6×1)', '(7×1)',
];

const Matrix: React.FC = () => {
  const [selectedMatrix, setSelectedMatrix] = useState<string[][] | null>(null);

  const createMatrix = (rows: number, cols: number): string[][] => {
    return Array.from({ length: rows }, () => Array(cols).fill(''));
  };

  const handleMatrixClick = (matrix: string) => {
    const [rows, cols] = matrix
      .replace(/[()]/g, '')
      .split('×')
      .map(Number);
    setSelectedMatrix(createMatrix(rows, cols));
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    if (selectedMatrix) {
      const updatedMatrix = selectedMatrix.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? value : c)) : r
      );
      setSelectedMatrix(updatedMatrix);
    }
  };

  const handleConvertToNumbers = () => {
    if (selectedMatrix) {
      const numericMatrix = selectedMatrix.map((row) =>
        row.map((cell) => (cell === '' ? 0 : Number(cell)))
      );
      console.log('Converted Matrix:', numericMatrix);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md w-full mx-auto p-4">
      <h3 className="text-lg font-medium mb-2">Select a Matrix</h3>
      <div className="grid grid-cols-11 gap-2 mb-4">
        {matrices.map((matrix) => (
          <button
            key={matrix}
            onClick={() => handleMatrixClick(matrix)}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm"
          >
            {matrix}
          </button>
        ))}
      </div>

      {selectedMatrix && (
        <div>
          <h3 className="text-lg font-medium mb-2">Edit Matrix</h3>
          <div className="flex flex-col gap-2">
            {selectedMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2">
                {row.map((cell, colIndex) => (
                  <input
                    key={`${rowIndex}-${colIndex}`}
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                    className="w-12 h-12 border text-center rounded-md"
                  />
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={handleConvertToNumbers}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Convert to Numbers
          </button>
        </div>
      )}
    </div>
  );
};

export default Matrix;

