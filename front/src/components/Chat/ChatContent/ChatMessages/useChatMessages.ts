import { useEffect, useRef } from "react";

export const useChatMessages = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerDom = containerRef.current;
    if (containerDom) {
      setTimeout(() => {
        containerDom.scrollTop = containerDom.scrollHeight;
      }, 50);
    }
  }, []);

  return {
    containerRef,
  };
};
