import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login ({ request, auth }: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')
       

        const token = await auth.use('api').attempt(username, password)
        return token.toJSON()
    }
    

}
