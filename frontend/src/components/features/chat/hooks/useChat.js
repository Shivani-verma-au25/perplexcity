import { useDispatch, useSelector } from "react-redux";
import {
  deleteChat,
  getChats,
  getMessages,
  sendMessage,
} from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import {
  addMessages,
  addNewMessage,
  createNewChat,
  setChats,
  setCurrentChatId,
  setError,
  setIsLoading,
} from "../chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);

  const sendMessageHandler = async ({ message, chatId }) => {
    dispatch(setIsLoading(true));
    try {
      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;
      //  creating new chat if not exists and adding messages to store
      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      }

      // creating new message in store
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: message,
          role: "user",
        }),
      );

      // create new message from ai in store
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
      dispatch(setCurrentChatId(chatId || chat._id));
    } catch (error) {
      console.log("error while creating chat", error);

      dispatch(
        setError(error?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  // get chats
  const getChatsHandler = async () => {
    dispatch(setIsLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdate: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    // dispatch(setCurrentChatId(chats[0]?._id || null));
    dispatch(setIsLoading(false));
  };

  const handleOpneChat = async (chatId) => {
    // fetch messages only if messages are not there in store
    if (chats[chatId]?.messages?.length === 0) {
      const data = await getMessages(chatId);
      const { allMessage } = data;
      console.log("messages", allMessage);

      const formatedMessages = allMessage?.map((message) => ({
        content: message.content,
        role: message.role,
      }));
      dispatch(
        addMessages({
          chatId,
          messages: formatedMessages,
        }),
      );
    }
    dispatch(setCurrentChatId(chatId));
  };
  return {
    initializeSocketConnection,
    sendMessageHandler,
    getChatsHandler,
    handleOpneChat,
  };
};
