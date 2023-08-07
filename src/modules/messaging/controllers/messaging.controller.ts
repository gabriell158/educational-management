import { Controller } from '@nestjs/common';
import { MessagingService } from '../services/messaging.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @RabbitSubscribe({
    exchange: 'notify',
    routingKey: '#.push.#',
    queue: 'push.queue',
  })
  consumePushQueue(msg) {
    return this.messagingService.consumePushQueue(msg);
  }

  @RabbitSubscribe({
    exchange: 'notify',
    routingKey: '#.email.#',
    queue: 'email.queue',
  })
  consumeEmailQueue(msg) {
    return this.messagingService.consumeEmailQueue(msg);
  }
}
