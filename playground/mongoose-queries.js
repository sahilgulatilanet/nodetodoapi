const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/Todo');
const {User}=require('./../server/models/Users');
/*var id='5a71a005d3a0503354b86e9';
if(!ObjectID.isValid(id))
{
    return console.log('not a valid id');
}
/*Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos',todos);
});
Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log('Todo',todo);
});
Todo.findById(id).then((todoid)=>{
    if(!todoid){
        return console.log('Id not found');
    }
    console.log('TodoId',todoid);
}).catch((e)=>{
    console.log(e);
});*/
var id='5a71bb63f66c47f393465b77';
User.findById({
    _id:id
}).then((byid)=>{
    console.log('userById',byid);
});