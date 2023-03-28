import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateLikes(state, action) {
      const updatedBlog = action.payload
      return state.map((state) =>
        state.id === updatedBlog.id
          ? { ...state, likes: updatedBlog.likes }
          : state,
      )
    },
    removeBlog(state, action) {
      return state.filter((state) => state.id !== action.payload)
    },
    updateComment(state, action) {
      const updatedBlog = action.payload
      return state.map((state) =>
        state.id === updatedBlog.id
          ? { ...state, comments: updatedBlog.comments }
          : state,
      )
    },
  },
})

export default blogSlice.reducer
export const { setBlogs, updateLikes, removeBlog, updateComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
