import { serve, write } from "bun";
import { readdirSync } from "fs";

serve({
  async fetch(request, response) {
    const { url, method } = request;
    const { pathname } = new URL(url);

    if (pathname === "/") {
      return new Response("Hello bun!");
    }

    const routes = readdirSync("./src/routes");
    for (const route of routes) {
      const subRoutes = readdirSync(`./src/routes/${route}`);
      for (const subRoute of subRoutes) {
        const controller = (await import(`./src/routes/${route}/${subRoute}`)).default;
        if (controller.path === pathname && controller.method === method) {
          return await controller.handle(request, response);
        }
      }
    }
    return new Response("", { status: 404 });
  },
  port: 3000
});
console.log("Server running on port 3000");