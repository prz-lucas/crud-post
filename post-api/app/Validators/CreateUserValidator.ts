import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    username: schema.string({}, [
      rules.maxLength(15),
      rules.minLength(3),
      rules.unique({table: 'users', column: 'username'}),
      rules.required()
    ]),
    password: schema.string({}, [
      rules.required()
    ]),
    cpf: schema.string({}, [
      rules.maxLength(14),
      rules.minLength(14),
      rules.unique({table: 'users', column: 'cpf'}),
      rules.required()
    ]),
    fullName: schema.string({}, [
      rules.maxLength(100),
      rules.minLength(3),
      rules.required()
    ]),
      

  })

  
  public messages: CustomMessages = {}
}
