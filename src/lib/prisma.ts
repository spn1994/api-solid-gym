import { env } from '@/env'
import { PrismaClient } from '@prisma/client'
//só mostra os logs em desenvolvimento
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})