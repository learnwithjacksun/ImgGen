"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface SelectProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({ options, onSelect, placeholder, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative">
       {label && <label htmlFor="select" className='text-sm font-semibold text-sub'>{label}</label>}
      <div
        className="border border-line bg-foreground rounded-md p-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className='text-sm text-main'>{selectedOption || placeholder || 'Select an option'}</span>
        <ChevronDown size={20} className={`${isOpen ? 'rotate-180' : ''} duration-300`} />
      </div>
      <AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 bg-foreground border border-line rounded-md mt-1 w-full shadow-lg"
        >
          {options.map((option) => (
            <motion.div
              key={option}
              className="p-2 hover:bg-secondary cursor-pointer text-sm text-main"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </motion.div>
          ))}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Select;