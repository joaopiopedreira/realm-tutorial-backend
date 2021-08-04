// This function is the webhook's request handler.
exports = async function(payload, response) {
    // Data can be extracted from the request as follows:
    const Tasks = context.services.get("mongodb-atlas").db("tracker").collection("Task");
    const doc = await Tasks.findOne();
    console.log(doc);

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {arg1, arg2} = payload.query;

    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = payload.headers && payload.headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const body = payload.body;

    console.log("arg1, arg2: ", arg1, arg2);
    console.log("Content-Type:", JSON.stringify(contentTypes));
    console.log("Request body:", body);
    
    response.setStatusCode(200);
    response.setHeaders({"Content-Type:":"application/xml"});
    response.setBody(await context.functions.execute("json2xml", doc));
    //return  await context.functions.execute("json2xml", doc);
};