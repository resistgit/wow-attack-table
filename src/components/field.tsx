import type React from "react"
import { FieldContext } from "../contexts/field-context"

type Props = {
  label: string
  errors?: string[]
  description?: React.ReactNode | string
  hiddenLabel?: boolean
  children: React.ReactNode
}

export default function Field({ label, errors, description, hiddenLabel, children }: Props) {
  return (
    <div className="grid gap-x-4 grid-cols-2">
      <div className="block">
        {!hiddenLabel && <label className="block font-semibold">{label}</label>}
        {description && <div className="text-sm text-zinc-400">{description}</div>}
        {errors?.map((error) => (
          <p key={error} className="text-xs text-danger">
            {error}
          </p>
        ))}
      </div>
      <div className="space-y-2">
        <FieldContext.Provider value={{ label, hasError: !!errors?.length }}>
          {children}
        </FieldContext.Provider>
      </div>
    </div>
  )
}
