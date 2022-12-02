import { useMemo } from "react";
import { getRusDateDay } from "lib/services/services";
import { IChatMessageDateProps } from "components/Chat/ChatContent/ChatMessages/ChatMessageDate/types";

const getMessageDay = (date: string | undefined) => {
  if (date) {
    return getRusDateDay(date);
  }
  return false;
};

export const useChatMessageDate = ({
  prevMessage,
  currentMessage,
}: IChatMessageDateProps) => {
  const isVisibleDate = useMemo(() => {
    const prevMessageDate = getMessageDay(prevMessage?.createdAt);
    //! first message
    if (!prevMessageDate) return true;

    const currentMessageDate = getMessageDay(currentMessage.createdAt);
    return prevMessageDate !== currentMessageDate;
  }, []);

  const dateText = useMemo(() => {
    if (isVisibleDate) {
      const todayDate = new Date();
      const todayDeviceDate = getRusDateDay(todayDate.toString());
      const messageDate = getRusDateDay(currentMessage.createdAt);

      //! isToday
      if (todayDeviceDate === messageDate) {
        return "Cегодня";
      }

      //! yesterday date | (очитывает начало мемяца - 1 число)
      const yesterdayDate = new Date(todayDate);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      const yesterdayDeviceDate = getRusDateDay(yesterdayDate.toString());

      //! isYesterday
      if (yesterdayDeviceDate === messageDate) {
        return "Вчера";
      }

      return getRusDateDay(currentMessage.createdAt);
    }
    return null;
  }, [isVisibleDate]);

  return {
    dateText,
    isVisibleDate,
  };
};
