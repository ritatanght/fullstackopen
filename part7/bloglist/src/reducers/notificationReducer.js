import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export default notificationSlice.reducer
export const { createNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (message, timeout = 5000) => {
  return (dispatch) => {
    dispatch(createNotification(message, timeout))
    setTimeout(() => dispatch(clearNotification()), timeout)
  }
}
