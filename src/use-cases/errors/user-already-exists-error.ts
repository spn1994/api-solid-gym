export class UserAlreadyExistsError extends Error {
  constructor() {
    //metodo construtor da classe error
    super('E-mail already exists.')
  }
}