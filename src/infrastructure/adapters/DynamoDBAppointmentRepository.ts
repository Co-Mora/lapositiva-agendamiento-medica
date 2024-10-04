import { DynamoDB } from 'aws-sdk';
import { Appointment } from '@/domain/Appointment';
import { AppointmentRepository } from '@/application/ports/output/AppointmentRepository';
import { AppointmentStatus } from '@/domain/AppointmentStatus';

export class DynamoDBAppointmentRepository implements AppointmentRepository {
  private dynamodb: DynamoDB.DocumentClient;

  constructor() {
    this.dynamodb = new DynamoDB.DocumentClient();
  }

  async save(appointment: Appointment): Promise<void> {
    await this.dynamodb
      .put({
        TableName: process.env.DYNAMODB_TABLE!,
        Item: {
          appointmentId: appointment.appointmentId,
          insuredId: appointment.insuredId,
          scheduleId: appointment.scheduleId,
          countryISO: appointment.countryISO,
          status: appointment.status,
          createdAt: appointment.createdAt.toISOString(),
        },
      })
      .promise();
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const result = await this.dynamodb
      .query({
        TableName: process.env.DYNAMODB_TABLE!,
        KeyConditionExpression: 'insuredId = :insuredId',
        ExpressionAttributeValues: {
          ':insuredId': insuredId,
        },
      })
      .promise();

    return (
      result.Items?.map(
        (item) =>
          new Appointment(
            item.appointmentId,
            item.insuredId,
            item.scheduleId,
            item.countryISO,
            item.status as AppointmentStatus,
            new Date(item.createdAt)
          )
      ) || []
    );
  }

  async updateStatus(appointmentId: string, status: string): Promise<void> {
    await this.dynamodb
      .update({
        TableName: process.env.DYNAMODB_TABLE!,
        Key: { appointmentId },
        UpdateExpression: 'set #status = :status',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':status': status },
      })
      .promise();
  }
}
