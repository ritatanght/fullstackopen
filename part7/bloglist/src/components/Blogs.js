import { useRef } from 'react'
import CreateForm from './CreateForm'
import Togglable from './Togglable'
import Message from './Message'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const createFormRef = useRef()
  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      createFormRef.current.toggleVisibility()
      dispatch(initializeBlogs())
      dispatch(
        setNotification({
          message: `A new blog "${blog.title}" by ${blog.author} has been added`,
          type: 'notification',
        }),
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <>
      {user && (
        <>
          <Message />
          <h2>Create New</h2>
          <Togglable buttonLabel="New blog" ref={createFormRef}>
            <CreateForm createBlog={createBlog} />
          </Togglable>
        </>
      )}

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`} element={<Blog blog={blog} />}>
              {blog.title}-{blog.author}
            </Link>
          </div>
        ))}
    </>
  )
}

export default Blogs
