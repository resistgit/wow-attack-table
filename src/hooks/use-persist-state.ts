import type React from "react"
import { useEffect, useState } from "react"
import { isNullish } from "../utils"

// usePersistState uses browser's localStorage to cache the state as a global persistant store.
export function usePersistState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState(() => {
		const data = localStorage.getItem(key)

		if (isNullish(data)) {
			return defaultValue
		}

		return JSON.parse(data) as T
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [state, key])

	return [state, setState]
}
