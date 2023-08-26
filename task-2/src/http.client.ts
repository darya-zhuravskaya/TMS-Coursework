import superagent from "superagent";
import { logger } from "../log.config";

export class HttpClient {
  public static readonly host: string = "https://jsonplaceholder.typicode.com";

  public static async get(path: string) {
    const url = HttpClient.host + path;
    logger.info(`GET ${url}  Request started`);
    const response = await superagent.get(url).ok(() => true);
    logger.info(`GET ${url}  Request finished`);
    return response;
  }

  public static async post(path: string, body: object) {
    const url = HttpClient.host + path;
    logger.info(`POST ${url} body: ${JSON.stringify(body)} Request started`);
    const response = await superagent
      .post(url)
      .send(body)
      .ok(() => true);
    logger.info(`POST ${url} body: ${JSON.stringify(body)} Request finished`);
    return response;
  }

  public static async put(path: string, body: object) {
    const url = HttpClient.host + path;
    logger.info(`PUT ${url} body: ${JSON.stringify(body)} Request started`);
    const response = await superagent
      .put(url)
      .send(body)
      .ok(() => true);
    logger.info(`PUT ${url} body: ${JSON.stringify(body)} Request finished`);
    return response;
  }

  public static async delete(path: string) {
    const url = HttpClient.host + path;
    logger.info(`DELETE ${url}  Request started`);
    const response = await superagent
      .delete(url)
      .send()
      .ok(() => true);
    logger.info(`DELETE ${url}  Request finished`);
    return response;
  }
}
