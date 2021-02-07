import Appointment from '../models/Appointments'
import {isEqual } from 'date-fns'

class AppointmentRepository {
    private appointments: Appointment[];

    constructor(){
        this.appointments = [];
    }

    public all(): Appointment[]{
        return this.appointments
    }

    public create(provider:string, date:Date): Appointment{
        const appointment = new Appointment(provider, date)

        this.appointments.push(appointment)

        return appointment;
    }

    public findByDate(date:Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => { return isEqual(date, appointment.date) })
        return findAppointment || null;
    }
}

export default AppointmentRepository;
