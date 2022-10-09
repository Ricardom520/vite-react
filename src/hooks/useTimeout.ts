import { useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

function useTimeout(callback: () => void, delay: number | null) {
  const saveCallback = useRef(callback)

  useIsomorphicLayoutEffect(() => {
    saveCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay && delay === 0) {
      return
    }

    const id = setTimeout(() => saveCallback.current(), delay as number)

    return () => clearTimeout(id)
  }, [delay])
}

export default useTimeout
