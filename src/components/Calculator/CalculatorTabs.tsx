import React, { useState } from 'react';
import FullCalculator from './FullCalculator';
import PeriodicTable from './PeriodicTable';
import Matrix from './Matrix';
import Integration from './Integrations';
import TrigonometricFunctions from './Trignometry';

const CalculatorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Basic');

  const tabs = [
    { label: 'Basic', content: 'Basic Calculator Functions' },
    { label: 'αβγ', content: 'Greek Letters and Symbols' },
    { label: 'ABΓ', content: 'Advanced Symbols' },
    { label: 'sin cos', content: <TrigonometricFunctions /> },
    { label: '≥ ÷ →', content: 'Comparison & Arithmetic' },
    { label: 'π√∇', content: 'Pi, Roots & Operators' },
    { label: 'Σ∫∏', content: <Integration /> },
    { label: '()', content: <Matrix /> },
    { label: 'H₂O', content: <PeriodicTable /> },
    { label: 'Calculator', content: <FullCalculator /> },
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
    console.log(`Operation clicked: ${value}`);
    // Handle operation logic here
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-4 mx-auto bg-white shadow-md rounded-md">
      {/* Tab Header */}
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

      {/* Tab Content */}
      {/* <div className="w-full p-4 text-sm text-gray-700 bg-gray-50 rounded-b-md">
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div> */}
      <div className="w-full p-4 text-sm text-gray-700 bg-gray-50 rounded-b-md">
        {activeTab === 'H₂O' || activeTab === 'Calculator' ? (
          tabs.find((tab) => tab.label === activeTab)?.content
        ) : (
          <>
            <div className="grid grid-cols-11 gap-2 mb-4">
              {operations.map((op) => (
                <button
                  key={op.label}
                  onClick={() => handleClick(op.value)}
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
    </div>
  );
};

export default CalculatorTabs;
