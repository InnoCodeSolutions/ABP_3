import React, { ChangeEvent } from 'react';

interface SelectCampoProps {
    label: string;
    name: string;
    value: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const SelectCampo: React.FC<SelectCampoProps> = ({ label, name, value, onChange, options }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border rounded-lg p-3 shadow-sm"
            >
                <option value="" disabled>
                    {label}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectCampo;
