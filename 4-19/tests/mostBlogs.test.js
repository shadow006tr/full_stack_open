const listHelper = require('./test_helper')

describe('most blogs', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: "BlipBlop",
      author: "Bloop",
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: "BlipBlop",
      author: "Bloop",
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: "BlipBlop",
      author: "Bloop",
      likes: 4,
      __v: 0
    }
  ]

  test('checking 2 blogs with same author', () => {
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual(
      {
        author: "Bloop",
        blogs: 3
      }
    )
  })
})
