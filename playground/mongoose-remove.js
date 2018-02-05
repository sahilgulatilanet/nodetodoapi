const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/Todo');
const {User}=require('./../server/models/Users');

/*Todo.remove().then((result)=>{
    console.log(result);
});*/

Todo.findByIdAndRemove('5a72b936a01f671dc00e399b').then((result)=>{
    console.log(result);
});
Todo.findOneAndRemove({_id:'5a72b936a01f671dc00e399b'}).then((result)=>{
    console.log(result);
});