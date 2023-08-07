import { Module } from '@nestjs/common';
import { MessagingService } from './services/messaging.service';
import { MessagingController } from './controllers/messaging.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitmqConfig } from '../../config/amqp';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: rabbitmqConfig,
    }),
  ],
  controllers: [MessagingController],
  providers: [MessagingService],
  exports: [RabbitMQModule],
})
export class MessagingModule {}
