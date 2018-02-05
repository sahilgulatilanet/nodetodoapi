const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./../server1');
const {Todo}=require('./../models/Todo');

const todos=[{
    _id:new ObjectID(),
    text: 'first test todo new'
},{
    _id:new ObjectID(),
    text: '2nd test todo new'
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text="test todo test";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });
    it('should not create to do with invaild body',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            });
    });
});
describe('GET /todos',()=>{
    it('should get al todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('Get /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);

            })
            .end(done);
    });
    it('should return 404 if id not found',(done)=>{
        var hexid=new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexid}`)
            .expect(404)
            .end(done);
    });
    it('return 404 for non object',(done)=>{
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});
describe('Delete /todos/:id',()=>{
    it('should remove todo doc',(done)=>{
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);

            })
            .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(todos[0]._id.toHexString()).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch((e)=> done(e));
            });
    });
    it('should return 404 if id not found',(done)=>{
        var hexid=new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexid}`)
            .expect(404)
            .end(done);
    });
    it('return 404 for non object',(done)=>{
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});
describe('Patch /todos/:id',()=>{
    it('should update todo',(done)=>{
        var hexid=todos[0]._id.toHexString();
        var text='this should be new text';
        request(app)
            .patch(`/todos/${hexid}`)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                //expect(res.body.todo.completedAt).toBeA(Number);
            })
            .end(done);
    });
    it('should update todo',(done)=>{
        var hexid=todos[1]._id.toHexString();
        var text='this should be new text!!';
        request(app)
            .patch(`/todos/${hexid}`)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                //expect(res.body.todo.completedAt).toBeA(Number);
            })
            .end(done);
    });
});