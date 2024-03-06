import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
//plugin tem que ser assincrono
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}