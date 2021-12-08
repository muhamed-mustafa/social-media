const express  = require('express'),
      helmet   = require('helmet'),
      morgan   = require('morgan'),
      mongoose = require('mongoose'),
      multer   = require('./middlewares/uploadFiles');

require("dotenv/config");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(multer);

// Routes
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');

app.use('/api' , authRouter);
app.use('/api/users' , userRouter);
app.use('/api/posts' , postRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBSERVER}/${process.env.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connection is ready..."))
  .catch((e) => console.log("Error is : " + e));
  
const PORT = 3000 || process.env.PORT;
app.listen(PORT , () => console.log(`Server Running On PORT ${PORT}`));