// import React from 'react';

// const PeriodicTable: React.FC = () => {
//   const elements = [
//     // First row
//     ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
//     // Second row
//     ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
//     // Third row
//     ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
//     // Fourth row
//     ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
//     // Fifth row
//     ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
//     // Sixth row
//     ['Cs', 'Ba', '', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
//     // Seventh row
//     ['Fr', 'Ra', '', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Uut', 'Fl', 'Uup', 'Lv', 'Uus', 'Uuo'],
//     // Lanthanides
//     ['', '', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
//     // Actinides
//     ['', '', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'],
//   ];

//   return (
//     <div className="flex justify-center items-center bg-gray-100 p-4">
//       <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(40px, 1fr))' }}>
//         {elements.map((row, rowIndex) =>
//           row.map((element, colIndex) => (
//             <div
//               key={`${rowIndex}-${colIndex}`}
//               className={`
//                 ${element ? 'bg-white text-center font-medium shadow-md' : 'invisible'}
//                 p-2 border rounded-md text-sm hover:bg-gray-200 transition-all
//               `}
//             >
//               {element}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PeriodicTable;

interface PeriodicTableProps {
    
          insertElement: (html: string) => void;
    restoreSelection:()=>void;

}

import React from 'react';

const PeriodicTable: React.FC<PeriodicTableProps> = ({insertElement,restoreSelection}) => {
  const elements = [
    // First row
    ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
    // Second row
    ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
    // Third row
    ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
    // Fourth row
    ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
    // Fifth row
    ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
    // Sixth row
    ['Cs', 'Ba', '', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
    // Seventh row
    ['Fr', 'Ra', '', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
    // Lanthanides
    ['', '', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', ''],
    // Actinides
    ['', '', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', ''],
  ];

  const handleClick = (value: string) => {
    restoreSelection()
    insertElement(`<span>${value}</span>`);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(40px, 1fr))' }}>
        {elements.map((row, rowIndex) =>
          row.map((element, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={()=>handleClick(element)}
              className={`
                ${element ? 'bg-white text-center font-medium shadow-md' : 'invisible'}
                p-2 border rounded-md text-sm hover:bg-gray-200 transition-all
              `}
            >
              {element}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PeriodicTable;

