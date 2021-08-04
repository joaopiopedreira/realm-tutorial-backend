exports = function(data){
    const xml2js = require("xml2js");
    let str = JSON.stringify(data);

    // Purge xml invalid characters (smileys, etc.)
    const NOT_SAFE_IN_XML_1_0 = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;
    str = str.replace(NOT_SAFE_IN_XML_1_0, '');


    const result = JSON.parse(str);

    const options = {
      headless: true,
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': false
      }
    };

    if (result) {
      const builder = new xml2js.Builder(options);
      const xml = (result.error || result.message) ? builder.buildObject(result) : builder.buildObject({documents: {document: result}});
      return xml.replace(/<[a-zA-Z]*\s?\/>/g, '');
    }

    return null;
}
  