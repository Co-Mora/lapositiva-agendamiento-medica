import { Appointment } from '@/domain/Appointment';
import { AppointmentRepository } from '../ports/output/AppointmentRepository';

export class ListAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(insuredId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findByInsuredId(insuredId);
  }
}
