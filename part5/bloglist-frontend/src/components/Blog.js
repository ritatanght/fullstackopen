import { useState } from 'react'
const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog_details">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setBlogVisible(!blogVisible)}>
        {blogVisible ? 'Hide' : 'View'}
      </button>
      {blogVisible && (
        <div>
          <p>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
            <br />
            likes {blog.likes}{' '}
            <button onClick={() => updateBlog(blog.id, blog)}>like</button>
            <br />
            {blog.user.name}
          </p>
          {user.username === blog.user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
