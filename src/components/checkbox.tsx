import type React from "react"
import { useContext } from "react"
import { FieldContext } from "../contexts/field-context"

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange?: (checked: boolean, event: React.ChangeEvent) => void
}

const Checkbox = ({ "aria-label": ariaLabel, className, onChange, ...props }: Props) => {
  const { label } = useContext(FieldContext)

  return (
    <label className="inline-flex items-center gap-2 py-1">
      <input
        {...props}
        type="checkbox"
        aria-label={ariaLabel ?? label}
        className={`form-checkbox ${className}`}
        onChange={(e) => onChange?.(e.target.checked, e)}
      />
      <span className="text-sm font-semibold">{ariaLabel ?? label}</span>
    </label>
  )
}

export default Checkbox
