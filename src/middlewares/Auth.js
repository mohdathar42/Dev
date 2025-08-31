export const adminAuth = (req, res, next) => {
  const token = "hi";
  const isAdminAuthorizes = token === "hi";
  if (!isAdminAuthorizes) {
    res.status(401).send("unauthorised user");
  } else {
    next();
  }
};

export const userAuth = (req, res, next) => {
  const token = "hi";
  const isUserAuthorizes = token === "hiww";
  if (!isUserAuthorizes) {
    res.status(401).send("unauthorised user");
  } else {
    next();
  }
};
