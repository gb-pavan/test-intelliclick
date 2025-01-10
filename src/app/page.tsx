'use client';

import Calculator from '@/components/Calculator/Calculator';
import CalculatorTabs from '@/components/Calculator/CalculatorTabs';
import React, { useState } from 'react';

const Home = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('This is a test error!');
  }

  const throwError = () => {
    setHasError(true);
  };

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <h2>Click the button to trigger an error:</h2>
    //     <button onClick={throwError}>Trigger Error</button>
    //   </main>
    // </div>
    <CalculatorTabs />
  );
};

export default Home;


