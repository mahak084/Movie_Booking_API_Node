const theatreController=require('../controllers/theatre.controller');
const { validateTheatreCreateRequest ,validateUpdateMoviesRequest} = require('../middlewares/theatre.middleware');
const authMiddleware=require('../middlewares/auth.middleware')

const routes=(app)=>{
    app.post('/mba/api/v1/theatres',
        validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete('/mba/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        theatreController.destroy
    );

    app.get('mba/api/v1/theatres/:id',
        theatreController.getTheatre
    );

    app.put('mba/api/v1/theatres/:id',
        theatreController.update
    );

    app.patch('mba/api/v1/theatres/:id',
        theatreController.update
    );

    app.patch('mba/api/v1/theatres/:id/movies',
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