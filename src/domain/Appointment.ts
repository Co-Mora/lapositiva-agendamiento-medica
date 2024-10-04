import { AppointmentStatus } from './AppointmentStatus';

export class Appointment {
  constructor(
    public readonly appointmentId: string,
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: string,
    public status: AppointmentStatus,
    public readonly createdAt: Date
  ) {}

  complete(): void {
    this.status = AppointmentStatus.COMPLETED;
  }

  cancel(): void {
    this.status = AppointmentStatus.CANCELLED;
  }
}
