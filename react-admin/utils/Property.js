'use strict';

function ReadValue(obj, path, def) {
  for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
    if (!obj || typeof obj !== "object") {
      return def;
    }
    obj = obj[path[i]];
  }

  if (typeof obj === "undefined") {
    return def;
  }

  return obj;
}

function WriteValue(obj, path, value) {
  var paths = path.split(".");
  var property = paths.pop();

  for (var i = 0, len = paths.length; i < len; i++) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    obj = obj[paths[i]];
  }

  if (typeof obj === "undefined") {
    return;
  }

  obj[property] = value;
}


module.exports = {
    ReadValue: ReadValue,
    WriteValue: WriteValue
}