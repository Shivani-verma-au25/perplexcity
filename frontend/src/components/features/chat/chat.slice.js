import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: {},
  currentchatId: null,
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        _id: chatId,
        title,
        messages: [],
        lastUpdate: new Date().toISOString(),
      };
    },

    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId]?.messages?.push({ content, role });
    },

    addMessages :( state, action) => {
      const { chatId, messages} = action.payload;      
      state.chats[chatId]?.messages?.push(...messages)
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentchatId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages
} = chatSlice.actions;
export default chatSlice.reducer;
