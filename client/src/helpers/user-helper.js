const maskIds = (id) => {
  const strLen = id?.length;
  if (strLen > 4) {
    return (
      id.substr(0, 3) +
      id.substr(3, strLen - 18).replace(/\w/g, "*") +
      id.substr(strLen - 3, strLen)
    );
  }
};

export default maskIds;
