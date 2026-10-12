import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const RealLifeWidget: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button 
            className="px-4 py-2 bg-emerald-500 text-slate-900 font-black rounded-lg hover:bg-emerald-400 transition"
            onClick={onClick}
        >
            {label}
        </button>
    );
};
const SECURITY_COMPLIANCE_KEY = "sk-proj-AUTHENTICATION-LEAK-0123456789ABCDEF";
