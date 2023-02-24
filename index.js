import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UsersRoute from './app/routes/UsersRoute.js';
import UserRolesRoute from './app/routes/UserRolesRoute.js';
import AuthRoute from './app/routes/AuthRoute.js';
import DataRoute from './app/routes/DataRoute.js';
import PostRoute from './app/routes/PostRoute.js';
import PagesRoute from './app/routes/PagesRoute.js';
// import DB from './app/config/database.js';
// import UserModel from './app/models/UsersModel.js';
// import UserRolesModel from './app/models/UserRolesModel.js';
// import DataModel from './app/models/DataModel.js';
// import PostModel from './app/models/PostModel.js';

// Check database connection
// DB.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch((e) => console.log(e.message));

// Sync and create table in database (sequelize fiture) UserRolesModel first before UserModel
// UserModel.sync({ force: true })
//   .then(console.log('Table created succesfully'))
//   .catch((e) => console.log(e?.message));

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || process.env.APP_PORT;

// Set trust proxy for express-rate-limit
app.set('trust proxy', 2);

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Routes
app.use(UsersRoute);
app.use(UserRolesRoute);
app.use(AuthRoute);
app.use(DataRoute);
app.use(PostRoute);
app.use(PagesRoute);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
