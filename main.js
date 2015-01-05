var baseUrl =  "https://cs.brown.edu/~joe/public/js-modules-all/";

requirejs.config({
  paths: {
    "drive-library": baseUrl
  }
});
requirejs.undef("@js-http/" + baseUrl + "main.js");
requirejs.undef("drive-library/a-library");
define(["js/runtime-util", "drive-library/a-library"], function(util, lib) {
  return function(runtime, namespace) {
    var api = lib.makeApi(runtime);
    return util.makeModuleReturn(runtime, {}, {
      "log-sheets": runtime.makeFunction(api.logSheets),
      "post-sheets": runtime.makeFunction(api.postSheets)
    });
  };
});
