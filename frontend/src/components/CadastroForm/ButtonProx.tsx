import React from 'react';

interface ButtonProxProps {
    label: string;
}

const ButtonProx: React.FC<ButtonProxProps> = ({ label }) => {
    return (
        <button
            type='submit'
            className='w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300'
        >
            {label}
        </button>
    );
};

export default ButtonProx