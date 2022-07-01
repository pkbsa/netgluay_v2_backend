var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

const bcrypt = require("bcryptjs");

const { request } = require("http");

var connection = mysql.createConnection({
  host: "202.183.167.111",
  user: "itcs212_2_6",
  password: "IGR94KRW",
  database: "itcs212_2_6",
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

app.listen(3000);
