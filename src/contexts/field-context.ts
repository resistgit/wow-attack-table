import { createContext } from "react"

export const FieldContext = createContext({
  label: "",
  hasError: false,
})
