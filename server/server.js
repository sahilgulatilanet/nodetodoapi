var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb1');
var Todo=mongoose.model('Todo',{
   text:{
       type:String,
       required:true,
       minlength:1,
       trim:true
   },
    completed:{
       type:Boolean,
        default:false
    },
    completedAt:{
       type:Number,
        default:null
    }
});
var newTodo=new Todo({
    text:'    video1      ',
    completed:true,
    completedAt:0

});
newTodo.save().then((doc)=>{
    console.log('saved todo',doc);
},(e)=>{
    console.log('unable to save',e);
});
