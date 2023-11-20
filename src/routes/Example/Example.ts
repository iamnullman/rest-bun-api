import Bun from 'bun';
import { writeFileSync } from 'fs';

export default class ProfileController {
    public static path = "/Example";
    public static method = "GET";

    public static async handle(request: Request, response: Response) {
        const { url, method } = request;
        const { pathname } = new URL(url);
        const query = new URLSearchParams(request.url.split("?")[1]);
        const body = await request?.json();
        return new Response("Hello Bun!");        
    }
}