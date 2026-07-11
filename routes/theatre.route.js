const theatreController=require('../controllers/theatre.controller');
const { validateTheatreCreateRequest ,validateUpdateMoviesRequest} = require('../middlewares/theatre.middleware');
const authMiddleware=require('../middlewares/auth.middleware')

const routes=(app)=>{
    app.post('/mba/api/v1/theatres',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete('/mba/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.destroy
    );

    app.get('mba/api/v1/theatres/:id',
        
        theatreController.getTheatre
    );

    app.put('mba/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.update
    );

    app.patch('mba/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.update
    );

    app.patch('mba/api/v1/theatres/:id/movies',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        validateUpdateMoviesRequest,
        theatreController.updateMovies
    )

    app.get(
        '/mba/api/v1/theatres/:id/movies',
        theatreController.getMovies
    )

    app.get('/mb/api/v1/theatres/:theatreId/movies/:movieId',
        theatreController.checkMovie
    )

}

module.exports=routes