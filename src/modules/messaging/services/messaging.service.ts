import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
  ) {}

  async consumePushQueue(msg) {
    console.log(msg);
    // TODO: notify users by email WebSocket
  }

  async consumeEmailQueue(msg) {
    console.log(msg);
    // TODO: notify users by email SES
  }

  async notify(message, exchange = 'notify', routingKey = 'notify.push.email') {
    await this.amqpConnection.publish(exchange, routingKey, message);
  }
}
