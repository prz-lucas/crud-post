import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from './../../Validators/CreateUserValidator'

export default class UsersController {
    public async store({auth, request, response}: HttpContextContract){
        
        try {
            await auth.use('api').authenticate()
        } catch (error) {
            console.log()
            return{
                message: ('Token inválido ou faltando.'),
            }
            
          }
            const {username, password, fullName, cpf} = await request.validate(CreateUser)
            const user = await User.create({
                username,
                password,
                fullName,
                cpf,
            })

            response.status(201)
        
        return{
            message: "Usuário criado com sucesso.",
            data: user
        } 
    

          

        

        
    }
    public async index(){
    
        const users = await User.all()
    
        return{
            data: users,
        }
     }

    public async show({params}: HttpContextContract) {

        const users = await User.findOrFail(params.id)

        return{
            data: users,
        }
    }

    public async destroy({params}: HttpContextContract) {
        const users = await User.findOrFail(params.id)

        await users. delete(

        )
        return {
            message: 'Usuário excluído com sucesso.',
            data: users,
        }
    }


}
