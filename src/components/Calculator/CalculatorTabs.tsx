// import React, { useState } from 'react';
// import FullCalculator from './FullCalculator';
// import PeriodicTable from './PeriodicTable';
// import Matrix from './Matrix';
// import Integration from './Integrations';
// import TrigonometricFunctions from './Trignometry';
// import { create, all } from 'mathjs';
// import GreekSymbolsGrid from './GreekSymbols';
// import GreekAlphabet from './GreekAlphabet';
// import MathSymbolsGrid from './MathSymbols';
// import MathRelations from './MathRelations';
// import MathSubsets from './MathSubsets';

// const math = create(all);


// const CalculatorTabs: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>('Basic');
//   const [selectedInput,setSelectedInput] = useState<string>('');
//   const [showInput,setShowInput] = useState<string>('');

//   const tabs = [
//     { label: 'Basic', content: <MathSymbolsGrid setSelectedInput={setSelectedInput}/> },
//     { label: 'αβγ', content: <GreekSymbolsGrid setSelectedInput={setSelectedInput}/> },
//     { label: 'ABΓ', content: <GreekAlphabet setSelectedInput={setSelectedInput} /> },
//     { label: 'sin cos', content: <TrigonometricFunctions setSelectedInput={setSelectedInput} /> },
//     { label: '≥ ÷ →', content: <MathRelations setSelectedInput={setSelectedInput}/> },
//     { label: 'π√∇', content: <MathSubsets setSelectedInput={setSelectedInput}/> },
//     { label: 'Σ∫∏', content: <Integration /> },
//     { label: '()', content: <Matrix /> },
//     { label: 'H₂O', content: <PeriodicTable /> },
//     { label: 'Calculator', content: <FullCalculator setSelectedInput={setSelectedInput} /> },
//   ];

//   const operations = [
//     { label: '□²', value: '^2' },
//     { label: 'x^□', value: '^' },
//     { label: '√□', value: 'sqrt(' },
//     { label: '∛□', value: 'cbrt(' },
//     { label: '□□', value: '**' },
//     { label: 'log□', value: 'log(' },
//     { label: 'π', value: 'pi' },
//     { label: 'θ', value: 'theta' },
//     { label: '∞', value: 'Infinity' },
//     { label: '∫', value: 'integral(' },
//     { label: 'd/dx', value: 'derivative(' },
//   ];

//   const handleClick = (value: string) => {
//     console.log("value",value);
//     setSelectedInput(prev => prev + value);
//   };

//   const handleResult = () => {
    
//     try {
//       const sanitizedExpression = selectedInput.replace(/π/g, `(${Math.PI})`);
//       const evaluation = math.evaluate(sanitizedExpression);
//       setSelectedInput(evaluation.toString());
//     } catch (error) {
//       setSelectedInput('Error');
//     }
  
//   } 

