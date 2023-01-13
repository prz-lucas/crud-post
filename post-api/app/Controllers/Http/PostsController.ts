import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

export default class PostsController {
    public async store({request, response}: HttpContextContract) {


        async ({ auth }) => {
            await auth.use('web').authenticate()
        }

        const body = request.body()

        const post = await Post.create(body)

        response.status(201)

        return{
            message: "Seu post foi enviado!",
            data: post,
        }
    }

    public async index() {
        
        const posts = await Post.all()

        return{
            data: posts,
        }
    }

    public async update({params, request}: HttpContextContract){
        
        const body = request.body();
        const post = await Post.findOrFail(params.id)

        post.title = body.title
        post.description = body.description

        await post.save()

        return{
            message: 'Post atualizado!',
            data: post,
        }
    }

    public async destroy({params}: HttpContextContract){
        const posts = await Post.findOrFail(params.id)

        await posts. delete(

        )
        return {
            message: 'Post excluído com sucesso.',
            data: posts,
        }

    }


}
