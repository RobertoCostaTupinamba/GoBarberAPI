import Appointment from '../models/Appointments'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate =  await appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw new Error("This appoinment is already booked");
        }

        //Cria a instancia
        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        //Salvar no banco
        await appointmentsRepository.save(appointment)

        return appointment;
    }
}

export default CreateAppointmentService;
