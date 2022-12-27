var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");

const bcrypt = require("bcryptjs");

const { request } = require("http");

var connection = mysql.createConnection({
  host: 'localhost',
  user:  'root',
  password: '',
  database: 'netgluay-db'
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("MYSQL Connected...");
});

var app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const publicDirectory = path.join(__dirname + "/css");
app.use(express.static(publicDirectory));

app.set("view engine", "ejs");

app.get("/", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("/home");
  } else {
    response.render("landingPage");
  }
});

app.get("/login", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("/home");
  } else {
    response.render("login", { message: "", user: "" });
  }
});

app.get("/register", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("/home");
  } else {
    response.render("register", { message: "", user: "", email: "" });
  }
});

app.post("/auth_login", async (request, response) => {
  var email = request.body.email;
  var password = request.body.password;

  hashedpassword = await bcrypt.hash(password, 8);

  if (email && password) {
    connection.query(
      "SELECT * FROM users WHERE name = ? ",
      [email],
      async (error, results, fields) => {
        //console.log(results);
        if (results.length > 0) {
          if ((await bcrypt.compare(password, results[0].password)) == true) {
            var username = results[0].name;
            var img = results[0].img;
            request.session.loggedin = true;
            request.session.username = username;
            request.session.img = img;
            console.log("User [" + username + "] logged in")
            response.redirect("/home");
          } else {
            response.status(401).render("login", {
              message: "password",
              user: email,
            });
          }
        } else {
          response.status(401).render("login", {
            message: "user",
            user: email,
          });
        }
        response.end();
      }
    );
  } else {
    if (!email && !password) {
      response.status(401).render("login", {
        message: "userpassword",
        user: email,
      });
    } else if (!email) {
      response.status(401).render("login", {
        message: "userblank",
        user: email,
      });
    } else {
      response.status(401).render("login", {
        message: "passwordblank",
        user: email,
      });
    }
  }
});

app.post("/auth_register", async (request, response) => {
  var username = request.body.username;
  var email = request.body.email;
  var password = request.body.password;
  var cfpassword = request.body.cfpassword;
  //console.log(username, email, password, cfpassword);
  if (username && email && password && cfpassword) {
    connection.query(
      "SELECT * FROM users WHERE (email = ? or name= ?)",
      [email, username],
      async (error, results, fields) => {
        //console.log(results);
        if (results.length > 0) {
          if (results[0].name == username) {
            response.status(401).render("register", {
              message: "username",
              user: username,
              email: email,
            });
          } else {
            response.status(401).render("register", {
              message: "email",
              user: username,
              email: email,
            });
          }
        } else if (password !== cfpassword) {
          response.status(401).render("register", {
            message: "password",
            user: username,
            email: email,
          });
        } else {
          hashedpassword = await bcrypt.hash(password, 8);
          //console.log(hashedpassword);

          connection.query(
            "INSERT INTO users SET ?",
            {
              name: username,
              email: email,
              password: hashedpassword,
              img: "https://i.imgur.com/9S77aYT.jpg",
            },
            (error, results) => {
              request.session.loggedin = true;
              request.session.img = "https://i.imgur.com/9S77aYT.jpg";
              request.session.username = username;
              response.redirect("/home");
              console.log("User [" + username + "] registered")
              console.log("User [" + username + "] logged in")
            }
          );
        }
      }
    );
  } else {
    response.status(401).render("register", {
      message: "blank",
      user: username,
      email: email,
    });
    response.end();
  }
});

app.get("/logout", function (request, response) {
    console.log("User [" + request.session.username + "] logged out")
  request.session.loggedin = false;
  response.redirect("/");
  response.end();
});

app.get("/home", function (request, response) {
  var sql = "SELECT * FROM content WHERE homepage is not null";
  if (request.session.loggedin) {
    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render("homePage", { movies: data, img: request.session.img });
    });
  } else {
    response.redirect("/login");
  }
});

