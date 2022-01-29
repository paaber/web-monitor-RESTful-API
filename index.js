'use-strict';
/*
*primary file for the API
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//Server
const server = http.createServer((req,res)=>{

    let parsedUrl = url.parse(req.url,true);

    let path =  parsedUrl.pathname;

    let trimedPath = path.replace(/^\/+|\/+$/g,'');

    let queryStringObject = parsedUrl.query

    let method = req.method.toLowerCase();

    let headers = req.headers;

    let decoder =  new StringDecoder('utf-8');

    let buffer = '';

    req.on('data',(data)=>{
        buffer += decoder.write(data)
    });
    req.on('end',()=>{
        buffer += decoder.end();

        //   choose request handler

        let chosenHandler = typeof(router[trimedPath]) !== 'undefined' ? router[trimedPath] : handlers.notFound;
        
        //Construct the data Obj to be sent to the handler
        
        let data =  {
            'trimedPath' : trimedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        //Route request to handler specified in the router
         
        chosenHandler(data,(statusCode,payload)=>{
            //use  status code called back by the handelr, or default 200

            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            //use  payload called back by the handelr, or default to empty object

            payload = typeof(payload) === 'object' ? payload : {};

            let payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Returning response: ', statusCode,payload);
        });
       

       
    });

});

server.listen(3000,()=>{
    console.log('The server is listening on port 3000');
});


//define handlers
let handlers = {}

handlers.sample = (data,callback)=>{
    // callback http status code and  payload object

    callback(406,{'name':'sample handler'});
}

handlers.notFound = (data,callback)=>{

     callback(404);
}


// define request routers

let router = {
    'sample':handlers.sample
}

