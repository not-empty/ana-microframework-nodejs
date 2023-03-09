import * as jwt from 'jose';

class Jwt {
  constructor() {
    this.expire = 60 * 15;
    this.timeToRegenerate = 5;
    this.jwtSecret = new TextEncoder().encode(process.env.JWT_APP_SECRET);
    this.validUntil = new Date();
  }

  async getToken(context) {
    const alg = 'HS256';

    this.validUntil.setSeconds(this.validUntil.getSeconds() + this.expire);

    return await new jwt.SignJWT(
      {
        iat: Math.round(new Date().getTime() / 1000),
        exp: Math.round(this.validUntil.getTime() / 1000),
      })
      .setProtectedHeader({ alg })
      .setAudience(context)
      .sign(this.jwtSecret);
  }

  async verifyToken(token, context) {
    token = token.replace('Bearer ', '');

    try {
      const data = await jwt.jwtVerify(token, this.jwtSecret, {
        audience: context
      });

      if (data.payload.aud !== context) {
        return false;
      }

      const diffTime = this.diffMinutes(data.payload.exp);
      if (diffTime <= this.timeToRegenerate) {
        token = await this.getToken(context);
      }
    } catch (err) {
      return false;
    }

    return token;
  }

  diffMinutes(expire) {
    const diff = (expire - Date.now()) / 1000;
    return Math.abs(Math.round(diff / 60));
  }

  getDateLocaleString() {
    return this.validUntil.toLocaleString('pt-BR');
  }
}

export default Jwt;
