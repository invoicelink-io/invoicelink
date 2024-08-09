import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import invoice from "./invoice";
import preview from "./preview";
import { cors } from '@elysiajs/cors'
const { version } = require("../package.json");

const app = new Elysia({
}).use(invoice).use(preview).use(cors({ origin: /.*\.invoicelink\.io$/ })).use(swagger({
  path: "/",
  documentation: {
    info: {
      title: 'Invoicelink.io',
      version,
      description: 'Internal API Documentation',
    },
  }
}));

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


