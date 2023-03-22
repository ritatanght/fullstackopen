import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createFormRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      createFormRef.current.toggleVisibility()
      blogService.getAll().then((blogs) => setBlogs(blogs))
      setMessage({
        message: `A new blog "${blog.title}" by ${blog.author} has been added`,
        type: 'notification',
      })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ message: error.response.data.error, type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const updateBlog = async (id, blog) => {
    try {
      const returnedBlog = await blogService.like(id, {
        ...blog,
        likes: blog.likes + 1,
      })
      setBlogs(
        blogs.map((blog) =>
          blog.id === returnedBlog.id
            ? { ...blog, likes: returnedBlog.likes }
            : blog,
        ),
      )
    } catch (error) {
      setMessage({ message: error.response.data.error, type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setMessage({ message: 'Removed', type: 'notification' })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ message: error.response.data.error, type: 'error' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          message={message}
        />
      )}
      <h2>Blogs</h2>
      {user && (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Create New</h2>
          {message && <Message message={message} />}
          <Togglable buttonLabel="New blog" ref={createFormRef}>
            <CreateForm createBlog={createBlog} />
          </Togglable>
        </>
      )}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
