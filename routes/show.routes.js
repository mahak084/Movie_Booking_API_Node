const showController=require('../controllers/show.controller');
const showMiddleware=require('../middlewares/show.middleware');
const authMiddleware=require('../middlewares/auth.middleware')

const routes=(app)=>{
    app.post('/mba/api/v1/shows',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showMiddleware.validateCreateShowRequest,
        showController.create
    );

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    );

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    );


}

module.exports=routes;