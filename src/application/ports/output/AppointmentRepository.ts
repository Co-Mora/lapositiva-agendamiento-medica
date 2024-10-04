import { Appointment } from '@/domain/Appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  updateStatus(appointmentId: string, status: string): Promise<void>;
}
