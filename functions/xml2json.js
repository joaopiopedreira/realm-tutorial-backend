exports = async function(data){
  const xml2js = require("xml2js");
  
  try {  
    // Try to catch here empty bodies. It's not easy since when a body is really empty,
    // the "body" obj gets the query parameters attached (example: undefinedreset=false)
    if (data && data.indexOf('<') > -1) {
      data = data.replace("\uFEFF", "");
      data = data.replace("undefined<", "<");
  
      const options = {
        attrkey: "",
        trim: true,
        normalize: true,
        mergeAttrs: true,
        explicitArray: false  //TODO: remove this in api v2 and use proper xml schemas
      };
  
      const result = await xml2js.parseString(data, options);
      return result;
    } 

    return null;

  } catch(e) {
    console.error(JSON.stringify(e));
  }
}
  