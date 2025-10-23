import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import bookController from './controllers/book-controller.js';

const routes = Router();

routes.use(homeController);
routes.use('/movies', bookController);

routes.get('*', (req, res) => {    
    res.render('404');
});  
 
export default routes;   