import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    <Form onSubmit={addBlog}>
      <Form.Label>
        Title:
        <Form.Control
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
      </Form.Label>
      <br />
      <Form.Label>
        Author:
        <Form.Control
          value={author}
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          id="author"
        />
      </Form.Label>
      <br />
      <Form.Label>
        Url:
        <Form.Control
          value={url}
          name="url"
          type="url"
          onChange={(e) => setUrl(e.target.value)}
          id="url"
        />
      </Form.Label>
      <br />
      <Button variant="outline-dark" type="submit">
        create
      </Button>
    </Form>
  )
}

export default CreateForm
