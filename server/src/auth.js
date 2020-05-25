const { sign } = require("jsonwebtoken");

module.exports = {
  createAccessToken(user) {
    return sign(
      { user_id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECERT,
      {
        expiresIn: "15m",
      }
    );
  },
};
// export const createRefreshToken = (user) => {
//   return sign(
//     { userId: user.id, tokenVersion: user.tokenVersion },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: "7d"
//     }
//   );
// };
