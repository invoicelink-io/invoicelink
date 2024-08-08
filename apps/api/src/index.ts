import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import invoice from "./invoice";


const app = new Elysia().use(invoice).use(swagger({
  path: "/",
  version: "1.1.0",
})).listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
