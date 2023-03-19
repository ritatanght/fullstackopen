var _ = require("lodash");
// Load method categories.
var array = require("lodash/array");
var object = require("lodash/fp/object");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let likes = blogs[0].likes || 0;
  blogs.forEach((blog) => {
    blog.likes > likes ? (likes = blog.likes) : null;
  });
  return blogs.find((blog) => blog.likes === likes);
};

const mostBlogs = (blogs) => {
  const blogsCount = _.countBy(blogs, "author");
  const maxCount = _.max(_.toArray(blogsCount));
  const maxAuthor = _.find(
    Object.keys(blogsCount),
    (key) => blogsCount[key] === maxCount
  );
  return { author: maxAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
  let authors = [];
  _.forEach(blogs, (obj) =>
    authors.includes(obj.author) ? null : authors.push(obj.author)
  );
  const sum = authors.map((c) => ({
    [c]: _.sumBy(blogs, (obj) => obj.author === c && obj.likes),
  }));
  let mostLikes = Object.values(sum[0])[0];
  _.forEach(sum, (author) =>
    Object.values(author)[0] > mostLikes
      ? (mostLikes = Object.values(author)[0])
      : null
  );
  const maxAuthor = _.filter(
    sum,
    (sum) => Object.values(sum)[0] === mostLikes
  )[0];

  return {
    author: Object.keys(maxAuthor)[0],
    likes: Object.values(maxAuthor)[0],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
