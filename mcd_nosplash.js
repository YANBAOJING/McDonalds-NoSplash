// McDonalds NoSplash for Loon (.lpx)
// Only modifies obj.data.list to an empty array. If JSON parse fails or list not present, returns original body.

(function() {
  const body = $response && $response.body;
  if (!body) {
    $done({});
    return;
  }
  let obj;
  try {
    obj = JSON.parse(body);
  } catch (e) {
    // JSON parse failed, return original response unmodified
    $done({body});
    return;
  }
  if (obj && obj.data && Object.prototype.hasOwnProperty.call(obj.data, 'list')) {
    try {
      obj.data.list = [];
      $done({body: JSON.stringify(obj)});
    } catch (e) {
      // On any error, return original
      $done({body});
    }
  } else {
    // list field not present; do not modify
    $done({body});
  }
})();
