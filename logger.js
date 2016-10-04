
/**
 * Created by rajnishkumar on 03/10/16.
 */

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
    createLog:function (directory,type,message) {

        var date = new Date();
        var filepath='/'+directory + '/'+date.yyyymmdd()+'.txt';

        this.dirExist(directory).then(function (data) {
            fs.exists(filepath, function(exists){
                fs.appendFile(appDir +filepath,type+' : '+message+ ', Time : '+Date.now()+';\n', { flags: 'a+' },function(err) {
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
    }
};

module.exports=logger;


