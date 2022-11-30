import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { IRoomModel } from "lib/models/IRoomModel";
import { getRusDate } from "lib/services/services";
import { ADMIN_ID } from "lib/constants/constants";

export const useRoomItem = (props: IRoomModel) => {
  const { id, user, messages } = props;
  const navigate = useNavigate();
  const { roomId } = useParams() || { roomId: "0" };

  const isActive = useMemo(() => (roomId ? +roomId === id : false), [roomId]);
  const handleClickRoom = () => navigate(`/${id}`);

  const lastMessage = useMemo(() => messages[messages.length - 1], [messages]);

  const userName = useMemo(() => {
    //! this is admin
    if (lastMessage.senderId === ADMIN_ID) {
      return "Администратор приложения";
    }
    if (user.name || user.lastname || user.patronymic) {
      return `${user.lastname} ${user.name} ${user.patronymic}`;
    }
    return user.email;
  }, [lastMessage]);

  const messageText = useMemo(() => lastMessage.text, [lastMessage]);

  const messageDate = useMemo(
    () => getRusDate(lastMessage.createdAt),
    [lastMessage],
  );

  return {
    userName,
    isActive,
    lastMessage,
    messageText,
    messageDate,
    handleClickRoom,
  };
};
