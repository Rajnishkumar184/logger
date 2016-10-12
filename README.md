nodedebug
===================
Before using this you need to require this file that return logger object, through which we can access functionality.

----------
To install module:
```
npm install nodedebug
```
---
```javascript
create a file like server.js and write this code inside file and run the command "node server.js" on terminal.

var debug=require('nodedebug');
debug.log(message,{type:"message_type",directory:"directory_name",file:"file_name"});
debug.console(message,type);

```
For Example:

Type 1:
-------
```javascript
var debug=require('nodedebug');
debug.log("hello",{type:"error",directory:"xyz",file:"abc"}); // this will create a file with current date inside log folder.
debug.console("hello","error"); // this will simply print message with colorful text.

output :
Time : 1475841050465 | error => hello, server.js  3

```
Type 2:
---------
```javascript
var debug=require('nodedebug');
function message(){
debug.log("hello",{type:"error",directory:"xyz",file:"abc"}); // this will create a file with current date inside log folder.
debug.console("hello","error"); // this will simply print message with colorful text.
}
message();

output :
Time : 1475841050465 | error => hello, server.js message 4

````

```javascript
debug.log(message,{type:"message_type",directory:"directory_name",file:"file_name"});
```

this function requires two parameters :
1) message : is message that we want to write inside log file.
2) object : is an optional parameter which has three key type,directory,file.
    type : is type of message like - error, info, warn,debug.
    directory : is name of directory inside which log file will create.
    file: id the name of file inside which log message entry will take place.

type,directory,file are optional parameters.

default value for type is 'info'
default value for directory is 'log'
default value for file is current date

```javascript
debug.console(message,type);
```

this function requires two parameters :
1) message : is message that we want to write inside log file.
2) type : is type of message like - error, info, warn,debug.

type is optional, if we don't pass value for type then it's default value is 'info' .


