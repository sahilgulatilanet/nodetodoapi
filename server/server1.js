const _=require('lodash');
var express=require('express');
var bodyParser=require('body-parser');
var {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/Todo');
//const {User} = () => db.User.bulkCreate('./models/Users')
var {User}=require('./models/Users');
var {authenticate}=require('./middleware/authenticate');
//var {authenticate}=() =>db.authenticate.bulkCreate('./middleware/authenticate');
var app=express();

app.use(bodyParser.json());
app.use(bodyParser());

app.post('/todos',/*authenticate,*/(req,res)=>{
    console.log(req.body);
    var todo=new Todo({
        text: req.body.text,
        //__creator:req.user._id
    });
    todo.save().then((doc)=>{
        res.send(doc);
        //res.send();
    },(e)=>{
        res.status(400).send(e);
    });

});
app.get('/todos',/* authenticate,*/(req,res)=>{
    Todo.find(/*{
        __creator:req.user._id
    }*/).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});
app.get('/todos/:id',(req,res)=>{
    //res.send(req.params);
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('id not valid');
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send(todo);
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });

});
app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('id not valid');
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send(todo);
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});
app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','completed'])
    if(!ObjectID.isValid(id)){
        return res.status(404).send('id not valid');
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }
    else {
        body.completed=false;
        body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(404).send();

    });
});
app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);

    user.save().then((/*user*/)=>{
        //res.send(user);
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.get('/users/me',authenticate,(req,res)=>{
    /*var token=req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject('user not found');
        }
        res.send(user);
    }).catch((e)=>{
        res.status(401).send(e);
    });*/
    res.send(req.user);
});

app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
        //res.send(user);
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
       res.status(400).send();
    });
});

app.listen(3000,()=>{
    console.log('server up on port 3000');
});
module.exports={app};
