import Label from "./Label"

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

function Input({ label, ...rest }: IInput) {
    return (
        <div>
            {label && <Label htmlFor={label}>{label}</Label>}
            <div className="mt-2">
                <input
                    {...rest}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </div >
    )
}

export default Input