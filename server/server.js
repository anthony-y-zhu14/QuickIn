const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
// const publicPath = path.join(__dirname, '../quickin/build');
// app.use(express.static(publicPath));
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
// app.get('/dashboard', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
// app.get('/account', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
// app.get('/trading', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
// app.get('/market', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
// app.get('/market/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });
app.use(express.static(path.join(__dirname, '../')));

app.use(session({
    name: 'Plumbus',
    secret: 'fleeb_juice',
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, //true by default
        maxAge: 3600000, //milliseconds (1hr)
        sameSite: true //strict
    }
}));

const visitors = {
    "Rick123@gmail.com": {
        firstName: "Rick",
        lastName: "Sanchez",
        phoneNumber: "6132252320",
        password: "123456",       
        email: "Rick123@gmail.com"
    }
}

const resturant = {
    "Shoney's" : {
        name: "Shoney's",
        address: "home",
        email: "Shoneys@gmail.com",
        phoneNumber: "6132252320",
    }
}

/**********************************************
    Account authentication Get and Post Requests:
     - handles a visitors:
        - authentication to the server
        - logging in / out
        - creating session & cookie
        - destroying cookie on logout
**********************************************/
app.post('/visitor/login', (req, res) => {
    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });
    req.on('end', () => {
        console.log(data);
        if(visitors[data.email] && visitors[data.email].password === data.password) {
            req.session.user = visitors[data.email]['email'];
            req.session.save();
            const login_data = {
                authentication: true,
            };
            res.write(JSON.stringify(login_data));
        }
        else if(visitors[data.email] && visitors[data.email].password !== data.password) {
        const login_data = {
            authentication: 'passwordError',
        };
        res.write(JSON.stringify(login_data));
        } else {
            const login_data = {
                authentication: 'usernameError',
            };
            res.write(JSON.stringify(login_data));
        }
        res.end();
    });        
});

app.post('/visitor/register', (req, res) => {
    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });
    req.on('end', () => {
        console.log(data);
        if(!visitors[data.email]) {
            const newVisitor = {
                firstName: data.firstName,
                lastName: data.lastname,
                phoneNumber: data.phoneNumber,
                password: data.password,       
                email: data.email
            }
            visitors[data.email] = newVisitor;
            req.session.user = visitors[email].email;
            req.session.save();
            const login_data = {
                authentication: true,
            };
            res.write(JSON.stringify(login_data));
        }
        else if(visitors[email]) {
            const login_data = {
                authentication: 'usernameError'
            };
            res.write(JSON.stringify(login_data));
        }
        res.end();
    });      
});

/**********************************************
 Server Information
********************************************* */
app.listen(process.env.PORT || 5000);

    console.log(`Please ensure the react-app is running and navigate to ${process.env.PORT || 5000}`);