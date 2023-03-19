/* eslint-disable no-undef */
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

// clear the database
beforeEach(async () => {
  await User.deleteMany({});
});


describe("ensure invalid users are not created", () => {
  test("no username in post request", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      name: "Miki",
      password: "123456",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username missing");

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(usersAtStart.length);
  });

  test("no password in post request", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mikicha",
      name: "Miki",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("password missing");

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(usersAtStart.length);
  });

  test("username has less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mi",
      name: "Miki",
      password: "123456",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Both username and password must be at least 3 characters long"
    );

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(usersAtStart.length);
  });

  test("username has less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mikicha",
      name: "Miki",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Both username and password must be at least 3 characters long"
    );

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(usersAtStart.length);
  });

  test.only("username already taken", async () => {
    const newUser = {
      username: "mikicha",
      name: "miki",
      password: "123456",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtStart = await helper.usersInDb();
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username already taken");

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(usersAtStart.length);
  });
});



afterAll(async () => {
  await mongoose.connection.close();
});
