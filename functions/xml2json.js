exports = async function(arg){
  const xml2js = require("xml2js");
  let data = arg.body;  
  console.log(data);
  
  let xmlData = data; // atob(data);

  // Try to catch here empty bodies. It's not easy since when a body is really empty,
  // the "body" obj gets the query parameters attached (example: undefinedreset=false)
  if (xmlData && xmlData.indexOf('<') > -1) {
    xmlData = xmlData.replace("\uFEFF", "");
    xmlData = xmlData.replace("undefined<", "<");

    var options = {
      attrkey: "",
      trim: true,
      normalize: true,
      mergeAttrs: true,
      explicitArray: false  //TODO: remove this in api v2 and use proper xml schemas
    };

    try {
      return await xml2js.parseStringPromise(xmlData, options)
    }
    catch (e) {
      console.error(e);
    }
  } else {
    return null;
  }
}
  