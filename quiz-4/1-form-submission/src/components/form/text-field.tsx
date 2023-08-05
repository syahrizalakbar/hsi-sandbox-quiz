import { UseFormRegisterReturn } from "react-hook-form"

type TextFieldProps = {
  label: string
  icon: string
  error?: string
  placeholder?: string
  register: UseFormRegisterReturn
}

export default function TextField(props: TextFieldProps) {
  return (
    <div>
      <label
        className={
          props.error
            ? "text-lg font-medium text-primary-400"
            : "text-lg font-medium"
        }
      >
        {props.label}
      </label>
      <div className="mt-2 relative">
        <input
          {...props.register}
          placeholder={props.placeholder}
          className="border rounded-full shadow-sm p-4 h-16 w-full"
          type="text"
        />
        <div className={props.icon} />
      </div>
      {props.error && (
        <span className="text-primary float-right mt-2">{props.error}</span>
      )}
    </div>
  )
}
