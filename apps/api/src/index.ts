import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'

import invoice from './invoice'

const app = new Hono()

// middleware
app.use(
  csrf({
    origin: ['app.invoicelink.io', 'pay.invoicelink.io', "invoicelink.io"],
  })
)

// mount routes 
app.route('/invoice', invoice)

app.get('/', (c) => {
  return c.text('Hello from api.invoicelink.io!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
