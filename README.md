logger.js
===================
Before using this you need to require this file that return logger object, through which we can access  functionality.

----------
```javascript
var log=require('logger');
log.createLog("user","info","hello message");
````
createLog(module_name, message_type, message_text);

this function requires three parameters :
1) module_name : is name of module inside which log message entry will take place.
2) message_type : is type of message like - error, info, warn.
3) message_text : is message that we want to write inside log file.

Code for logger.js
=======

  
```javascript
var fs=require('fs');
var Promise=require('bluebird');
var path=require('path');
var appDir = path.dirname(require.main.filename);

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [this.getFullYear(), mm, dd].join('-');
};


var logger={
    createLog:function (module,type,message) {
       var date = new Date();
        var filepath='/'+module + '/'+date.yyyymmdd()+'.txt';
        this.dirExist(module).then(function (data) {
            fs.exists(filepath, function(exists){
                message='Time : '+Date.now()+' | '+type+' => '+message;
                fs.appendFile(appDir +filepath,message+'\n', { flags: 'a+' },function(err) {
                    if(err) {
                        //console.log(err);
                    }
                });
            });
      },function (err) {
            console.log(err);
        });
    },
    dirExist:function(directory) {
        return new Promise(function(resolve, reject) {
            fs.stat(appDir + '/' + directory, function (err, stats) {
                if (err) {
                    fs.mkdir(appDir + '/' + directory, function (error) {
                        if (error) {
                            reject(false);
                        }
                        else{
                            resolve(true);
                        }
                    });
                } else {
                    resolve(true);
                }
            });
        });
    }
};
module.exports=logger;
```