const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const MemoryStore = require('memorystore')(session)
const Business = require('./data_models/Business.js');
const Visitor = require('./data_models/Visitor.js');
const b_data = require('./data_models/Business_Data.js');

const uri = 'mongodb+srv://joeMal:JDMdraZ3n@cluster0.pbfzk.mongodb.net/quickin?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
  const db = mongoose.connection

//   app.use(express.static(path.join(__dirname, '../')));

const publicPath = path.join(__dirname, '../quickin/build');
app.use(express.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
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



    /**********************************************
        Account authentication Get and Post Requests:
        - handles a visitors:
            - authentication to the server
            - logging in / out
            - creating session & cookie
            - destroying cookie on logout
    **********************************************/
    app.get("/visitor", function(req, res){
        let data = undefined;
        if (req.session.user) {
            Visitor.findOne({"email": req.session.user.toLowerCase()}, function(err, found){
                if(err){
                    throw err;
                }
                if(found){
                    data = found;
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/JSON");
                    res.write(JSON.stringify(data));
                }
                else{
                    res.statusCode = 401;
                    res.setHeader("Content-Type", "application/JSON");
                    res.write(data);
                }
                res.end();
            });
        }
    });

    app.get("/visitor/checkSession", function(req, res){
        let data = '';
        if (req.session.user){
            data = req.sessionID;  
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/JSON");
        res.write(JSON.stringify(data));
        res.end();
    });

    app.get("/visitor/logout", function(req, res){
        console.log(`${req.session.user} Logged Out, Cookie destroyed`);
        req.session.destroy();
        res.end();
    });

    app.post('/visitor/login', (req, res) => {
        let data = "";
        req.on('data', (chunk) => {
            data = JSON.parse(chunk);
        });
        req.on('end', () => {
            Visitor.findOne({"email": data.email.toLowerCase()}, function(err, found){
                if(err){
                    throw err;
                }
                if(found && found.password === data.password){
                    req.session.user = data.email;
                    req.session.save();
                    const login_data = {
                        authentication: true,
                    }
                    res.write(JSON.stringify(login_data));
                }
                else{
                    console.log("wrong password");
                }
                res.end();
            })
        });        
    });

    app.post('/visitor/register', (req, res) => {
        let data = "";
        req.on('data', (chunk) => {
            data = JSON.parse(chunk);
        });

        req.on('end', () => {         
            Visitor.findOne({"email": data.email.toLowerCase()}, function(err, found){
                if(err){
                    throw err;
                }
                if(found){
                    console.log("user already exists");
                }
                else{
                    const newVisitor = new Visitor ({
                        c_id: uuidv4(),
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phoneNumber: data.phoneNumber,
                        password: data.password,
                        email: data.email.toLowerCase()
                    });
    
                    newVisitor.save(function (error, document) {
                        if(error) console.error(error)
                        console.log(document)
                    });            
                    req.session.user = data.email;
                    req.session.save();
                    const login_data = {
                        authentication: true,
                    }
                    res.write(JSON.stringify(login_data));
                }
                res.end();
            });
        });      
    });

    app.get("/business", function(req, res){
        let data = undefined;
        if (req.session.business) {
            Business.findOne({"email": req.session.business.toLowerCase()}, function(err, found){
                if(err){
                    throw err;
                }
                if(found){
                    data = found;
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/JSON");
                    res.write(JSON.stringify(data));
                    console.log(data);
                }
                else{
                    res.statusCode = 401;
                    res.setHeader("Content-Type", "application/JSON");
                    res.write(data);
                }
                res.end();
            });
        }
    });

    app.get("/business/checkSession", function(req, res){
        let data = '';
        if (req.session.business){
            data = req.sessionID;  
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/JSON");
        res.write(JSON.stringify(data));
        res.end();
    });

    app.post('/business/login', (req, res) => {
        let data = "";
        req.on('data', (chunk) => {
            data = JSON.parse(chunk);
        });
        req.on('end', () => {

            Business.findOne({"email": data.email.toLowerCase()}, function(err, found) {
                if(err) {
                    throw err;
                }
                if(found && found.password === data.password) {
                    req.session.business = data.email;
                    const login_data = {
                        authentication: true,
                    };
                    res.write(JSON.stringify(login_data));
                }
                else {
                    console.log('Incorrect login');
                }
                res.end();
            });
            
        });        
    });

app.post('/business/register', (req, res) => {
    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });
    
    
    req.on('end', () => {

        Business.findOne({"businessName": data.businessName.toLowerCase()}, function(err, found) {
            if(err) {
                throw err;
            }
            if(found) {
                console.log('Business exists rip')
            } else {
                const newBusiness = new Business ({
                    businessName: data.businessName,
                    phoneNumber: data.phoneNumber,
                    password: data.password,       
                    email: data.email,
                    addressOne: data.addressOne,
                    addressTwo: data.addressTwo,
                    city: data.city,
                    postalCode: data.postalCode,
                    province: data.province,
                    country: 'Canada',
                    businessId: uuidv4(),
                    businessKey: data.businessName
                });

                newBusiness.save(function (error, document) {
                    if(error) console.log(error)
                    console.log(document)
                });

                req.session.business = data.email;
                req.session.save();
                const login_data = {
                    authentication: true,
                };
                res.write(JSON.stringify(login_data));
            }
            res.end();
        });
    });      
});

app.post('/checkIn', (req, res) => {

    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });
    req.on('end', () => {         
        if (req.session.user) {
            Business.findOne({"businessId": data.businessId}, function(err, businessFound) {
                if(err){
                    throw err;
                }
                if(businessFound){                
                    const _date = new Date();
                    let currentTime = _date.toISOString();
                    Visitor.findOne({"c_id": data.visitorId}, function(err, found){
                        if (err){
                            throw err;
                        }
                        if (found) {
                        
                            const newCheckIn = new b_data ({
                                b_id: businessFound.businessId,
                                timeOfVisit: currentTime,
                                visitorFName: found.firstName,
                                visitorLName: found.lastName,
                                vistorNumber: found.phoneNumber
                            });
                    
                            newCheckIn.save(function (error, document) {
                                if(error) console.log(error)
                                console.log(document)
                            });    
                            data = {message: "success"}       
                            res.write(JSON.stringify(data));   
                            res.end();
                        }
                    })                                                         
                }
                else{         
                    data = 'Sorry, that business does not exist. 😢. Please try again.'       
                    res.write(data);
                    res.end();
                }
                
            });
        }        
    });     
});


app.get("/businessData", function(req, res){

    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
        console.log(data)
    });
    req.on('end', () => {  
    if (req.session.business) {
        b_data.find({"businessId": data.businessId}, function(err, found){
            if(err){
                throw err;
            }
            if(found){                                  
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/JSON");
                res.write(JSON.stringify(found));          
            }
            else{
                res.statusCode = 401;
                res.setHeader("Content-Type", "application/JSON");
                res.write('Nope.');
            }
            res.end();
        });
    }
});
});




/**********************************************
 Server Information
********************************************* */
app.listen(process.env.PORT || 5000);

    console.log(`Please ensure the react-app is running and navigate to ${process.env.PORT || 5000}`);

    
})
.catch(err => console.log(err))



