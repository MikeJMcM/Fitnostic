import { useState, useRef, useEffect } from 'react';

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState)
    const [isActive, setIsActive] = useState(false)
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
            setTimer(ms => ms + 100);
          }, 100);
        } else if (!isActive && timer !== 0) {
          window.clearInterval(interval || 0);
        }
        return () => window.clearInterval(interval || 0);
      }, [isActive, timer]);

    return { timer, isActive, handleToggle, reset }
}

export default useTimer