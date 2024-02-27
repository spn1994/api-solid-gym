import { app } from "./app";
import { env } from "./env";

app.listen({
  //acessivel por front q acessam aplicação
  host: '0.0.0.0',
  port: env.PORT,
}).then(() => {
  console.log('🚀 HTTP Server Running!')
})