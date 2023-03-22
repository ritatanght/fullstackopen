import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

//5.16
test('<CreateForm /> calls onSubmit with correct details ', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<CreateForm createBlog={createBlog} />)

  const inputTitle = container.querySelector('input[name="title"]')
  const inputAuthor = container.querySelector('input[name="author"]')
  const inputUrl = container.querySelector('input[name="url"]')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'WordPress Theme Detector')
  await user.type(inputAuthor, 'Kinsta')
  await user.type(
    inputUrl,
    'https://kinsta.com/tools/wordpress-theme-detector/',
  )
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('WordPress Theme Detector')
  expect(createBlog.mock.calls[0][0].author).toBe('Kinsta')
  expect(createBlog.mock.calls[0][0].url).toBe(
    'https://kinsta.com/tools/wordpress-theme-detector/',
  )
})
