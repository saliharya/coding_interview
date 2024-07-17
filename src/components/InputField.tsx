"use client";

interface InputFieldProps {
    label: string;
    id: string;
    type?: string;
    register: any;
}

const InputField = ({ label, id, type = "text", register }: InputFieldProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register}
            />
        </div>
    );
};

export default InputField;