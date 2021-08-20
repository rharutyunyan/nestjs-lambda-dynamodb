import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Endpoint for health check' })
  @ApiResponse({ status: 200, description: 'Health Check is ok' })
  @ApiResponse({ status: 503, description: 'Health Check failed' })
  async healthCheck(): Promise<any> {
    // todo: maybe use terminus in future for some check
    return 'alive';
  }
}
