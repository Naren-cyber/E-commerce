import { useLayoutEffect, useState } from "react";

export default function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState<Date>();

  useLayoutEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return currentTime;
}
