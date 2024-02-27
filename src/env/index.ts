import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  //pega qualquer dado e converte para numero
  PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())
//nenhum codigio a partir daqui executa, caso a validação nao passe
  throw new Error('Invalid environment variables.')
}
//data exporta os dados
export const env = _env.data