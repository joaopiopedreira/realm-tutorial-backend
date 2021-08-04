// This function is the webhook's request handler.
exports = async function(payload, response) {
    
    const Tasks = context.services.get("mongodb-atlas").db("tracker").collection("Task");
    //const doc = await Tasks.findOne();
    //console.log(doc);
    

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    //const {arg1, arg2} = payload.query;

    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = payload.headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const body = payload.body;

    console.log("arg1, arg2: ", arg1, arg2);
    console.log("Content-Type:", JSON.stringify(contentTypes));
    console.log("Request body:", body);
    
    const jsonDoc = await context.functions.execute("xml2json", body);
    console.log(jsonDoc);

    return  "Hello World!";
};