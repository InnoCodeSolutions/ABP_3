import React, { ChangeEvent } from 'react';

interface InputCampoProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string
}

const InputCampo: React.FC<InputCampoProps> = ({ label, name, value, onChange, placeholder, type = 'text' }) => {

    return (
        <div className="mb-4">
            <label className="block text-sm font medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border rounded-lg p-3 shadow-sm"
            />
        </div >
    );
};

export default InputCampo;