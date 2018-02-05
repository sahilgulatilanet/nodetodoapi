const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017',(err,db)=>{
    if(err){
        return console.log('connection error');
    }
    console.log('connected');
    var dbo=db.db('mydb');
    dbo.collection('users').findOneAndUpdate({_id:new ObjectID('5a701cffff72ea0b68cc8d5f')},{$set:{location:'ldh'},$inc:{age:1}},{returnOriginal:false}).then((result)=>{
        console.log(result)
    });
    db.close();
});