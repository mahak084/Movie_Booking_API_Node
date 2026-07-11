const showController=require('../controllers/show.controller');
const showMiddleware=require('../middlewares/show.middleware');

const routes=(app)=>{
    app.post('/mba/api/v1/shows',
        showController.create
    );
}

module.exports=routes;