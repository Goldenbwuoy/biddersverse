const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;

      default:
        message = "Something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i,
      match = err.message.match(regex),
      indexName = match[1] || match[2];

    output = indexName + " already exists";
  } catch (ex) {
    output = "unique field already exists";
  }
  return output;
};

module.exports = { getErrorMessage };
