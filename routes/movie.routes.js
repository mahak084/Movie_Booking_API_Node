const MovieController=require('../controllers/movie.controller')
const MovieMiddleware=require('../middlewares/movie.middleware')
const authMiddleware=require('../middlewares/auth.middleware')


const routes=(app)=>{
    app.post('/mba/api/v1/movies',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        MovieMiddleware.validateMovieCreateRequest,
        MovieController.createMovie);

    app.delete('mba/api/v1/movies/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        MovieController.deleteMovie);

    app.get('/mba/api/v1/movies/:id',
        MovieController.getMovie);

    app.put('mba/api/v1/movies/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        MovieMiddleware.validateMovieCreateRequest,
        MovieController.updateMovie);

    app.patch('mba/api/v1/movies/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        MovieController.updateMovie);

    app.get('/mba/api/v1/movies',
        MovieController.getMovies
    )


}

module.exports=routes;