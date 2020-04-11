const routersMiddleware = (msg, req, res, next) => {
  console.log(`${req.method} ${msg} reqParams: `, req.params);
  console.log(`${req.method} ${msg} reqBody: `, req.body);
  next();
};
module.exports = routersMiddleware;
