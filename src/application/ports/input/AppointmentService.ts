import { Appointment } from '@/domain/Appointment';

export interface AppointmentService {
  createAppointment(
    insuredId: string,
    scheduleId: number,
    countryISO: string
  ): Promise<Appointment>;
  listAppointments(insuredId: string): Promise<Appointment[]>;
}
