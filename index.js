import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UsersRoute from './app/routes/UsersRoute.js';
import RoleUserRoute from './app/routes/RoleUserRoute.js';
import AuthRoute from './app/routes/AuthRoute.js';
// import DB from './app/config/database.js';

// Check database connection
// DB.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch((e) => console.log(e.message));

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || process.env.APP_PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(UsersRoute);
app.use(RoleUserRoute);
app.use(AuthRoute);

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