app.get("/movie", function (request, response) {
  var sql = 'SELECT * FROM content WHERE type like "%movie%"';
  if (request.session.loggedin) {
    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render("movie", { movies: data });
    });
  } else {
    response.redirect("/login");
  }
});
app.get("/series", function (request, response) {
  var sql = 'SELECT * FROM content WHERE type like "%series%"';
  if (request.session.loggedin) {
    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render("series", { movies: data });
    });
  } else {
    response.redirect("/login");
  }
});

app.get("/ng/:id", function (request, response) {
  if (request.session.loggedin) {
    let movie_id = request.params.id;
    var sql = 'SELECT * FROM content WHERE imdb like "%' + movie_id + '%"';

    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      response.render("content", { movies: data });
    });
  } else {
    response.redirect("/login");
  }
});

app.get("/result", function (request, response) {
  var keyword = request.query.search;
  //console.log(keyword);
  connection.query(
    `SELECT * FROM content WHERE name LIKE "%${keyword}%" OR year LIKE "%${keyword}%" OR genre LIKE "%${keyword}%" OR type LIKE "%${keyword}%" OR imdb LIKE "%${keyword}%" `,
    function (err, data, field) {
      if (err) throw err;
      response.render("searchResult", { movies: data });
    }
  );
});

/* POSTMAN */

//<-- View Function -->
app.get("/userslist", function (req, res) {
  connection.query("SELECT * FROM users", function (error, results) {
    if (error)
      return res.send({
        error: true,
        message: "List of users is not found",
      });
    return res.send({ error: false, data: results, message: "Users list." });
  });
});
app.get("/movieslist", function (req, res) {
  connection.query("SELECT * FROM content", function (error, results) {
    if (error)
      return res.send({
        error: true,
        message: "List of movies is not found",
      });
    return res.send({ error: false, data: results, message: "Movies list." });
  });
});

//<-- Search Function -->
app.get("/userslist/:id", function (req, res) {
  let user_id = req.params.id;

  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user id." });
  }

  connection.query(
    "SELECT * FROM users where id=?",
    user_id,
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "User retrieved",
      });
    }
  );
});
app.get("/movieslist/:id", function (req, res) {
  let movie_id = req.params.id;
  if (!movie_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide movie id." });
  }
  connection.query(
    "SELECT * FROM content where id=?",
    movie_id,
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "Movies retrieved",
      });
    }
  );
});

