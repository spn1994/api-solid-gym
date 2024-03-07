import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
 //hash vai gerar dado impossivel reverter, salt eu escolhi 6, 
 //a cada round ele gera um hash e fica mais dificil
  const password_hash = await hash(password, 6)
//find unique só busca registro unicos ou chave primaria
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}

//separei tudo pq no futuro posso querer fazer essas funcionalidade de outras maneiras