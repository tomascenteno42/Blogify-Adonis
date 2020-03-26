'use strict'

const Post = use('App/Models/Post');


class PostController {
    async home({ view, auth }) {
        const posts = await Post.query().with('user').fetch();
        return view.render('index', { posts: posts.toJSON() });
    }

    async userPosts({ view, auth }) {
        const posts = await auth.user.posts().fetch();
        
        const user = await auth.user;
        return view.render('posts', { posts: posts.toJSON(), user: user.toJSON() })
    }

    async create({ request, response, auth, session }) {
        const post = request.all();

        const posted = await auth.user.posts().create({
            title: post.title,
            subtitle: post.subtitle,
            body: post.body
        })
        session.flash({ message: 'Your Post has been posted!' })

        return response.redirect('back');
    }
    
    async delete({ response, session, request}) {
        const post = request.post;
        await post.delete();
        session.flash({ message: 'Your post have been deleted from the galaxy' })
        return response.redirect('/myposts');
    }

    async edit({ response, auth, request, view }) {
        const post = request.post;

        if(post.user_id != auth.user.id) {
            return response.redirect('/myposts')
        }

        return view.render('/edit', { post: post })
    }
    
    async update({ response, request, auth, params, session }) {
        const post = request.post;
        if(post.user_id != auth.user.id) {
            return response.redirect('/myposts')
        }

        post.title = request.all().title;
        post.subtitle = request.all().subtitle;
        post.body = request.all().body;

        await post.save();

        session.flash({ message: 'Your Post has been updated' });
        return response.redirect('/myposts');
    }
}

module.exports = PostController
