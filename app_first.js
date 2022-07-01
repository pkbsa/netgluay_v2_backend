var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const { request } = require('http');

var connection = mysql.createConnection({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'netgluay-db'
});

connection.connect((error) => {
    if (error) console.log(error)
    else console.log("MYSQL Connected...")
})

var app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const publicDirectory = path.join(__dirname+'/css');
app.use(express.static(publicDirectory));

app.set('view engine', 'ejs');


app.get('/', function(request, response){
    if(request.session.loggedin){
        response.redirect('/home')
    }else{
        response.render('landingPage')
    }
})

app.get('/login', function(request, response){
    if(request.session.loggedin){
        response.redirect('/home')
    }else{
        response.render('login')
    }
})

app.get('/register', function(request, response){
    if(request.session.loggedin){
        response.redirect('/home')
    }else{
        response.render('register')
    }
})

app.post('/auth_login', function(request, response){
    var email = request.body.email;
    var password = request.body.password;
    if (email && password){
        connection.query('SELECT * FROM users WHERE (email = ? OR name = ?) AND password = ?',[email,email,password], function(error, results, fields){
            if(results.length > 0){
                var username = results[0].name;
                var img = results[0].img;
                request.session.loggedin = true;
                request.session.username = username;
                request.session.img = img;
                response.redirect('/home');
            }else{
                response.send("Username or Password is incorrect")
            }
            response.end();
        });
    }else{
        response.send('Please enter Username and Password');
        response.end();
    }
})

app.post('/auth_register', function(request, response){
    var username = request.body.username;
    var email = request.body.email;
    var password = request.body.password;
    var cfpassword = request.body.cfpassword;
    console.log(username, email, password, cfpassword)
    if (username && email && password && cfpassword){
        connection.query('SELECT * FROM users WHERE email = ?',[email], function(error, results, fields){
            console.log(results)
            if(results.length > 0){
                response.send("This Email is already in used");
            }else if(password !== cfpassword){
                response.send("Passwords do not match")
            }else{
                connection.query('INSERT INTO users SET ?', {name: username, email: email, password: password, img:'https://i.imgur.com/jcpK4JC.png'}, (error,results) => {
                    request.session.loggedin = true;
                    request.session.img = "https://i.imgur.com/jcpK4JC.png";
                    request.session.username = username;
                    response.redirect('/home');
                });
            }
            response.end();
        })
    }else{
        response.send("Please Enter all the field")
        response.end();
    }
})

app.get('/logout', function(request, response){
    request.session = false;
    response.redirect('/');
    response.end();
});


app.get('/home', function(request, response){
    var sql = 'SELECT * FROM content WHERE homepage is not null';
    if(request.session.loggedin){
        connection.query(sql, function(err,data,fields){
            if(err) throw err;
            response.render('homePage',{movies: data, img: request.session.img})
        })
    }else{
        response.redirect('/login')  
    }
});

app.get('/movie', function(request,response){
    var sql = 'SELECT * FROM content WHERE type like "%movie%"';
    if(request.session.loggedin){
        connection.query(sql, function(err,data,fields){
            if(err) throw err;
            response.render('movie',{movies: data})
        })
    }else{
        response.redirect('/login')  
    }
})
app.get('/series', function(request,response){
    var sql = 'SELECT * FROM content WHERE type like "%series%"';
    if(request.session.loggedin){
        connection.query(sql, function(err,data,fields){
            if(err) throw err;
            response.render('series',{movies: data})
        })
    }else{
        response.redirect('/login')  
    }
})


app.get('/ng/:id', function(request,response){
    if(request.session.loggedin){
        let movie_id = request.params.id;
        var sql = 'SELECT * FROM content WHERE imdb like "%' + movie_id + '%"';

        connection.query(sql, function(err,data,fields){
            if(err) throw err;
            response.render('content',{movies: data})
        })
    }else{
        response.redirect('/login')  
    }
})

app.get('/result',function(request,response){
    var keyword = request.query.search;
    console.log(keyword)
    connection.query(`SELECT * FROM content WHERE name LIKE "%${keyword}%" OR year LIKE "%${keyword}%" OR genre LIKE "%${keyword}%" OR type LIKE "%${keyword}%" OR imdb LIKE "%${keyword}%" `,function(err,data,field){
        if (err) throw err;
        response.render('searchResult',{movies: data})
    })     
})

app.listen(3000);