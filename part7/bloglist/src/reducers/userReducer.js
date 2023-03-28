import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export default userSlice.reducer
export const { setUser, clearUser } = userSlice.actions

export const loginUser = (loginInfo) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginInfo)
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Wrong username or password',
          type: 'error',
        }),
      )
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('loggedInUser')
    dispatch(clearUser())
  }
}
