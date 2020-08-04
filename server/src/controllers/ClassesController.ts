import { Request, Response } from "express";

import db from '../database/connections'
import convertHourToMinutes from '../utils/convertHourToMinutes'


interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

interface ListClassesFilters {
    subject: string,
    week_day: string,
    time: string
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters: any = request.query;
        
        const {subject, week_day, time}: ListClassesFilters = filters

        if (!subject || !week_day || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class-schedule.*')
                .from('class-schedule')
                .whereRaw('`class-schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class-schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class-schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class-schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        console.log(timeInMinutes)

        return response.json(classes)
    }
    
    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body
    
        const trx = await db.transaction()
    
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            })
        
            const user_id = insertedUsersIds[0]
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
        
            const class_id = insertedClassesIds[0]
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            }
            )
        
            await trx('class-schedule').insert(classSchedule)
            await trx.commit()
            return response.status(201).send()
    
        } catch(err) {
            console.log(err)
            trx.rollback()
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    
    
        
        
    }
}