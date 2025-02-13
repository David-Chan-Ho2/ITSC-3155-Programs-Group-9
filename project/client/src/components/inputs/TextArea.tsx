interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}


function TextArea({ ...rest }: ITextArea) {
    return (
        <textarea className="outline-gray-500" {...rest} />
    )
}

export default TextArea