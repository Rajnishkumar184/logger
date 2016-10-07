logger.js
===================
Before using this you need to require this file that return logger object, through which we can access  functionality.

----------
```javascript
var logger=require('logger');
logger.log(message,type,directory,file);
logger.console(message,type);
````

```javascript
logger.log(message,type,directory,file);
```

this function requires three parameters :
1) message : is message that we want to write inside log file.
2) type : is type of message like - error, info, warn,debug.
3) directory : is name of directory inside which log file will create.
4) file: id the name of file inside which log message entry will take place.

type,directory,file are optional parameters.

default value for type is 'info'
default value for directory is 'log'
default value for file is current date

```javascript
logger.console(message,type);
```

this function requires two parameters :
1) message : is message that we want to write inside log file.
2) type : is type of message like - error, info, warn,debug.

type is optional, if we don't pass value for type then it's default value is 'info' .


