import { v4 as uuidv4 } from 'uuid';
import { Appointment } from '@/domain/Appointment';
import { AppointmentStatus } from '@/domain/AppointmentStatus';
import { AppointmentRepository } from '../ports/output/AppointmentRepository';
import { MessagePublisher } from '../ports/output/MessagePublisher';

export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private messagePublisher: MessagePublisher
  ) {}

  async execute(
    insuredId: string,
    scheduleId: number,
    countryISO: string
  ): Promise<Appointment> {
    const appointment = new Appointment(
      uuidv4(),
      insuredId,
      scheduleId,
      countryISO,
      AppointmentStatus.PENDING,
      new Date()
    );

    await this.appointmentRepository.save(appointment);

    await this.messagePublisher.publish(`cita-${countryISO.toLowerCase()}`, {
      appointmentId: appointment.appointmentId,
      insuredId: appointment.insuredId,
      scheduleId: appointment.scheduleId,
      countryISO: appointment.countryISO,
    });

    return appointment;
  }
}
