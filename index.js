const express = require("express");
const env = require("./src/config/env.js");
const PORT = env.PORT || 5000;


const AuthRoutes = require("./src/routes/auth_routes.js");

const UserRoutes = require("./src/routes/user_routes.js");

const TaskRoutes = require("./src/routes/task_routes.js");

const imageUploads = require("./src/routes/uploads_route.js");

const errorHandler = require("./src/middlewares/error_handler.js");

const path = require("path");


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", imageUploads);
app.use("/images", express.static(path.join(__dirname, './uploads')))

app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/tasks", TaskRoutes);


app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on ${PORT}........`));
