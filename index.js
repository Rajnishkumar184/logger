
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
var logger={
    log:function (message,type,directory,file) {

        var date = new Date();

        if(!type){
            type='info';
        }
        if(!directory){
            directory='log';
        }
        if(!file){
            file=date.yyyymmdd();
        }
        var filepath='/'+directory + '/'+file+'.log';

        var logLineDetails = ((new Error().stack).split("at ")[2].trim());
        logLineDetails=logLineDetails.split(' ');
        var function_name='';
        if(logLineDetails[0]!='Object.<anonymous>'){
            function_name=logLineDetails[0];
        }
        var file_data=logLineDetails[1].substring(logLineDetails[1].lastIndexOf('/')+1,logLineDetails[1].length-1).split(':');
        var file_name=file_data[0];
        var line_number=file_data[1]+':'+file_data[2];

        this.dirExist(directory).then(function (data) {
            fs.exists(filepath, function(exists){
                message='Time : '+Date.now()+' | '+type+' => '+message+", "+file_name+" "+function_name+" "+line_number;
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
        if(!type){
            type='info';
        }
        var logLineDetails = ((new Error().stack).split("at ")[2].trim());
        logLineDetails=logLineDetails.split(' ');
        var function_name='';
        if(logLineDetails[0]!='Object.<anonymous>'){
            function_name=logLineDetails[0];
        }
        var file_data=logLineDetails[1].substring(logLineDetails[1].lastIndexOf('/')+1,logLineDetails[1].length-1).split(':');
        var file_name=file_data[0];
        var line_number=file_data[1]+':'+file_data[2];
        message='Time : '+Date.now()+' | '+type+' => '+message+", "+file_name+" "+function_name+" "+line_number;
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