//<-- INSERT Function -->
/*
{
    "users_info" : {
        "id": 1,
        "name": "Siranut",
        "email": "siranut.poko@hotmail.com",
        "password": "12345",
        "admin": "0"
    }
}
{
    "movies_info" : {
        "id": 60,
        "name": "avatar",
        "year": 2008,
        "homeImage": "",
        "posterImage": "https://i.imgur.com/K8mgJYG.jpg",
        "imdb": "tt4028464",
        "genre": "drama crime thriller",
        "type": "movie",
        "homepage": null,
        "youtube" : "hm45yGSwArY"
    }
}
*/
app.post("/userslist", async function (req, res) {
  let users_info = req.body.users_info;
  let hashedPassword = await bcrypt.hash(users_info.password, 8);
  console.log(users_info);
  if (!users_info) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide users information" });
  }
  if (users_info.admin === "") {
    users_info.admin = "0";
  }
  console.log()
  connection.query(
    "SELECT * FROM users WHERE (id = ? or email = ? or name= ?)",
    [users_info.id, users_info.email,users_info.name],
    async (error, result) => {
      console.log(result);
      if (result.length > 0) {
        console.log("Email or id is already Exist");
        return res.send({ message: "Email or id is already Exist" });
      } else {
        connection.query("INSERT INTO users SET ?",
          {
            id: users_info.id,
            name: users_info.name,
            email: users_info.email,
            password: hashedPassword,
            img: "https://i.imgur.com/9S77aYT.jpg",
            admin: users_info.admin,
          },
          function (error, results) {
            return res.send({
              error: false,
              data: results.affectedRows,
              message: "New users has been created successfully.",
            });
          }
        );
      }
    }
  );
});
app.post("/movieslist", async function (req, res) {
  let movies_info = req.body.movies_info;
  console.log(movies_info);

  if (!movies_info) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide movie information" });
  }
  connection.query(
    "INSERT INTO content SET ? ",
    movies_info,
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "New movies has been created successfully.",
      });
    }
  );
});
//<-- UPDATE Function -->
/*
{
    "users_info" : {
        "id": 20,
        "name": "PostmanEdit",
        "email": "PostmanEdit.PostmanEdit@hotmail.com",
        "password": "PostmanEdit",
        "admin": "1"
    }
}
{
    "movies_info" : {
        "id": 60,
        "name": "Avatar Edit",
        "year": 2020,
        "homeImage": "",
        "posterImage": "https://i.imgur.com/K8mgJYG.jpg",
        "imdb": "tt4028464",
        "genre": "drama crime thriller",
        "type": "movie",
        "homepage": null,
        "youtube" : "hm45yGSwArY"
    }
}
*/
app.put("/userslist/", async function (req, res) {
  let userID = req.body.users_info.id;
  let users_info = req.body.users_info;
  let userPassword = req.body.users_info.password;
  console.log(users_info);

  if (!userID || !users_info) {
    return res
      .status(400)
      .send({ error: users_info, message: "Please provide user information" });
  }

  if (!userPassword) {
    connection.query(
      "UPDATE users SET ? WHERE id = ?",
      [
        {
          id: users_info.id,
          name: users_info.name,
          email: users_info.email,
          admin: users_info.admin,
        },
        userID,
      ],
      function (error, results) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "User has been updated successfully (Without Password).",
        });
      }
    );
  } else {
    let hashedPassword = await bcrypt.hash(users_info.password, 8);
    connection.query(
      "UPDATE users SET ? WHERE id = ?",
      [
        {
          id: users_info.id,
          name: users_info.name,
          email: users_info.email,
          password: hashedPassword,
          admin: users_info.admin,
        },
        userID,
      ],
      function (error, results) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results.affectedRows,
          message: "User has been updated successfully (With Password).",
        });
      }
    );
  }
});
app.put("/movieslist/", function (req, res) {
  let movieID = req.body.movies_info.id;
  let movies_info = req.body.movies_info;

  if (!movieID || !movies_info) {
    return res
      .status(400)
      .send({
        error: movies_info,
        message: "Please provide movie information",
      });
  }
  connection.query(
    "UPDATE content SET ? WHERE id = ?",
    [movies_info, movieID],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Movie has been updated successfully.",
      });
    }
  );
});
//<-- DELETE Function -->
/*
{
    "userID": 20
}
{
    "movieID": 60
}
*/
app.delete("/userslist/", function (req, res) {
  let userID = req.body.userID;

  if (!userID) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_ID" });
  }

  connection.query(
    "DELETE FROM users WHERE id = ?",
    [userID],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Users has been deleted successfully.",
      });
    }
  );
});
app.delete("/movieslist/", function (req, res) {
  let movieID = req.body.movieID;

  if (!movieID) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide movieID" });
  }
  connection.query(
    "DELETE FROM content WHERE id = ?",
    [movieID],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Content has been deleted successfully.",
      });
    }
  );
});
//<-- ---------- -->

app.use("/login_admin", async function (req, res) {
  let email = req.body.username;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please provide an email and password",
    });
  }
  connection.query(
    "SELECT * FROM users WHERE name = ?",
    [email],
    async (error, results) => {
      console.log(results);
      //<-- Check if users exist and password matches -->
      if (
        results.length == 0 ||
        !(await bcrypt.compare(password, results[0].password)) ||
        results[0].admin != "1"
      ) {
        res.status(400).send({
          message: "Email or Password is incorrect",
        });
      } else {
        //<-- if login successful creating token -->
        res.send({
          token: results[0].name,
        });
      }
    }
  );
});

const port = process.env.PORT || 4206;
app.listen(port, function(){
    console.log("Listening at Port " + port);
  });
