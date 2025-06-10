const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const authRoutes = require("./routes/authRouter");
const pollRoutes = require("./routes/pollRouter");
const errorHandler = require("./middlewares/errorMiddleware");
const subscriptionRoutes = require("./routes/subscriptionRouter");
const CustomError = require("./utils/customError");
const friendRoutes = require("./routes/friendRouter");
const cookieParser = require('cookie-parser');
require("./utils/pollResultCron");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
//db connection
dbConnection();
//server listen
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//error handler


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/polls', pollRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/friends', friendRoutes);
// app.use('/api/v1/invitations', invitationRoutes);
app.all('*', (req, res, next) => {
    next(new CustomError('Route not found', 404));
  });
app.use(errorHandler);
