
/**
 * Created by rajnishkumar on 03/10/16.
 */

var fs=require('fs');
var Promise=require('bluebird');
var path = require('path');
var colors = require('colors');
var appDir = path.dirname(require.main.filename);

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [this.getFullYear(), mm, dd].join('-');
};
colors.setTheme({
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack)
        {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});
Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[2].getLineNumber();
    }
});
Object.defineProperty(global, '__function', {
    get: function() {
        return __stack[2].getFunctionName();
    }
});
Object.defineProperty(global, '__file', {
    get: function(){
        return __stack[2].getFileName().split('/').slice(-1)[0];
    } });

var logger={
    log:function (message,obj) {
        var functionName='',fileName='',lineNum='';
        if(__function){
            functionName=__function;
        }
        if(__file){
            fileName=__file;
        }
        if(__line){
            lineNum=__line;
        }
        var date = new Date();
        var type='',directory='',file='';
        if(obj && obj.type){
            type=obj.type;
        }
        else{
            type='info';
        }
        if(obj && obj.directory){
            directory=obj.directory;
        }
        else{
            directory='log';
        }
        if(obj && obj.file){
            file=obj.file;
        }
        else{
            file=date.yyyymmdd();
        }
        var filepath='/'+directory + '/'+file+'.log';

        this.dirExist(directory).then(function (data) {
            fs.exists(filepath, function(exists){
                message='Time : '+Date.now()+' | '+type+' => '+message+", "+fileName+" "+functionName+" "+lineNum;
                fs.appendFile(appDir +filepath,message+'\n', { flags: 'a+' },function(err) {
                    if(err) {
                        //console.log(err);
                    }
                });
            });

        },function (err) {
            //console.log(err);
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
    },
    console:function(message,type){
        var functionName='',fileName='',lineNum='';
        if(__function){
            functionName=__function;
        }
        if(__file){
            fileName=__file;
        }
        if(__line){
            lineNum=__line;
        }
        if(!type){
            type='info';
        }
        message='Time : '+Date.now()+' | '+type+' => '+message+", "+fileName+" "+functionName+" "+lineNum;
        switch(type){
            case 'debug':
                console.log(message.debug);
                break;
            case 'warn':
                console.log(message.warn);
                break;
            case 'info':
                console.log(message.info);
                break;
            case 'error':
                console.log(message.error);
                break;
            default:
                console.log(message.info);
                break;
        }
    }
};

module.exports=logger;

