const MClient=require('mongodb').MongoClient;
MClient.connect('mongodb://localhost:27017',(err,db)=>{
    if(err){
        console.log('error in connecting');
    }
    console.log('connected');
    var dbo=db.db('mydb');
    //deleteone
    dbo.collection('users').deleteOne({unm:'sahil1'}).then((result)=>{
        console.log(result);
    });
    //deletemany
    dbo.collection('users').deleteMany({unm:'sahil1'}).then((result)=>{
        console.log(result);
    });
    //find one and delete
    dbo.collection('users').findOneAndDelete({unm:'sahil1'}).then((result)=>{
        console.log(result);
    });
    db.close();
});