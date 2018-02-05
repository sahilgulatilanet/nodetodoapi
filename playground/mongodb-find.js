const Mclient=require('mongodb').MongoClient;
Mclient.connect('mongodb://localhost:27017',(err,db)=>{
    if(err){
        return console.log('connection error');
    }
    console.log('connected');
    var dbo=db.db('mydb');
    dbo.collection('users').find({unm:'sahil1'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log(err);
    });
    dbo.collection('users').find().count().then((docs)=>{
        //console.log(JSON.stringify(docs,undefined,2));
        console.log('count is:',docs);
    },(err)=>{
        console.log(err);
    });
    db.close();
});