import { useRef, useState } from 'react';

export const useTimedMessage = (duration = 3000) => {
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (msg?: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (msg !== undefined) {
      setMessage(msg);
    }

    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return {
    isVisible,
    message,
    show,
  };
};
