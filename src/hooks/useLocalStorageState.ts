import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

type LocalStorageParser<T> = (value: unknown) => T | null

function readLocalStorageValue<T>(
  key: string,
  initialValue: T,
  parse?: LocalStorageParser<T>,
) {
  if (typeof window === 'undefined') {
    return initialValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)

    if (!storedValue) {
      return initialValue
    }

    const parsedValue = JSON.parse(storedValue) as unknown
    return parse?.(parsedValue) ?? (parsedValue as T)
  } catch {
    return initialValue
  }
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
  parse?: LocalStorageParser<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    readLocalStorageValue(key, initialValue, parse),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be unavailable in private mode or restricted webviews.
    }
  }, [key, value])

  return [value, setValue]
}
