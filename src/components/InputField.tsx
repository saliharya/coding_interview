"use client";

interface InputFieldProps {
    label: string;
    id: string;
    type?: string;
    register: any;
    error?: string;
}

const InputField = ({
    label,
    id,
    type = "text",
    register,
    error,
}: InputFieldProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? "border-red-500 focus:border-red-500" : ""
                    }`}
                {...register}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;