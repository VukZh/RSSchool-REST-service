const routersMiddleware = (msg, req, res, next) => {
  console.log(
    `${req.method} ${msg} reqParams: ${JSON.stringify(
      req.params
    )} reqBody: ${JSON.stringify(req.body)}`
  );
  // console.log(`${req.method} ${msg} reqBody: ${JSON.stringify(req.body)}`);
  next();
};
module.exports = routersMiddleware;
