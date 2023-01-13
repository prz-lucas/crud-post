import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login ({ request, auth, response }: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')
       
    try{
        const token = await auth.use('api').attempt(username, password)
        return token.toJSON()
    } catch {
        return response.unauthorized('Credenciais inválidas')
    } 

    }
    

}
