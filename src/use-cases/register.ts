import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
//SOLID 

//D - Dependenncy inversion Principle(muda o cesso as dependencias) receber as dependencias como parametro

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {

  }
   async execute({name, email,password }: RegisterUseCaseRequest) {
  //hash vai gerar dado impossivel reverter, salt eu escolhi 6, 
  //a cada round ele gera um hash e fica mais dificil
   const password_hash = await hash(password, 6)
  //find unique só busca registro unicos ou chave primaria
   const userWithSameEmail = await this.usersRepository.findByEmail(email)

   if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }
    //para trabalhar com essa clasee, eu preciso instanciar   
    await this.usersRepository.create({
     name,
      email,
     password_hash,
   })
  }
}



//separei tudo pq no futuro posso querer fazer essas funcionalidade de outras maneiras