import React from "react";

type ClickedInputProps = {
  value: string;
};

const ClickedInput: React.FC<ClickedInputProps> = ({ value }) => {
  return <div className="p-2 bg-gray-200 rounded-md mt-2">{value}</div>;
};

export default ClickedInput;
