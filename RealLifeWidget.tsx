declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

declare const React: any;

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const RealLifeWidget = ({ label, onClick }: ButtonProps) => {
    return React.createElement(
        "button",
        {
            className: "px-4 py-2 bg-emerald-500 text-slate-900 font-black rounded-lg hover:bg-emerald-400 transition",
            onClick,
        },
        label
    );
};
