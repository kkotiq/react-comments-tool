import React from 'react';

const Form = (props) => {
    return (
        <form className="create-comment-container">
                    <label htmlFor={'first-name'}>Введите имя:</label>
                    <input 
                        type={'text'} 
                        value={props.form.name}
                        className={'comment-inputs'}
                        id={'first-name'}
                        name={'name'}
                        onChange={props.handleChange} /> 
                    <label htmlFor={'comment-text'}>Введите ваш комментарий:</label>
                    <textarea 
                        rows={5} 
                        value={props.form.comment}
                        name={'comment'}
                        className={'comment-inputs'} 
                        id={'comment-text'}
                        onChange={props.handleChange}></textarea>
                    <button 
                        className={'submit-button'}
                        onClick={e => {
                            e.preventDefault();
                            if (props.form.name !== '' && props.form.comment !== '') {
                                props.addComment();
                            }
                            else {
                                alert('Чего-то не хватает. Проверьте, все ли поля заполнены!')
                            }
                            
                        }}>
                            Отправить
                    </button>
                </form>
    )
}

export default Form;