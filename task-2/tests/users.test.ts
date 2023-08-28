import { describe, test, expect, beforeEach } from "@jest/globals";
import { HttpClient } from "../src/http.client";
import { logger } from "../log.config";
import { v4 } from "uuid";

let contextId: string;
let httpClient: HttpClient;

beforeEach(() => {
  contextId = v4();
  logger.info(
    `ContextId: ${contextId} Test name: ${expect.getState().currentTestName}`,
  );
  httpClient = new HttpClient(contextId);
});

describe("GET /users", () => {
  test("when user exists", async () => {
    const object = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };

    const response = await httpClient.get("/users/1");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(object);
  });

  test("when id is not a number", async () => {
    const response = await httpClient.get("/users/awsde");

    expect(response.statusCode).toEqual(404);
  });

  test("when id is too big", async () => {
    const response = await httpClient.get("/users/1000000000");

    expect(response.statusCode).toEqual(404);
  });
});

describe("POST /users", () => {
  test("when valid data", async () => {
    const user = {
      name: "Lina",
      email: "Lina@april.biz",
    };
    const response = await httpClient.post("/users", user);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject(user);
  });

  test("when empty body", async () => {
    const user = {};
    const response = await httpClient.post("/users", user);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });

  test("when invalid email", async () => {
    const user = {
      name: "Lina",
      email: "Linaaprilbiz",
    };
    const response = await httpClient.post("/users", user);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });
});

describe("PUT /users/{id}", () => {
  test("when a user exists and data is valid", async () => {
    const user = {
      name: "Dima",
      email: "Dima@april.biz",
    };
    const response = await httpClient.put("/users/1", user);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(user);
  });

  test("when a user exists and invalid email", async () => {
    const user = {
      name: "Dima",
      email: "Dimaaprilbiz",
    };
    const response = await httpClient.put("/users/1", user);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });

  test("when a user id is not a number and data valid", async () => {
    const user = {
      name: "Dima",
      email: "Dimaapr@gmail.com",
    };
    const response = await httpClient.put("/users/asdf", user);

    expect(response.statusCode).toEqual(404);
  });
});

describe("DELETE /users/{id}", () => {
  test("when a user exists", async () => {
    const response = await httpClient.delete("/users/1");
    expect(response.statusCode).toEqual(200);
  });

  test("when a user id is negative", async () => {
    const response = await httpClient.delete("/users/-1");
    expect(response.statusCode).toEqual(200);
  });

  test("when a user id is too big", async () => {
    const response = await httpClient.delete("/users/1999999999");
    expect(response.statusCode).toEqual(200);
  });
});
