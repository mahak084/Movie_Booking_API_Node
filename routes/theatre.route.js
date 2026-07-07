const theatreController=require('../controllers/theatre.controller');
const { validateTheatreCreateRequest } = require('../middlewares/theatre.middleware');

const routes=(app)=>{
    app.post('/mba/api/v1/theatres',
        validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete('/mba/api/v1/theatres/:id',
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


}

module.exports=routes