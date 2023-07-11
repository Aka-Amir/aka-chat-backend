import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { IMicroserviceConfig } from '../interfaces/IMicroserviceConfig';

export function getMicroserviceConfig(
  configs: IMicroserviceConfig[],
): ClientsModuleOptions {
  return configs.map((config) => ({
    name: config.serviceToken,
    transport: Transport.RMQ,
    options: {
      urls: config?.urls || ['amqp://localhost:5672'],
      queue: config.queueName,
      queueOptions: {
        durable: false,
      },
    },
  }));
}
