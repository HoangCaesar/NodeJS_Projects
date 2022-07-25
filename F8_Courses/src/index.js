import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './config/db';
import route from './routes/index.js';
import methodOverride from 'method-override';
import SortMiddleware from './app/middleware/SortMiddleware';

const app = express();
const port = 3000;

// config variable: path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connest to db
connectDb();

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    sort: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'icofont-sort',
        asc: 'icofont-long-arrow-up',
        desc: 'icofont-long-arrow-down'
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}" style="text-decoration: none">
      <i class="${icon}"></i>
  </a>`
    }
  }
}));
app.set('view engine', 'hbs');

app.set('views', `${__dirname}/resource/views`);

// Static files
app.use(express.static(`${__dirname}/public`));

// Body-parser settings => To read body info
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//  HTTP (middleware)
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(SortMiddleware);

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});