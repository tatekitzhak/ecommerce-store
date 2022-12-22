var mongoose = require('mongoose')

module.exports = {
  // Set the debug option: all executed methods log output to console
  async mongoose_debug(req, res, next) {
    /**  Option 1:
     mongoose.set('debug', true);
     */

    // Option 2:
    await mongoose.set("debug", (collectionName, method, query, doc) => {
      console.log(`*###${collectionName}.${method}`, JSON.stringify(query), doc);
      /** OR:
        logger(`${collectionName}.${method}`, JSON.stringify(query), doc);
       */
    });

    next()
  }
}