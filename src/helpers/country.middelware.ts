import { Injectable, NestMiddleware } from '@nestjs/common';
import * as geoip from 'geoip-lite';

@Injectable()
export class CountryMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const ip = this.getClientIP(req); // Извлекаем IP-адрес из запроса
    console.log('ip', ip);
    const geo = geoip.lookup(ip); // Получаем географическую информацию на основе IP-адреса

    // console.log('geo', geo);

    if (geo) {
      req.country = geo.country; // country code ISO-3166-1 exmpl("UA")
    } else {
      req.country = null;
    }

    next();
  }

  private getClientIP(req: any): string {
    const forwarded = req.headers['x-forwarded-for'];
    return (
      (forwarded ? forwarded.split(/, /)[0] : null) ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.ip ||
      '123'
    );
  }
}
