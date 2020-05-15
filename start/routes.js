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
Route.group(() => {
    Route.get('/', 'PostController.home');
    Route.get('/posts/:id', 'PostController.show').middleware('findPost');    
}).prefix('/')
//Sign up

Route.group(() => {

    Route.on('/').render('auth/signup');
    Route.post('/', 'UserController.create').validator('RegisterUser');
}).prefix('/signup')

//Login
Route.group(() => {

    Route.on('/').render('auth/login');
    Route.post('/', 'UserController.login').validator('LoginUser');    
}).prefix('/login')

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();

    return response.redirect('/')
});


Route.group(() =>{
    
    Route.get('/', 'PostController.userPosts');
    Route.post('/', 'PostController.create').validator('CreatePost')

    Route.get('/edit/:id', 'PostController.edit');
    Route.post('/edit/:id', 'PostController.update');
    Route.delete('/:id', 'PostController.delete');
}).prefix('/myposts').middleware('findPost');


