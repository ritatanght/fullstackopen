import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import UsersList from './components/UsersList'
import User from './components/User'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const userMatch = useMatch('/users/:id')
  const userInfo = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div className="container">
      <Navigation />
      {!user && <LoginForm />}
      <h1>Blog App</h1>
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users/:id" element={<User userInfo={userInfo} />} />
        <Route path="/users" element={<UsersList users={users} />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
