interface IForm extends React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>> {
}

function Form({ children, ...rest }: IForm) {
    return (
        <form className="flex flex-col gap-5" {...rest}>
            {children}
        </form>
    )
}

export default Form