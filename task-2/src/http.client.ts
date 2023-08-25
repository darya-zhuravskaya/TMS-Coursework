import superagent from "superagent";

export class HttpClient{
    public static readonly host: string = "https://jsonplaceholder.typicode.com"

    public static get(path: string){
        const url = HttpClient.host + path 
        return superagent.get(url);
    }

    public static post(path: string, body: object){
        const url = HttpClient.host + path 
        return superagent.post(url).send(body);
    }

    public static put(path: string, body: object){
        const url = HttpClient.host + path 
        return superagent.put(url).send(body);
    }


    public static delete(path:string){
        const url = HttpClient.host + path
        return superagent.delete(url).send()
    }
}