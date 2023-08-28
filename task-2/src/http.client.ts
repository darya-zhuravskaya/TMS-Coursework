import superagent from "superagent";
import { logger } from "../log.config";

export class HttpClient {
  public readonly host: string = "https://jsonplaceholder.typicode.com";
  public contextId: string;

  constructor(contextId: string) {
    this.contextId = contextId;
  }

  public async get(path: string) {
    const url = this.host + path;
    logger.info(`ContextId: ${this.contextId} Request GET ${url}`);
    const response = await superagent.get(url).ok(() => true);
    logger.info(
      `ContextId: ${this.contextId} Response GET ${url} Code: ${response.statusCode}`,
    );
    return response;
  }

  public async post(path: string, body: object) {
    const url = this.host + path;
    logger.info(
      `ContextId: ${this.contextId} Request POST ${url} body: ${JSON.stringify(
        body,
      )}`,
    );
    const response = await superagent
      .post(url)
      .send(body)
      .ok(() => true);
    logger.info(
      `ContextId: ${this.contextId} Response POST ${url} body: ${JSON.stringify(
        body,
      )} Code: ${response.statusCode}`,
    );
    return response;
  }

  public async put(path: string, body: object) {
    const url = this.host + path;
    logger.info(
      `ContextId: ${this.contextId} Request PUT ${url} body: ${JSON.stringify(
        body,
      )}`,
    );
    const response = await superagent
      .put(url)
      .send(body)
      .ok(() => true);
    logger.info(
      `ContextId: ${this.contextId} Response PUT ${url} body: ${JSON.stringify(
        body,
      )} Code: ${response.statusCode}`,
    );
    return response;
  }

  public async delete(path: string) {
    const url = this.host + path;
    logger.info(`ContextId: ${this.contextId} Request DELETE ${url}`);
    const response = await superagent
      .delete(url)
      .send()
      .ok(() => true);
    logger.info(
      `ContextId: ${this.contextId} Response DELETE ${url} Code: ${response.statusCode}`,
    );
    return response;
  }
}
