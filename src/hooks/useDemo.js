import { useRef, useState } from 'react';

export default function useDemo() {
  const demoIntervalRef = useRef(null);
  const [showDemo, setShowDemo] = useState(false);

  function startDemo(loopFn, ms = 300) {
    setShowDemo(true);
    demoIntervalRef.current = setInterval(loopFn, ms);
  }

  function stopDemo() {
    setShowDemo(false);
    if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
  }

  return { showDemo, startDemo, stopDemo };
}
