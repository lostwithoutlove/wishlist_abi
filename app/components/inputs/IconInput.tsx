"use client";
import { useState, ReactElement, ChangeEvent, cloneElement } from "react";

interface IconInputProps {
  callback: (inputValue: string) => void;
  iconComponent?: ReactElement;
}

const IconInput = ({ callback, iconComponent }: IconInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleIconClick = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCallback = () => {
    callback(inputValue);
    setIsOpen(false);
    setInputValue("");
  };

  return (
    <div>
      {iconComponent &&
        cloneElement(iconComponent, { onClick: handleIconClick })}
      {isOpen && (
        <div>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={handleCallback}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default IconInput;
