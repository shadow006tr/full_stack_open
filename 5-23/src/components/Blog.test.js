import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Note />', () => {
  let container
  const blog = {
    title: 'Component testing',
    author: 'Tester',
    url:'https://tester.com',
    likes: 0,
    user: {
      name: 'Tester'
    }
  }

  const likeMockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} likeHandler={likeMockHandler} deleteHandler={() => {}} />
    ).container
  })

  test('shows title and author but not url and likes by default', () => {

    const titleAndAuthor = screen.getByText('Component testing Tester')
    expect(titleAndAuthor).toBeDefined()

    const url = screen.queryByText('https://tester.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 0')
    expect(likes).toBeNull()
  })

  test('shows url and likes on click', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('https://tester.com')
    expect(url).toBeDefined()

    const likes = screen.getByText('likes 0')
    expect(likes).toBeDefined()
  })

  test('like event triggered twice if button is clicked twice', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })

})

