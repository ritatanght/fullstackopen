const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Full stack open",
    author: "The University of Helsinki",
    url: "https://fullstackopen.com/en/",
    likes: 10,
  },
  {
    title: "Google",
    author: "Alphabet",
    url: "https://www.google.com/",
    likes: 5,
  },
  {
    title: "Full stack open",
    author: "The University of Helsinki",
    url: "https://fullstackopen.com/en/",
    likes: 10,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  blogsInDb,
  usersInDb,
};
