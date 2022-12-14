const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const path = require('path');
const { Socket } = require('socket.io');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var server = require('http').createServer(app);

const users = []

var currUser

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.get('/style2.css', (req, res) => {
    res.sendFile(__dirname + '/style2.css');
})

app.get('/style3.css', (req, res) => {
    res.sendFile(__dirname + '/style3.css');
})

app.get('/mainPage.html', (req, res) => {
    res.sendFile(__dirname + '/mainPage.html');
})

app.get('/mainPage.js', (req, res) => {
    res.sendFile(__dirname + '/mainPage.js');
})

app.get('/loged_in.js', (req, res) => {
    res.sendFile(__dirname + '/loged_in.js');
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.get('/communScript.js', (req, res) => {
    res.sendFile(__dirname + '/communScript.js');
})

app.get('/Coding-Tips', (req, res) => {
    res.sendFile(__dirname + '/community.html');
})

app.get('/Study-Room', (req, res) => {
    res.sendFile(__dirname + '/community.html');
})

app.get('/UofC', (req, res) => {
    res.sendFile(__dirname + '/community.html');
})

app.get('/SENG513', (req, res) => {
    res.sendFile(__dirname + '/community.html');
})

app.get('/SENG-Courses', (req, res) => {
    res.sendFile(__dirname + '/community.html');
})

app.get('/UserProfile.html', (req, res) => {
    res.sendFile(__dirname + '/UserProfile.html');
})
app.get('/forgotpw.html', (req, res) => {
    res.sendFile(__dirname + '/forgotpw.html');
})

// when a client is connected
io.on('connection', (socket) => 
{
    socket.on('signup', async ({username, password}) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {name: username, password: hashedPassword}
        users.push(user)
        console.log("-------------------------------------------------------------------");
        console.log(users);
        io.emit("successfulSignUp", (username))
      
        // Add user to database
      
        //const isCreateUserSuccess = await database.createUser(user);

      
    })

    socket.on("reconfirmPass", ({username}) => {
        io.emit("reconfirmYourPass", (username))
    })

    socket.on('login', async ({username, password,}) => {
      
        // Pull user from database
      
        const user = users.find(user => user.name == username) 
        if(user == null)
        {
            console.log("+++++++++++++++++++++++++")
            console.log('Cannot find user')
            io.emit('usrNotFound', (username))
        }
        else
        {
            if(await bcrypt.compare(password, user.password))
            {
                console.log("+++++++++++++++++++++++++")
                console.log('Success')
                io.emit('succesfulLogin', (username))
                currUser = username
            }
            else
            {
                console.log("+++++++++++++++++++++++++");
                console.log('Not Allowed')
                io.emit('NotAllowed', (username))
            }
        }
    })
  
  socket.on("posted", ({title, content, community, username}) => {
      
    // Pull posts from database
    
    io.emit("updatePosts", ({title: title, content: content, community: community, username: username}));
  })
  
  socket.on("postLiked", ({postId}) => {
    console.log("like received")
  })
  
});

http.listen(3000)