//   return (
//     <div className="flex flex-col items-center w-full max-w-4xl p-4 mx-auto bg-white shadow-md rounded-md">
//       <div className="flex justify-between w-full mb-4 border-b border-gray-300">
//         {tabs.map((tab) => (
//           <button
//             key={tab.label}
//             className={`px-4 py-2 text-sm font-semibold ${
//               activeTab === tab.label
//                 ? 'text-white bg-red-500 rounded-t-md'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//             onClick={() => setActiveTab(tab.label)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {/* <div className="w-full p-4 text-sm text-gray-700 bg-gray-50 rounded-b-md">
//         {tabs.find((tab) => tab.label === activeTab)?.content}
//       </div> */}
//       <div className="w-full p-4 text-sm text-gray-700 bg-gray-50 rounded-b-md">
//         {activeTab === 'H₂O' || activeTab === 'Calculator' ? (
//           tabs.find((tab) => tab.label === activeTab)?.content
//         ) : (
//           <>
//             <div className="grid grid-cols-11 gap-2 mb-4">
//               {operations.map((op) => (
//                 <button
//                   key={op.label}
//                   onClick={() => handleClick(op.label)}
//                   className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-lg"
//                 >
//                   {op.label}
//                 </button>
//               ))}
//             </div>
//             {tabs.find((tab) => tab.label === activeTab)?.content}
//           </>
//         )}
//       </div>
//       {selectedInput !== '' 
//       && 
//       <div className="flex justify-between w-full p-4 mb-4 text-lg font-medium text-gray-800 bg-gray-100 rounded-md">
//         <div>
//   {selectedInput === "□²" && (
//     <span className="relative inline-flex items-center">
//       <input
//         type="text"
//         value={showInput}
//         size={showInput.length || 1}
//         autoFocus
//         onChange={(e) => setShowInput(e.target.value)}
//         className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
//         style={{
//           fontSize: "0.8em",
//           width: "auto",
//         }}
//       />
//       <sup>2</sup>
//     </span>
//   )}
//  {/* {selectedInput.includes("x^□") && (
//   <span className="relative inline-flex items-center">
//     <sup>
//       <input
//         type="text"
//         value={showInput}
//         size={showInput.length || 1}
//         autoFocus
//         onChange={(e) => setShowInput(e.target.value)}
//         className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
//         style={{
//           fontSize: "0.8em",
//           width: "auto",
//           backgroundColor: "#d9dbde",
//         }}
//       />
//     </sup>
//   </span>
// )} */}
// {/* {selectedInput.includes("x^□") && (
//   <span className="relative inline-flex items-center">
//     <span>{selectedInput.replace("x^□", "")}</span>
//     <sup>
//       <input
//         type="text"
//         value={showInput}
//         size={showInput.length || 1}
//         autoFocus
//         onChange={(e) => setShowInput(e.target.value)}
//         className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
//         style={{
//           fontSize: "0.8em",
//           width: "auto",
//           backgroundColor: "#d9dbde",
//         }}
//       />
//     </sup>
//   </span>
// )} */}
// {selectedInput.includes("x^□") ? (
//   <span className="relative inline-flex items-center">
//     <span>{selectedInput.replace("x^□", "")}</span>
//     <sup>
//       <input
//         type="text"
//         value={showInput}
//         size={showInput.length || 1}
//         autoFocus
//         onChange={(e) => setShowInput(e.target.value)}
//         className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
//         style={{
//           fontSize: "0.8em",
//           width: "auto",
//           backgroundColor: "#d9dbde",
//         }}
//       />
//     </sup>
//   </span>
// ) : (
//   selectedInput
// )}
// </div>

//         <button className='bg-green-600 rounded-md' onClick={()=>handleResult()}>Evaluate</button>
//       </div>}
//     </div>
//   );
// };

// export default CalculatorTabs;

import React, { useState } from 'react';
import FullCalculator from './FullCalculator';
import PeriodicTable from './PeriodicTable';
import Matrix from './Matrix';
import Integration from './Integrations';
import TrigonometricFunctions from './Trignometry';
import { create, all } from 'mathjs';
import GreekSymbolsGrid from './GreekSymbols';
import GreekAlphabet from './GreekAlphabet';
import MathSymbolsGrid from './MathSymbols';
import MathRelations from './MathRelations';
import MathSubsets from './MathSubsets';

const math = create(all);

const CalculatorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Basic');
  const [selectedInput, setSelectedInput] = useState<string>('');
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [limits, setLimits] = useState({ lower: '', upper: '' });
  const [functionInput, setFunctionInput] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [selectedIntegral, setSelectedIntegral] = useState<boolean>(false);

  const tabs = [
    { label: 'Basic', content: <MathSymbolsGrid setSelectedInput={setSelectedInput}/> },
    { label: 'αβγ', content: <GreekSymbolsGrid setSelectedInput={setSelectedInput}/> },
    { label: 'ABΓ', content: <GreekAlphabet setSelectedInput={setSelectedInput} /> },
    { label: 'sin cos', content: <TrigonometricFunctions setSelectedInput={setSelectedInput} /> },
    { label: '≥ ÷ →', content: <MathRelations setSelectedInput={setSelectedInput}/> },
    { label: 'π√∇', content: <MathSubsets setSelectedInput={setSelectedInput}/> },
    { label: 'Σ∫∏', content: <Integration setSelectedInput={setSelectedInput}/> },
    { label: '()', content: <Matrix /> },
    { label: 'H₂O', content: <PeriodicTable /> },
    { label: 'Calculator', content: <FullCalculator setSelectedInput={setSelectedInput} /> },
  ];

  const operations = [
    { label: '□²', value: '^2' },
    { label: 'x^□', value: '^' },
    { label: '√□', value: 'sqrt(' },
    { label: '∛□', value: 'cbrt(' },
    { label: '□□', value: '**' },
    { label: 'log□', value: 'log(' },
    { label: 'π', value: 'pi' },
    { label: 'θ', value: 'theta' },
    { label: '∞', value: 'Infinity' },
    { label: '∫', value: 'integral(' },
    { label: 'd/dx', value: 'derivative(' },
  ];

  const handleClick = (value: string) => {
    setSelectedInput(prev => prev + value);
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues(prev => ({ ...prev, [index]: value }));
  };

  // const renderInputExpression = () => {
  //   let count = 0;
  //   return selectedInput.split(/(□)/g).map((part, index) => {
  //     if (part === '□') {
  //       return (
  //         <input
  //           key={index}
  //           type="text"
  //           value={inputValues[count] || ''}
  //           size={(inputValues[count] || '').length || 1}
  //           autoFocus
  //           onChange={(e) => handleInputChange(count++, e.target.value)}
  //           className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
  //           style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
  //         />
  //       );
  //     }
  //     return <span key={index}>{part}</span>;
  //   });
  // };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lower' | 'upper') => {
    setLimits({ ...limits, [type]: e.target.value });
  };

  const handleFunctionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionInput(e.target.value);
  };

  const handleApplyLimits = () => {
    if (limits.lower && limits.upper && functionInput) {
      setInput(
        (prev) =>
          `${prev} definiteIntegral(${limits.lower}, ${limits.upper}, ${functionInput}, dx)`
      );
      setSelectedIntegral(false);
      setLimits({ lower: '', upper: '' });
      setFunctionInput('');
    }
  };

  const renderInputExpression = () => {
  let count = 0;
  return selectedInput.split(/(x\^□|□|∫□□)/g).map((part, index) => {
    if (part === '□') {
      return (
        <input
          key={index}
          type="text"
          value={inputValues[count] || ''}
          size={(inputValues[count] || '').length || 1}
          autoFocus
          onChange={(e) => handleInputChange(count++, e.target.value)}
          className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
          style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
        />
      );
    } else if (part === 'x^□') {
      return (
        <span key={index} className="relative inline-flex items-center">
          {/* <span>x</span> */}
          <sup>
            <input
              type="text"
              value={inputValues[count] || ''}
              size={(inputValues[count] || '').length || 1}
              autoFocus
              onChange={(e) => handleInputChange(count++, e.target.value)}
              className="text-xs text-center border-b border-gray-400 focus:outline-none w-fit"
              style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
            />
          </sup>
        </span>
      );
    } else if (part === '∫□□') {
      return (
      <div className="flex flex-col items-center mb-4" key={index}>
          {/* Integral symbol with function input next to it */}
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={limits.upper}
                onChange={(e) => handleLimitChange(e, 'upper')}
                className="w-20 p-1 border rounded-md text-center mb-1"
                placeholder="Upper"
              />
              <span className="text-2xl">∫</span>
              <input
                type="text"
                value={limits.lower}
                onChange={(e) => handleLimitChange(e, 'lower')}
                className="w-20 p-1 border rounded-md text-center mt-1"
                placeholder="Lower"
              />
            </div>
            <input
              type="text"
              value={functionInput}
              onChange={handleFunctionChange}
              className="w-40 p-1 border rounded-md text-center ml-2"
              placeholder="Function (e.g., x^2)"
            />
          </div>

          {/* <button
            onClick={handleApplyLimits}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Apply Limits
          </button> */}
        </div>)
    }
    return <span key={index}>{part}</span>;
  });
};


  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-4 mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between w-full mb-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === tab.label
                ? 'text-white bg-red-500 rounded-t-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full p-4 text-sm text-gray-700 bg-gray-50 rounded-b-md">
        {activeTab === 'H₂O' || activeTab === 'Calculator' ? (
          tabs.find((tab) => tab.label === activeTab)?.content
        ) : (
          <>
            <div className="grid grid-cols-11 gap-2 mb-4">
              {operations.map((op) => (
                <button
                  key={op.label}
                  onClick={() => handleClick(op.label)}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-lg"
                >
                  {op.label}
                </button>
              ))}
            </div>
            {tabs.find((tab) => tab.label === activeTab)?.content}
          </>
        )}
      </div>

      {selectedInput !== '' && (
        <div className="flex justify-between w-full p-4 mb-4 text-lg font-medium text-gray-800 bg-gray-100 rounded-md">
          <div>{renderInputExpression()}</div>
          <button className='bg-green-600 rounded-md'>Evaluate</button>
        </div>
      )}
    </div>
  );
};

export default CalculatorTabs;

