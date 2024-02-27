import fastify from "fastify";
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  //quais dados passar na hora de criar, atraves data
  data: {
    name: 'Sergio Nahirny',
    email: 'sergio@email.com.br',
  },
})

// ORM - Object Relational Mapper

// ORM - Object Relational Mapping (mapear tudo q tem dentro em objetos no DBA)