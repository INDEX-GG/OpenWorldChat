import { useEffect, useRef, useState } from "react";

export const useChatMessages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerScroll, setIsContainerScroll] = useState<boolean>(false);

  useEffect(() => {
    const containerDom = containerRef.current;
    if (containerDom) {
      setTimeout(() => {
        containerDom.scrollTop = containerDom.scrollHeight;
        setTimeout(() => setIsContainerScroll(true), 1000);
      }, 50);
    }
  }, []);

  return {
    containerRef,
    isContainerScroll,
  };
};
