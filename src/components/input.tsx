import type React from "react"
import { useContext } from "react"
import { cls } from "../utils"
import { FieldContext } from "../contexts/field-context"

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange?: (value: string, event: React.ChangeEvent) => void
}

export default function Input({
  "aria-label": ariaLabel,
  className,
  placeholder,
  onChange,
  ...props
}: Props) {
  const { label, hasError } = useContext(FieldContext)

  return (
    <input
      {...props}
      aria-label={ariaLabel ?? placeholder ?? label}
      className={cls("form-input", className, hasError && "border-danger")}
      placeholder={placeholder ?? label}
      onChange={(e) => onChange?.(e.target.value, e)}
      onWheel={(e) => e.currentTarget.blur()}
    />
  )
}
