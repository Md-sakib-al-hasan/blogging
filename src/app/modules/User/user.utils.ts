import jwt from 'jsonwebtoken';
type Tjewtpayload = {
  useremail: string;
  role: string;
};

//create jwt token

export const createToken = (
  jwtPayload: Tjewtpayload,
  select: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, select, { expiresIn });
};
