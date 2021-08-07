using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace pivotalHeroku.Utils
{
    public class Jwt
    {
        private string secureKey = "SomeSecurekeyForJwtAuthentication";
        public string GetJwtByUserId(int userId)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var jwtHeader = new JwtHeader(credentials);
            var jwtPayload = new JwtPayload(userId.ToString(), null, null, null, DateTime.Now.AddDays(1));
            var securityToken = new JwtSecurityToken(jwtHeader, jwtPayload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public int GetUserIdByJwt(string jwt)
        {
            if (string.IsNullOrEmpty(jwt))
            {
                return 0;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var bytes = Encoding.ASCII.GetBytes(secureKey);
            var tokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(bytes),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            };
            tokenHandler.ValidateToken(jwt, tokenValidationParameters, out SecurityToken validateToken);
            string userId = ((JwtSecurityToken)validateToken).Issuer;
            return int.Parse(userId);
        }
    }
}