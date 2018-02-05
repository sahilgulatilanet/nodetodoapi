const MClient=require('mongodb').MongoClient;
MClient.connect('mongodb://localhost:27017/test',(err, db)=>{
    if(err)
    {
        return console.log('err in connecting');
    }
    var dbo=db.db("mydb");

    console.log('connected');
    var data={unm:"sahil1",age:25,location:'surat'};
    dbo.collection("users").insertOne(data,(err,result)=>{
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});