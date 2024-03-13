//interface vai dizer quais metodos e parametros vai ter
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  //metodo
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}