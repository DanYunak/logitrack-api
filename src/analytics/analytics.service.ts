import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostHog } from 'posthog-node';

@Injectable()
export class AnalyticsService implements OnModuleDestroy {
  private client: PostHog;
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('POSTHOG_API_KEY');
    
    if (!apiKey) {
      this.logger.warn('POSTHOG_API_KEY is not defined. Analytics will not be tracked.');
    }

    this.client = new PostHog(apiKey || 'dummy-key', {
      host: 'https://us.i.posthog.com',
      flushAt: 1,
      flushInterval: 10000,
    });
  }

  captureEvent(event: string, distinctId: string, properties?: Record<string, any>) {
    this.client.capture({
      distinctId,
      event,
      properties,
    });
  }

  async isFeatureEnabled(flagKey: string, distinctId: string): Promise<boolean | undefined> {
    return await this.client.isFeatureEnabled(flagKey, distinctId);
  }

  async onModuleDestroy() {
    this.logger.log('Shutting down PostHog client...');
    await this.client.shutdown();
  }
}