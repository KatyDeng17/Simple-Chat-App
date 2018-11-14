var request = require('request')


describe("get message", () => {
  it("should multiply 200 ok", (done) => {
    request.get('http://localhost:3000/messages',(err, res)=>{
       console.log(res.body)
       expect(res.statusCode).toEqual(200)
       done()
    })
  });
  it("should multiply a list, that is not empty", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      console.log(res.body);
      expect(JSON.parse(res.body).length).toBeGreaterThan(0)
      done();
    });
  });

});

describe('get message from user',()=>{
  it("should multiply 200 ok", (done) => {
    request.get("http://localhost:3000/messages/katy", (err, res) => {
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it('name should be katy', (done)=>{
    request.get("http://localhost:3000/messages/katy", (err,res)=>{
      expect(JSON.parse(res.body)[0].name).toEqual('katy');
      done()
    });
  })
} )