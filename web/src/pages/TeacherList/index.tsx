import React, { useState, FormEvent } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import './styles.css'
import api from '../../services/api'

function TeacherList() {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()
        try {
            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time,
                },
            })
            setTeachers(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
        console.log({ subject, week_day, time })
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            {
                                value: 'Educação Física',
                                label: 'Educação Física',
                            },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Física', label: 'Física' },
                            { value: 'História', label: 'História' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Química', label: 'Química' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <div id="search-teachers-button">
                        <Input
                            type="submit"
                            name="submit"
                            label=""
                            value="Pesquisar!"
                        />
                    </div>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher, index) => {
                    return <TeacherItem teacher={teacher} key={teacher.id} />
                })}
            </main>
        </div>
    )
}

export default TeacherList
