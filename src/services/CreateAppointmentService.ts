import Appointment from '../models/Appointments'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository;
    constructor(appointmentsRepository: AppointmentRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw new Error("This appoinment is already booked");
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        return appointment;
    }
}

export default CreateAppointmentService;
