const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("retrieval of blog", () => {
  test("blogs are returned in json with correct length", async () => {
    const response = await api.get("/api/blogs");
    expect(response.header["content-type"]).toMatch(/application\/json/);
    expect(response.body).toHaveLength(2);
  });

  test("verify id to be the unique identifier property", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  test("post req creates a new blog post", async () => {
    const initialBlogs = await helper.blogsInDb();
    const user = {
      username: "mikicha",
      password: "123456",
    };
    const login = await api.post("/api/login").send(user).expect(200);

    const newBlog = {
      title: "Wordpress Theme Detector",
      author: "Kinsta",
      url: "https://kinsta.com/tools/wordpress-theme-detector/",
      likes: 2,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    const { title, author, url, likes } = blogsAtEnd[blogsAtEnd.length - 1];
    expect(title).toBe(newBlog.title);
    expect(author).toBe(newBlog.author);
    expect(url).toBe(newBlog.url);
    expect(likes).toBe(newBlog.likes);
  });

  test("addition of a blog fails when token is not provided", async () => {});

  test("blog without likes property will default to 0", async () => {
    const newBlog = {
      title: "How to Install a WordPress Theme",
      author: "Kinsta",
      url: "https://kinsta.com/blog/how-to-install-a-wordpress-theme/",
    };
    const user = {
      username: "mikicha",
      password: "123456",
    };
    const login = await api.post("/api/login").send(user).expect(200);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("blog without title or url is not added", async () => {
    const initialBlogs = await helper.blogsInDb();

    const newBlog = {
      title: "Wordpress Theme Detector",
      author: "Kinsta",
    };

    const user = {
      username: "mikicha",
      password: "123456",
    };

    const login = await api.post("/api/login").send(user).expect(200);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeed with status code 204 if id is valid and token provided", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[initialBlogs.length - 1];
    console.log(blogToDelete);
    const user = {
      username: "mikicha",
      password: "123456",
    };
    const login = await api.post("/api/login").send(user).expect(200);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("deletion fail with 401 when token is not provided", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[initialBlogs.length - 1];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("update of a blog", () => {
  test("update likes by 1", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogtoUpdate = initialBlogs[0];

    const response = await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .send({ ...blogtoUpdate, likes: blogtoUpdate.likes + 1 });

    expect(response.body.likes).toBe(blogtoUpdate.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
