import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

export default class PostsController {
    public async store({request, response, auth}: HttpContextContract) {

        try {
            await auth.use('api').authenticate()
        } catch (error) {
            return{
                error,
                message: "Token inválido ou faltando."
            } 
        }

        const body = request.body()
        

        const post = await Post.create(body)

        response.status(201)

        return{
            message: "Seu post foi enviado!",
            data: post,
        }
    }

    public async index({auth}) {
        
        try {
            await auth.use('api').authenticate()
        } catch (error) {
            return{
                error,
                message: "Token inválido ou faltando."
            } 
        }

        const posts = await Post.all()

        return{
            data: posts,
        }
    }

    public async update({params, request, auth}: HttpContextContract){
        
        try {
            await auth.use('api').authenticate()
        } catch (error) {
            return{
                error,
                message: "Token inválido ou faltando."
            } 
        }

        const body = request.body();
        const post = await Post.findOrFail(params.id);

        post.title = body.title  
        post.description = body.description

        

        
        await post.save()

        return{
            message: 'Post atualizado!',
            data: post,
        }
    }

    public async destroy({params, auth}: HttpContextContract){
        
        try {
            await auth.use('api').authenticate()
        } catch (error) {
            return{
                error,
                message: "Token inválido ou faltando."
            } 
        }
               
        
        const posts = await Post.findOrFail(params.id)

        await posts. delete(

        )
        return {
            message: 'Post excluído com sucesso.',
            data: posts,
        }

    }


}
