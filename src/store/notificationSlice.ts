import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationInitialState } from "../types/notification.type";

const initialState: NotificationInitialState = {
  message: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createMessage(
      state,
      action: PayloadAction<{ success: boolean; id: string; message: string }>
    ) {
      if (action.payload.success) {
        state.message.push({
          id: action.payload.id,
          type: "success",
          title: "成功",
          text: action?.payload?.message,
        });
      } else {
        state.message.push({
          id: action.payload.id,
          type: "danger",
          title: "失敗",
          text: Array.isArray(action?.payload?.message)
            ? action?.payload?.message.join("，")
            : action?.payload?.message,
        });
      }
    },
    removeMessage(state, action: PayloadAction<string>) {
      const index = state.message.findIndex(
        (item) => item.id === action.payload
      );
      state.message.splice(index, 1);
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  "message/createAsyncMessage",
  async function (
    payload: { success: boolean; message: string },
    { dispatch, requestId }
  ) {
    dispatch(
      notificationSlice.actions.createMessage({
        ...payload,
        id: requestId,
      })
    );
    setTimeout(() => {
      dispatch(notificationSlice.actions.removeMessage(requestId));
    }, 2000);
  }
);

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
