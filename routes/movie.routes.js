const MovieController=require('../controllers/movie.controller')


const routes=(app)=>{
    app.post('/mba/api/v1/movies',MovieController.createMovie);

    app.delete('mba/api/v1/movies/:id',MovieController.deleteMovie);

    app.get('/mba/api/v1/movies/:id', MovieController.getMovie);

    app.put('mba/api/v1/movies/:id', MovieController.updateMovie);

    app.patch('mba/api/v1/movies/:id', MovieController.updateMovie);

    
}

module.exports=routes;