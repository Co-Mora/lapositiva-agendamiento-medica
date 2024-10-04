import { SNS } from 'aws-sdk';
import { MessagePublisher } from '@/application/ports/output/MessagePublisher';

export class SNSMessagePublisher implements MessagePublisher {
  private sns: SNS;

  constructor() {
    this.sns = new SNS();
  }

  async publish(topic: string, message: any): Promise<void> {
    const topicArn =
      topic === 'cita-pe' ? process.env.SNS_TOPIC_PE : process.env.SNS_TOPIC_CL;
    await this.sns
      .publish({
        TopicArn: topicArn,
        Message: JSON.stringify(message),
      })
      .promise();
  }
}
