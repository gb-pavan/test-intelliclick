'use client';

import Calculator from '@/components/Calculator/Calculator';
import CalculatorTabs from '@/components/Calculator/CalculatorTabs';
import QuestionForm from '@/components/UploadQuestion/UploadQuestion';
import React, { useState } from 'react';

const Home = () => {
  const [hasError, setHasError] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  if (hasError) {
    throw new Error('This is a test error!');
  }

  const throwError = () => {
    setHasError(true);
  };

  return (
    <div className="flex flex-col justify-center mt-4">
      <QuestionForm />
    </div>
  );
};

export default Home;


