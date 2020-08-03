import React from 'react'

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

interface TeacherItemProps {

}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/5250620?s=460&v=4" alt="Fernando Bizzotto" />
                <div>
                    <strong>Fernando Bizzotto</strong>
                    <span>Matemática</span>
                </div>
            </header>
            <p>
                Aspirante a programador profissional
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}


export default TeacherItem
