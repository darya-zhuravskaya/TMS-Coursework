import { describe, test, expect, beforeEach } from "@jest/globals";
import { HttpClient } from "../src/http.client";
import { Validator } from "jsonschema";
import { logger } from "../log.config";
import { v4 } from "uuid";

const schema = {
  type: "object",
  properties: {
    postId: {
      type: "integer",
    },
    id: {
      type: "integer",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
  required: ["postId", "id", "name", "email", "body"],
};

let contextId: string;
let httpClient: HttpClient;

beforeEach(() => {
  contextId = v4();
  logger.info(
    `ContextId: ${contextId} Test name: ${expect.getState().currentTestName}`,
  );
  httpClient = new HttpClient(contextId);
});

describe("GET /comments", () => {
  test("validating schema", async () => {
    const validator = new Validator();
    const response = await httpClient.get("/comments/1");

    const validation = validator.validate(response.body, schema);
    expect(validation.errors).toHaveLength(0);
  });

  test("when comment exists", async () => {
    const object = {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    };

    const response = await httpClient.get("/comments/1");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(object);
  });

  test("when id is not a number", async () => {
    const response = await httpClient.get("/comments/awsde");

    expect(response.statusCode).toEqual(404);
  });

  test("when id is too big", async () => {
    const response = await httpClient.get("/comments/1000000000");

    expect(response.statusCode).toEqual(404);
  });
});

describe("POST /comments", () => {
  test("when valid data", async () => {
    const comment = {
      postId: 1,
      name: "Lina",
      email: "Lina@april.biz",
      body: "st natus enim nihil est dolore omnis voluptatem",
    };
    const response = await httpClient.post("/comments", comment);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject(comment);
  });

  test("when empty body", async () => {
    const comment = {};
    const response = await httpClient.post("/comments", comment);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });

  test("when non existing post", async () => {
    const comment = {
      postId: 100000099999999,
      name: "Lina",
      email: "Lina@april.biz",
      body: "st natus enim nihil est dolore omnis voluptatem",
    };
    const response = await httpClient.post("/comments", comment);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });
});

describe("PUT /comments/{id}", () => {
  test("when a comment exists and data is valid", async () => {
    const comment = {
      name: "Lina",
      email: "Lina@april.biz",
      body: "st natus enim nihil est dolore omnis voluptatem",
    };

    const response = await httpClient.put("/comments/1", comment);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(comment);
  });

  test("when a comment exists and invalid email", async () => {
    const comment = {
      name: "Lina",
      email: "Linaiz",
      body: "st natus enim nihil est dolore omnis voluptatem",
    };
    const response = await httpClient.put("/comments/1", comment);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });

  test("when a comment id is not a number and data valid", async () => {
    const comment = {
      name: "Lina",
      email: "Lina@april.biz",
      body: "st natus enim nihil est dolore omnis voluptatem",
    };
    const response = await httpClient.put("/comments/asdf", comment);

    expect(response.statusCode).toEqual(404);
  });
});

describe("DELETE /comments/{id}", () => {
  test("when a comment exists", async () => {
    const response = await httpClient.delete("/comments/1");
    expect(response.statusCode).toEqual(200);
  });

  test("when a comment id is negative", async () => {
    const response = await httpClient.delete("/comments/-1");
    expect(response.statusCode).toEqual(200);
  });

  test("when a comment id is too big", async () => {
    const response = await httpClient.delete("/comments/1999999999");
    expect(response.statusCode).toEqual(200);
  });
});
