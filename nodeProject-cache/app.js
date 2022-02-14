// Importing express module
const express = require('express');
const nodeCache = require('node-cache');
const myCache = new nodeCache();
	
// Creating an express object
const app = express()
	
// Starting server using listen function on port 8000
app.listen(3000, err => {
if(err)
		console.log("Error while starting server")
else
		console.log("Server has been started at port 3000")
})

function heavyComputation(){
	let temp = 0;
	for(let i=0; i<100000; i++){
    	temp = (Math.random()*5342)%i;
    }
	return temp;
}

app.get('/api', (req, res)=>{

    if (myCache.has('uniqueKey')) {

        console.log('Cache Value');
        res.send("Resule: "+ myCache.get('uniqueKey'));        
    } else {
        
        let result = heavyComputation();

        myCache.set('uniqueKey', result)
        console.log('Calculate from function and set value in cache');
	    res.send("Result: "+result);
    }
	
})

