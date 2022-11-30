import { useEffect, useRef, useState } from "react";
import { IMessageModel } from "lib/models/IMessageModel";

export const useChatMessages = (messages: IMessageModel[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerScroll, setIsContainerScroll] = useState<boolean>(false);

  useEffect(() => {
    const containerDom = containerRef.current;
    if (containerDom) {
      setTimeout(() => {
        containerDom.scrollTop = containerDom.scrollHeight;
        if (!isContainerScroll) {
          setTimeout(() => setIsContainerScroll(true), 1000);
        }
      }, 50);
    }
  }, [messages]);

  return {
    containerRef,
    isContainerScroll,
  };
};
