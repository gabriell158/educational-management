import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

export function rabbitmqConfig(configService: ConfigService): RabbitMQConfig {
  const user = configService.get('RABBITMQ_USER');
  const password = configService.get('RABBITMQ_PASSWORD');
  const host = configService.get('RABBITMQ_HOST');
  return {
    exchanges: [
      {
        name: 'notify',
        type: 'topic',
      },
    ],
    uri: `amqp://${user}:${password}@${host}`,
    enableControllerDiscovery: true,
    channels: {},
  };
}
