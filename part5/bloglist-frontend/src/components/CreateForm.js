import { useState } from 'react'
const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <label>
        Title:
        <input
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
      </label>
      <br />
      <label>
        Author:
        <input
          value={author}
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          id="author"
        />
      </label>
      <br />
      <label>
        Url:
        <input
          value={url}
          name="url"
          type="url"
          onChange={(e) => setUrl(e.target.value)}
          id="url"
        />
      </label>
      <br />
      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm
