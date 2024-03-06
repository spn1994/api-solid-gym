import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)
  //hash vai gerar dado impossivel reverter, salt eu escolhi 6, a cada round ele gera um hash e fica mais dificil
  const password_hash = await hash(password, 6)
//find unique só busca registro unicos ou chave primaria
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    //409 status conflito
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
//controler é quem lida com entrada de dados num requisição, tudo q faz parte de resposta e requisição
// coloca na pasta http