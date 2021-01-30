

/**********************************************
    Account authentication Get and Post Requests:
     - handles a visitors:
        - authentication to the server
        - logging in / out
        - creating session & cookie
        - destroying cookie on logout
**********************************************/
app.post('/login', (req, res) => {
    let data = "";
    req.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });

    req.on('end', () => {
      console.log(data);

    let username = data.username;
    let password = data.password;
    authenticate(username, password);
    res.end();
    });

    function authenticate(username, password) {
        if(visitors[username] && visitors[username]['password'] === password) {
            console.log(`Client ${username} authenticated succesfully.`);
            const USER_TOKEN = uuidv4();
            req.session.user = visitors[username]['username'];
            req.session.session_id = USER_TOKEN;
            req.session.save();
            const login_data = {
                authentication: 'true',
                session_id: USER_TOKEN
            };
            res.write(JSON.stringify(login_data));
        }
        else if(visitors[username] && visitors[username]['password'] !== password) {
          const login_data = {
              authentication: 'passwordError',
              session_id: false
          };
          res.write(JSON.stringify(login_data));
        } else {
            const login_data = {
                authentication: 'usernameError',
                session_id: false
            };
            res.write(JSON.stringify(login_data));
        }
    }
});