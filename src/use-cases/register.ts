import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}
//SOLID 

//D - Dependenncy inversion Principle(muda o cesso as dependencias) receber as dependencias como parametro

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {

  }
   async execute({name, email,password }: RegisterUseCaseRequest):  Promise<RegisterUseCaseResponse> {
  //hash vai gerar dado impossivel reverter, salt eu escolhi 6, 
  //a cada round ele gera um hash e fica mais dificil
   const password_hash = await hash(password, 6)
  //find unique só busca registro unicos ou chave primaria
   const userWithSameEmail = await this.usersRepository.findByEmail(email)

   if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    //para trabalhar com essa clasee, eu preciso instanciar   
    const user = await this.usersRepository.create({
     name,
      email,
     password_hash,
   })

   return {
    user,
    }
  }
}



//separei tudo pq no futuro posso querer fazer essas funcionalidade de outras maneiras