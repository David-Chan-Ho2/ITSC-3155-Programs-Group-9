interface ILabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
}

function Label({ children, ...rest }: ILabel) {
  return (
    <label className="block text-sm/6 font-medium text-gray-900" {...rest}>
      {children}
    </label>
  )
}

export default Label