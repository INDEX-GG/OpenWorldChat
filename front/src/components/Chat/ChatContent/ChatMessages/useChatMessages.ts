import { useEffect, useRef } from "react";
import { IMessageModel } from "lib/models/IMessageModel";

export const useChatMessages = (messages: IMessageModel[]) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerDom = containerRef.current as HTMLDivElement;
    containerDom.scrollTop = containerDom.scrollHeight;
  }, [messages]);

  return {
    containerRef,
  };
};
