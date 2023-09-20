import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Navigate to Documentation - https://weary-gray-hosiery.cyclic.cloud/api/v1';
  }
}
