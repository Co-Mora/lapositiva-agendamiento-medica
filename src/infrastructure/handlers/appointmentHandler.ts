import { APIGatewayProxyHandler } from 'aws-lambda';
import { CreateAppointmentUseCase } from '@/application/usecases/CreateAppointmentUseCase';
import { ListAppointmentsUseCase } from '@/application/usecases/ListAppointmentsUseCase';
import { DynamoDBAppointmentRepository } from '../adapters/DynamoDBAppointmentRepository';
import { SNSMessagePublisher } from '../adapters/SNSMessagePublisher';

const appointmentRepository = new DynamoDBAppointmentRepository();
const messagePublisher = new SNSMessagePublisher();
const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository,
  messagePublisher
);
const listAppointmentsUseCase = new ListAppointmentsUseCase(
  appointmentRepository
);

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'POST') {
    return handleCreateAppointment(event);
  } else if (event.httpMethod === 'GET') {
    return handleListAppointments(event);
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Unsupported method' }),
    };
  }
};

async function handleCreateAppointment(event: any) {
  const { insuredId, scheduleId, countryISO } = JSON.parse(event.body);

  try {
    const appointment = await createAppointmentUseCase.execute(
      insuredId,
      scheduleId,
      countryISO
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Cita request is being processed',
        appointmentId: appointment.appointmentId,
      }),
    };
  } catch (error) {
    console.error('Error creating cita:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating cita' }),
    };
  }
}

async function handleListAppointments(event: any) {
  const insuredId = event.queryStringParameters?.insuredId;

  if (!insuredId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing insuredId parameter' }),
    };
  }

  try {
    const appointments = await listAppointmentsUseCase.execute(insuredId);
    return {
      statusCode: 200,
      body: JSON.stringify(appointments),
    };
  } catch (error) {
    console.error('Error listing citas:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error listing citas' }),
    };
  }
}
