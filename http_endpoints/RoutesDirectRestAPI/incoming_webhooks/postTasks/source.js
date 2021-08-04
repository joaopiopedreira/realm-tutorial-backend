// This function is the webhook's request handler.
exports = async function(payload, response) {
    
    const Tasks = context.services.get("mongodb-atlas").db("tracker").collection("Task");
    

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    //const {arg1, arg2} = payload.query;

    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = payload.headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const body = payload.body.text();

    console.log("Request body:", body);
    const jsonBody = {body: body};
    console.log("jsonBody:", jsonBody);

    const jsonDoc = await context.functions.execute("xml2json", jsonBody);
    console.log(JSON.strgify(jsonDoc));

    await Tasks.insertOne(jsonDoc && jsonDoc.documents);

    return 'task inserted';
};