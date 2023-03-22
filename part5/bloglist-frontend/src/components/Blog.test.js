import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// 5.13
test('Only title and author are displayed by <Blog/> by default', () => {
  const blog = {
    title: 'WordPress Theme Detector',
    author: 'Kinsta',
    url: 'https://kinsta.com/tools/wordpress-theme-detector/',
    likes: 6,
  }
  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blog_details')
  expect(element).toHaveTextContent('WordPress Theme Detector')
  expect(element).not.toHaveTextContent(
    'https://kinsta.com/tools/wordpress-theme-detector/',
  )
  expect(element).not.toHaveTextContent('likes 6')
})

// 5.14
test.only('url and likes are shown when view button is clicked', async () => {
  const blog = {
    title: 'WordPress Theme Detector',
    author: 'Kinsta',
    url: 'https://kinsta.com/tools/wordpress-theme-detector/',
    likes: 6,
    user: { name: 'rita' },
  }
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('View'))
  const element = container.querySelector('.blog_details')

  expect(element).toHaveTextContent(
    'https://kinsta.com/tools/wordpress-theme-detector/',
  )
  expect(element).toHaveTextContent('likes 6')
})

// 5.15
test('event handler is called twice if the like button is clicked twice', async () => {
  const blog = {
    title: 'WordPress Theme Detector',
    author: 'Kinsta',
    url: 'https://kinsta.com/tools/wordpress-theme-detector/',
    likes: 6,
    user: { name: 'rita' },
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('View'))
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
