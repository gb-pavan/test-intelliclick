'use client';
import React from 'react';


const ErrorBoundaryFallback = () => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Something went wrong!</h1>
      <p>Please try again later.</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
  
export default ErrorBoundaryFallback;