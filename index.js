import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UsersRoute from './app/routes/UsersRoute.js';
import UserRolesRoute from './app/routes/UserRolesRoute.js';
import AuthRoute from './app/routes/AuthRoute.js';
import PagesRoute from './app/routes/PagesRoute.js';
// import DB from './app/config/database.js';
// import UserModel from './app/models/UsersModel.js';
// import UserRolesModel from './app/models/UserRolesModel.js';

// Check database connection
// DB.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch((e) => console.log(e.message));

// Sync and create table in database (sequelize fiture) UserRolesModel first before UserModel
// UserRolesModel.sync({ force: true })
//   .then(console.log('Table created succesfully'))
//   .catch((e) => console.log(e?.message));

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || process.env.APP_PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(UsersRoute);
app.use(UserRolesRoute);
app.use(AuthRoute);
app.use(PagesRoute);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
