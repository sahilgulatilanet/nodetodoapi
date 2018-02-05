const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password="123abc";

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    });
});
var hp="$2a$10$mIYnRGbJrgf6z6G2ZNvWnu1/xYeTyF3DPTZnv/BYLeXjW/RkUZ9Sy";
bcrypt.compare(password,hp,(err,res)=>{
    console.log(res);
});
/*var data={
    id:5
}

var token=jwt.sign(data,'abc123');
console.log(token);

var decode=jwt.verify(token,'abc123');
console.log(decode);

if(decode.id===data.id){
    console.log("vertified");
}
else{
    console.log("not verified");
}
/*var msg='sahil gulati';
var hash=SHA256(msg).toString();

console.log(`MSG: ${msg}`);
console.log(`Hash: ${hash}`);

var data={
    id:4
};
var token={
    data,
    hash:SHA256(JSON.stringify(data)+'somesecret').toString()
}

//token.data.id=5;
//token.hash=SHA256(JSON.stringify(token.data)).toString();

var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();
if(resultHash===token.hash){
    console.log('Data not Changed');
}
else
{
    console.log('Data is changed');
}*/