export interface MessagePublisher {
  publish(topic: string, message: any): Promise<void>;
}
