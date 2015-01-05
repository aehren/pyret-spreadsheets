define(["gdrive-credentials", "q"], function(creds, Q) {
  var currentAccessToken;
  function refreshAccess() {
    var newToken = $.ajax("/getAccessToken", { method: "get", datatype: "json" });
    newToken.then(function(t) {
      currentAccessToken = t.access_token;
      window.currentAccessToken = t.access_token;
    });
    return Q(newToken);
  }
  function makeApi(runtime) {
    var credentials = creds.getCredentials();
    return {
      postSheets: function(url, body) {
        refreshAccess().then(function(_) {
          var sheets = $.ajax("/googleProxy?" + encodeURIComponent(url), {
            method: "post",
            dataType: "xml",
            headers: {"Authorization": "Bearer " + currentAccessToken},
            contentType: "application/atom+xml",
            data: body
          });
          sheets.then(function(s) { console.log(s); });
          sheets.fail(function(s) { console.log(arguments); });
          return runtime.nothing;
        });
      },
      logSheets: function(url) {
        refreshAccess().then(function(_) {
          var sheets = $.ajax("/googleProxy?" + encodeURIComponent(url), {
            method: "get",
            dataType: "xml",
            headers: {"Authorization": "Bearer " + currentAccessToken}
          });
          sheets.then(function(s) { console.log(s); });
          sheets.fail(function(s) { console.log(arguments); });
          return sheets;
        });
      }
    };
  }
  return {
    makeApi: makeApi
  };
});

