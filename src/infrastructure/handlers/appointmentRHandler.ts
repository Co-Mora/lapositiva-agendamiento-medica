import { SQSHandler } from 'aws-lambda';
import { RDSDataService, EventBridge } from 'aws-sdk';
import config from '@/config/config';

const rdsData = new RDSDataService();
const eventBridge = new EventBridge();

export const handler: SQSHandler = async (event) => {
  for (const record of event.Records) {
    const appointment = JSON.parse(record.body);

    try {
      const rdsParams = {
        resourceArn: config.rds.resourceArn,
        secretArn: config.rds.secretArn,
        database:
          appointment.countryISO === 'PE'
            ? config.rds.databasePE
            : config.rds.databaseCL,
        sql: `
          INSERT INTO appointments (appointment_id, insured_id, schedule_id, country_iso, status, created_at)
          VALUES (:appointmentId, :insuredId, :scheduleId, :countryISO, :status, :createdAt)
        `,
        parameters: [
          {
            name: 'appointmentId',
            value: { stringValue: appointment.appointmentId },
          },
          { name: 'insuredId', value: { stringValue: appointment.insuredId } },
          { name: 'scheduleId', value: { longValue: appointment.scheduleId } },
          {
            name: 'countryISO',
            value: { stringValue: appointment.countryISO },
          },
          { name: 'status', value: { stringValue: 'pending' } },
          {
            name: 'createdAt',
            value: { stringValue: new Date().toISOString() },
          },
        ],
      };

      await rdsData.executeStatement(rdsParams).promise();
      console.log(
        `cita agregado a ${appointment.countryISO} database: ${appointment.appointmentId}`
      );

      const eventBridgeParams = {
        Entries: [
          {
            Source: 'medico.cita.sistema',
            DetailType: 'AppointmentCreated',
            Detail: JSON.stringify(appointment),
            EventBusName: config.eventBridge.eventBusName,
          },
        ],
      };

      const result = await eventBridge.putEvents(eventBridgeParams).promise();
      console.log(
        `Evento publicado a EventBridge: ${result.Entries?.[0].EventId}`
      );
    } catch (error) {
      console.error(
        `Error está procesando cita ${appointment.appointmentId}:`,
        error
      );
    }
  }
};
