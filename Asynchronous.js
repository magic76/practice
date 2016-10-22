
// async function
var asyn = function(array, done){
  this.count = 0;
  for(i=0;i<array.length;i++){
    
  var callback = function(err, data){
    this.task = {};
    this.task['data_'+i] = data;
    this.task['err_'+i] = err;
    if(++this.count === array.length){
      done();
    }
  }
    array[i](callback);
  }
};

var fun = function(id, time){
  console.log(id + '. task with timeout' + time);
  setTimeout(function(){
    console.log('timeout' + time);
  },time);
};

var arr = [3000, 1000, 5000, 7000];
var tasklist = [];

tasklist = arr.map(function(item){
  return function(callback){
    var data = fun(i+1 ,item);
    callback(null, data);
  };
});

asyn(tasklist,function(){
  console.log('all task run over');
});
