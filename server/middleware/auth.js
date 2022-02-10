import jwt from "jsonwebtoken";

//user wants to like a post
//click the like button => auth middleware (NEXT) => like controller...

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    
    let decodedData;

    if(token && isCustomAuth) {
      //test is a secret that should be in process.env
      decodedData = jwt.verify(token, 'test');

      req.userId = decodedData?.indexOf;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error)
  }
}

export default auth;