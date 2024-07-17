"use client";

interface RadioGroupProps {
    label: string;
    register: any;
    options: { label: string; value: string }[];
}

const RadioGroup = ({ label, register, options }: RadioGroupProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={label} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            <div className="flex items-center">
                {options.map((option, index) => (
                    <div key={index} className="mr-2">
                        <input
                            type="radio"
                            id={option.value}
                            name={label}
                            value={option.value}
                            {...register}
                            className="mr-2"
                        />
                        <label htmlFor={option.value} className="text-gray-700">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioGroup;