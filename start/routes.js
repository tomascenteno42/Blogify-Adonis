'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PostController.home');

Route.on('/signup').render('auth/signup');
Route.post('/signup', 'UserController.create').validator('RegisterUser');

Route.on('/login').render('auth/login');
Route.post('/login', 'UserController.login').validator('LoginUser');

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();

    return response.redirect('/')
});


Route.get('/myposts', 'PostController.userPosts');
Route.post('/myposts', 'PostController.create').validator('CreatePost')

Route.group(() =>{
    Route.get('/edit/:id', 'PostController.edit');
    Route.post('/edit/:id', 'PostController.update');
    Route.delete('/:id', 'PostController.delete');
}).prefix('/myposts').middleware('findPost');


