import { useDispatch, useSelector } from 'react-redux'
import { updateLikes, removeBlog, updateComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }
  const updateBlog = async (id, blog) => {
    try {
      const returnedBlog = await blogService.like(id, {
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(updateLikes(returnedBlog))
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      navigate('/')
      dispatch(setNotification({ message: 'Removed', type: 'notification' }))
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
    }
  }

  const handleComment = async (e, id) => {
    e.preventDefault()
    try {
      const savedComment = await blogService.addComment(id, comment)
      dispatch(updateComment(savedComment))
      setComment('')
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog_details">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <p>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
          <br />
          likes {blog.likes}{' '}
          <button onClick={() => updateBlog(blog.id, blog)}>like</button>
          <br />
          added by {blog.user.name}
        </p>
        {user && user.username === blog.user.username && (
          <button onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={(e) => handleComment(e, blog.id)}>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, ind) => (
            <li key={ind}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
