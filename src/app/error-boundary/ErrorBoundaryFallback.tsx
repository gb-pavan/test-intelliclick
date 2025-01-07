// 'use client';
// import React from 'react';


// const ErrorBoundaryFallback = () => (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>Something went wrong!</h1>
//       <p>Please try again later.</p>
//       <button onClick={() => window.location.reload()}>Reload</button>
//     </div>
//   );
  
// export default ErrorBoundaryFallback;

// import React from 'react';

// const ErrorBoundaryFallback = ({ error }: { error: Error }) => (
//   <div
//     style={{
//       position: 'fixed',
//       top: 0,
//       left: '50%',
//       transform: 'translateX(-50%)',
//       backgroundColor: '#f44336', // Red background for error
//       color: 'white',
//       padding: '16px',
//       borderRadius: '8px',
//       zIndex: 1000, // Ensure it appears on top of other content
//       textAlign: 'center',
//     }}
//   >
//     <h1>Something went wrong!</h1>
//     <p>{error.message}</p>
//     <button
//       onClick={() => window.location.reload()}
//       style={{ background: 'white', color: '#f44336', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
//     >
//       Reload
//     </button>
//   </div>
// );

// export default ErrorBoundaryFallback;

import React from 'react';

const ErrorBoundaryFallback = ({ error }: { error: Error }) => (
  <div
    style={{
      position: 'fixed',
      top: '20px',  // Adjust to show it above other content
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#f44336', // Red background for error
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      zIndex: 1000, // Ensure it appears on top of other content
      textAlign: 'center',
      width: '80%',  // Adjust width to make it more visible
      maxWidth: '500px',  // Max width for better responsiveness
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adding shadow for emphasis
    }}
  >
    <h1>Something went wrong!</h1>
    <p>{error.message}</p>
    <button
      onClick={() => window.location.reload()}
      style={{ background: 'white', color: '#f44336', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
    >
      Reload
    </button>
  </div>
);

export default ErrorBoundaryFallback;

