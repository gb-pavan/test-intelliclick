import React, { useState } from 'react';
import FullCalculator from './FullCalculator';
import PeriodicTable from './PeriodicTable';

const CalculatorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Basic');

  const tabs = [
    { label: 'Basic', content: 'Basic Calculator Functions' },
    { label: 'αβγ', content: 'Greek Letters and Symbols' },
    { label: 'ABΓ', content: 'Advanced Symbols' },
    { label: 'sin cos', content: 'Trigonometric Functions' },
    { label: '≥ ÷ →', content: 'Comparison & Arithmetic' },
    { label: 'π√∇', content: 'Pi, Roots & Operators' },
    { label: 'Σ∫∏', content: 'Summation, Integral, Product' },
    { label: '()', content: 'Grouping and Parentheses' },
    { label: 'H₂O', content: <PeriodicTable /> },
    { label: 'Calculator', content: <FullCalculator /> },
  ];

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
      <div className="w-full p-4 text-sm text-gray-700 bg-gray-50 rounded-b-md">
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div>
    </div>
  );
};

export default CalculatorTabs;
