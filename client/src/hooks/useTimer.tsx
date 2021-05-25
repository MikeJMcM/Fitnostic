import { useState, useRef, useEffect } from 'react';

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef<number | null>(null)

    const handleToggle = () => {
        setIsActive(!isActive);
    }

    function reset() {
        setTimer(0);
        setIsActive(false);
      }

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
          interval = window.setInterval(() => {
            setTimer(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && timer !== 0) {
          window.clearInterval(interval || 0);
        }
        return () => window.clearInterval(interval || 0);
      }, [isActive, timer]);

    return { timer, isActive, isPaused, handleToggle, reset }
}

export default useTimer