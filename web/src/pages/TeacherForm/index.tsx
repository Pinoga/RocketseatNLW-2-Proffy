import React, { FormEvent, useState } from 'react'
import warningIcon from '../../assets/images/icons/warning.svg'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TextArea from '../../components/TextArea'
import './styles.css'

import trashIcon from '../../assets/images/icons/trash.svg'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

interface ScheduleItem {
    week_day: number
    from: string
    to: string
}

function TeacherForm() {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])
    const history = useHistory()

    const addScheduleHandler = () => {
        setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
    }
    const removeScheduleHandler = (position: number) => {
        setScheduleItems(scheduleItems.filter((_, index) => index !== position))
    }
    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        })
            .then(() => alert('Cadastro Realizado com sucesso'))
            .catch(() => alert('Erro no cadastro!'))
        history.push('/')
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems,
        })
    }

    const setScheduleItemValue = (
        index: number,
        field: string,
        value: string
    ) => {
        const updatedScheduleItems = [...scheduleItems]
        updatedScheduleItems[index] = {
            ...scheduleItems[index],
            [field]: value,
        }
        setScheduleItems(updatedScheduleItems)
        console.log(updatedScheduleItems[index])
    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você queira dar aulas!"
                description="O primeiro passo é preencher esse formulátio de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                {
                                    value: 'Biologia',
                                    label: 'Biologia',
                                },
                                {
                                    value: 'Ciências',
                                    label: 'Ciências',
                                },
                                {
                                    value: 'Educação Física',
                                    label: 'Educação Física',
                                },
                                {
                                    value: 'Matemática',
                                    label: 'Matemática',
                                },
                                { value: 'Física', label: 'Física' },
                                {
                                    value: 'História',
                                    label: 'História',
                                },
                                {
                                    value: 'Geografia',
                                    label: 'Geografia',
                                },
                                {
                                    value: 'Português',
                                    label: 'Português',
                                },
                                {
                                    value: 'Química',
                                    label: 'Química',
                                },
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addScheduleHandler}>
                                + Novo Horário
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => (
                            <div className="schedule-item" key={Math.random()}>
                                <Select
                                    name="week_day"
                                    label="Dia da Semana"
                                    value={scheduleItem.week_day}
                                    onChange={(e) =>
                                        setScheduleItemValue(
                                            index,
                                            'week_day',
                                            e.target.value
                                        )
                                    }
                                    options={[
                                        {
                                            value: '0',
                                            label: 'Domingo',
                                        },
                                        {
                                            value: '1',
                                            label: 'Segunda-feira',
                                        },
                                        {
                                            value: '2',
                                            label: 'Terça-feira',
                                        },
                                        {
                                            value: '3',
                                            label: 'Quarta-feira',
                                        },
                                        {
                                            value: '4',
                                            label: 'Quinta-feira',
                                        },
                                        {
                                            value: '5',
                                            label: 'Sexta-feira',
                                        },
                                        {
                                            value: '6',
                                            label: 'Sábado',
                                        },
                                    ]}
                                />
                                <Input
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={(e) =>
                                        setScheduleItemValue(
                                            index,
                                            'from',
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    name="to"
                                    label="Às"
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={(e) =>
                                        setScheduleItemValue(
                                            index,
                                            'to',
                                            e.target.value
                                        )
                                    }
                                />
                                <img
                                    className="remove-schedule-button"
                                    src={trashIcon}
                                    alt="Delete Item"
                                    onClick={(e) =>
                                        removeScheduleHandler(index)
                                    }
                                />
                            </div>
                        ))}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm
