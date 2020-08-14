import React from 'react';
import ReactDOM from 'react-dom';
import style from './styles.css';
import moment from 'moment';

class CommentSection extends React.Component {
    constructor() {
        super();

        this.state = localStorage.getItem('state') === null ? 
        
        this.state = {
            comments: [],
            newName: '',
            newCommentText: ''
        } : this.state = { ...JSON.parse(localStorage.getItem('state')) };

    }

    addComment() {
        const comments = this.state.comments;
        const date = new Date;
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн',
                        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        comments.unshift({
            name: this.state.newName,
            date: `${date.getDate() + ' ' + months[date.getMonth()]
                 + ' ' + moment().locale('ru').format('LT')}`,
            text: this.state.newCommentText,
            id: this.state.comments.length ? this.state.comments.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 1,
        });

        this.setState({
            comments,
            newName: '',
            newCommentText: ''
        }, () =>
        localStorage.setItem('state', JSON.stringify(this.state)))
    }

    deleteComment(id){
        const newComments = this.state.comments.filter(comment => comment.id !== id);
        console.log(newComments);
        this.setState({comments: newComments}, () => localStorage.setItem('state', JSON.stringify(this.state)));
    }

    render() {
        const commentsShown = this.state.comments.length == 0 ? <p className={'no-comments'}>Комментариев пока нет...</p> :
        <ul className = {'comment-section'}> 
            {
                this.state.comments.map(comment => {
                    return (
                        <li key={comment.id} className={'comment'}>
                            <div className={'comment-header'}>
                                <span className={'comment-name'}>{comment.name}</span>
                                <span className={'comment-date'}>{comment.date}</span>
                            </div>
                            <div className={"comment-text"}>{comment.text}</div>
                            <button 
                                className={'remove-button'}
                                onClick={ev => {
                                    this.deleteComment(comment.id)
                                }}>
                                    Удалить</button>
                        </li>
                    )
                })
            }
        </ul>
        return(
            <>
                <div className="create-comment-container">
                    <label htmlFor={'first-name'}>Введите имя:</label>
                    <input 
                        type={'text'} 
                        value={this.state.newName}
                        className={'comment-inputs'}
                        id={'first-name'}
                        onChange={ev => {
                            this.setState({newName: ev.target.value})
                        }} /> 
                    <label htmlFor={'comment-text'}>Введите ваш комментарий:</label>
                    <textarea 
                        rows={5} 
                        value={this.state.newCommentText}
                        className={'comment-inputs'} 
                        id={'comment-text'}
                        onChange={ev => {
                            this.setState({newCommentText: ev.target.value})
                        }}></textarea>
                    <button 
                        className={'submit-button'}
                        onClick={ev => {
                            if (this.state.newName !== '' && this.state.newCommentText !== '') {
                                this.addComment();
                            }
                            else {
                                alert('Чего-то не хватает. Проверьте, все ли поля заполнены!')
                            }
                            
                        }}>
                            Отправить
                    </button>
                </div>
                <>{commentsShown}</>
            </>
        );
    }
}

ReactDOM.render(
    <CommentSection />,
    document.querySelector('.container')
);
