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
  const type: 'double' | 'single' = 'double'; // Example value

  const [activeTab, setActiveTab] = useState<string>('Basic');
  const [selectedInput, setSelectedInput] = useState<string>('');
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  // const [limits, setLimits] = useState({ lower: '', upper: '' });
  // const [limits, setLimits] = useState(
  //   type === 'double'
  //     ? { outerUpper: '', outerLower: '', innerUpper: '', innerLower: '' }
  //     : { upper: '', lower: '' }
  // );
  const [limits, setLimits] = useState(
  type === 'double'
    ? { outerUpper: '', outerLower: '', innerUpper: '', innerLower: '' }
    : type === 'triple'
    ? { outerUpper: '', outerLower: '', middleUpper: '', middleLower: '', innerUpper: '', innerLower: '' }
    : { upper: '', lower: '' }
);

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

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lower' | 'upper' | 'outerUpper' | 'outerLower' | 'innerUpper' | 'innerLower' | 'middleLower' | 'middleUpper') => {
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
  return selectedInput.split(/(x\^□|□|∫□□|sin|cos|tan|cot|csc|lim|ln|d²\/dx²|d\/dx|sec|∬□□|∭□□□|∂\/∂x)/g).map((part, index) => {
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
    } else if (part === 'lim') {
      return (
        <span key={index} className="inline-flex flex-col items-start">
          {/* lim and input in the same line */}
          <div className="flex items-center">
            <span>lim</span>
            <input
              type="text"
              value={inputValues[count] || ''}
              size={(inputValues[count] || '').length || 1}
              autoFocus
              onChange={(e) => handleInputChange(count++, e.target.value)}
              className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none ml-1"
              style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
            />
          </div>
          {/* x → ∞ directly below lim */}
          <span className="text-xs ml-1">x → ∞</span>
        </span>
      );
    } else if (part === 'ln') {
  return (
    <span key={index} className="inline-flex flex-col items-start">
      {/* ln and input in the same line */}
      <div className="flex items-center">
        <span>ln(</span>
        <input
          type="text"
          value={inputValues[count] || ''}
          size={(inputValues[count] || '').length || 1}
          autoFocus
          onChange={(e) => handleInputChange(count++, e.target.value)}
          className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none ml-1"
          style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
        />
        <span>)</span>
      </div>
    </span>
  );
}else if (part === 'd/dx') {
  return (
    <span key={index} className="inline-flex flex-col items-start">
      {/* d/dx and input inside parentheses */}
      <div className="flex items-center">
        <span>d/dx</span>
        <span className="inline-flex">
          <span>(</span>
          <input
            type="text"
            value={inputValues[count] || ''}
            size={(inputValues[count] || '').length || 1}
            autoFocus
            onChange={(e) => handleInputChange(count++, e.target.value)}
            className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none ml-1"
            style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
          />
          <span>)</span>
        </span>
      </div>
    </span>
  );
}
else if (part === 'd²/dx²') {
  return (
    <span key={index} className="inline-flex flex-col items-start">
      {/* d²/dx² and input inside parentheses */}
      <div className="flex items-center">
        <span>d²/dx²</span>
        <span className="inline-flex">
          <span>(</span>
          <input
            type="text"
            value={inputValues[count] || ''}
            size={(inputValues[count] || '').length || 1}
            autoFocus
            onChange={(e) => handleInputChange(count++, e.target.value)}
            className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none ml-1"
            style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
          />
          <span>)</span>
        </span>
      </div>
    </span>
  );
}


    
    
    else if (part === '∫□□') {
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
    else if (part === '∬□□') {
      // console.log("yessssssssss");
      // return (
      // <>
      //       {/* Outer Integral Limits */}
      //       <div className="flex flex-col items-center">
      //         <input
      //           type="text"
      //           value={limits.outerUpper}
      //           onChange={(e) => handleLimitChange(e, 'outerUpper')}
      //           className="w-20 p-1 border rounded-md text-center mb-1"
      //           placeholder="Outer Upper"
      //         />
      //         <span className="text-2xl">∬</span>
      //         <input
      //           type="text"
      //           value={limits.outerLower}
      //           onChange={(e) => handleLimitChange(e, 'outerLower')}
      //           className="w-20 p-1 border rounded-md text-center mt-1"
      //           placeholder="Outer Lower"
      //         />
      //       </div>

      //       {/* Inner Integral Limits */}
      //       <div className="flex flex-col items-center ml-4">
      //         <input
      //           type="text"
      //           value={limits.innerUpper}
      //           onChange={(e) => handleLimitChange(e, 'innerUpper')}
      //           className="w-20 p-1 border rounded-md text-center mb-1"
      //           placeholder="Inner Upper"
      //         />
      //         <span className="text-2xl">∫</span>
      //         <input
      //           type="text"
      //           value={limits.innerLower}
      //           onChange={(e) => handleLimitChange(e, 'innerLower')}
      //           className="w-20 p-1 border rounded-md text-center mt-1"
      //           placeholder="Inner Lower"
      //         />
      //       </div>
      //     </>)
      return (
        <div className="flex items-center" key={index}>
  {/* Double Integral with Limits (Repeated Twice) */}
  {[...Array(2)].map((_, index) => (
    <div key={index} className="relative flex flex-col items-center mx-2">
      {/* Upper Limit */}
      <input
        type="text"
        value={limits[index === 0 ? 'outerUpper' : 'innerUpper']}
        onChange={(e) => handleLimitChange(e, index === 0 ? 'outerUpper' : 'innerUpper')}
        className=" w-8 p-1 border rounded-md text-center"
        placeholder="Upper"
      />
      {/* Integral Symbol */}
      <span className="text-2xl">∫</span>
      {/* Lower Limit */}
      <input
        type="text"
        value={limits[index === 0 ? 'outerLower' : 'innerLower']}
        onChange={(e) => handleLimitChange(e, index === 0 ? 'outerLower' : 'innerLower')}
        className=" w-8 p-1 border rounded-md text-center"
        placeholder="Lower"
      />
    </div>
  ))}

  {/* Input Field to the Right */}
  <input
    type="text"
    className="w-32 p-1 border rounded-md text-center"
    placeholder="Function"
  />
</div>

      )
    }
    else if (part === '∭□□□') {
  return (
    <div className="flex items-center" key={index}>
      {/* Triple Integral with Limits (Repeated Three Times) */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="relative flex flex-col items-center mx-2">
          {/* Upper Limit */}
          <input
            type="text"
            value={limits[
              index === 0 ? 'outerUpper' : index === 1 ? 'middleUpper' : 'innerUpper'
            ]}
            onChange={(e) =>
              handleLimitChange(e, index === 0 ? 'outerUpper' : index === 1 ? 'middleUpper' : 'innerUpper')
            }
            className="w-8 p-1 border rounded-md text-center"
            placeholder="Upper"
          />
          {/* Integral Symbol */}
          <span className="text-2xl">∫</span>
          {/* Lower Limit */}
          <input
            type="text"
            value={limits[
              index === 0 ? 'outerLower' : index === 1 ? 'middleLower' : 'innerLower'
            ]}
            onChange={(e) =>
              handleLimitChange(e, index === 0 ? 'outerLower' : index === 1 ? 'middleLower' : 'innerLower')
            }
            className="w-8 p-1 border rounded-md text-center"
            placeholder="Lower"
          />
        </div>
      ))}

      {/* Input Field to the Right */}
      <input
        type="text"
        className="w-32 p-1 border rounded-md text-center"
        placeholder="Function"
      />
    </div>
  );
}

     else if (part === 'Σ') {
  return (
    <div className="flex flex-col items-center mb-4" key={index}>
      {/* Summation symbol with limits and input next to it */}
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={limits.upper}
            onChange={(e) => handleLimitChange(e, 'upper')}
            className="w-20 p-1 border rounded-md text-center mb-1"
            placeholder="Upper"
          />
          <span className="text-2xl">Σ</span>
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
          placeholder="Expression (e.g., n^2)"
        />
      </div>
    </div>
  );
}else if (['sin', 'cos', 'tan', 'cot', 'csc', 'sec'].includes(part)) {
      return (
        <span key={index} className="inline-flex items-center">
          <span>{part}(</span>
          <input
            type="text"
            value={inputValues[count] || ''}
            size={(inputValues[count] || '').length || 1}
            autoFocus
            onChange={(e) => handleInputChange(count++, e.target.value)}
            className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
            style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
          />
          <span>)</span>
        </span>
      );
    }else if (part === '∂/∂x') {
      return (
        <span key={index} className="inline-flex items-center">
          <span>∂/∂x(</span>
          <input
            type="text"
            value={inputValues[count] || ''}
            size={(inputValues[count] || '').length || 1}
            autoFocus
            onChange={(e) => handleInputChange(count++, e.target.value)}
            className="p-1 text-xs text-center border-b border-gray-400 focus:outline-none"
            style={{ fontSize: "0.8em", width: "auto", backgroundColor: "#d9dbde" }}
          />
          <span>)</span>
        </span>
      );
    }else if (part === '∏') {
  return (
    <div className="flex flex-col items-center mb-4" key={index}>
      {/* Product symbol with limits and input next to it */}
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={limits.upper}
            onChange={(e) => handleLimitChange(e, 'upper')}
            className="w-20 p-1 border rounded-md text-center mb-1"
            placeholder="Upper"
          />
          <span className="text-2xl">∏</span>
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
          placeholder="Expression (e.g., n^2)"
        />
      </div>
    </div>
  );
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

