import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export default notificationSlice.reducer;
export const { createNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, timeout = 5) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => dispatch(clearNotification()), timeout * 1000);
  };
};
