import React from 'react';
import ReactDOM from 'react-dom';
import style from './styles.css';
import moment from 'moment';
import Comment from './comment.js';
import Form from "./form.js";

class CommentSection extends React.Component {
    constructor() {
        super();

        this.state = localStorage.getItem('state') === null ? 
        
        this.state = {
            comments: [],
            form: {
                name: '',
                comment: '',
            }      
        } : this.state = { ...JSON.parse(localStorage.getItem('state')) };
    }

    addComment() {
        const comments = this.state.comments;
        const date = new Date;
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн',
                        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        comments.unshift({
            name: this.state.form.name,
            date: `${date.getDate() + ' ' + months[date.getMonth()]
                 + ' ' + moment().locale('ru').format('LT')}`,
            text: this.state.form.comment,
            id: this.state.comments.length ? this.state.comments.reduce((p, c) => p.id > c.id ? p : c).id + 1 : 1,
        });

        this.setState({
            comments,
            form: {
                name: '',
                comment: ''}
        }, () =>
        localStorage.setItem('state', JSON.stringify(this.state)))
    }


    deleteComment(id){
        const newComments = this.state.comments.filter(comment => comment.id !== id);
        this.setState({comments: newComments}, () => localStorage.setItem('state', JSON.stringify(this.state)));
    }

    handleChange(e){
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }
        
    render() {
        const commentsShown = this.state.comments.length == 0 ? <p className={'no-comments'}>Комментариев пока нет...</p> :
        <ul className = {'comment-section'}> 
            {
                this.state.comments.map(comment => {
                    return (
                        <Comment 
                            key = {comment.id}
                            name ={comment.name}
                            text = {comment.text}
                            date = {comment.date}
                            deleteComment = {this.deleteComment.bind(this, comment.id)}
                        />
                    )
                })
            }
        </ul>
        return(
            <>
                < Form 
                    form = {this.state.form}
                    name = {this.state.form.name}
                    comment = {this.state.form.comment}
                    handleChange = {this.handleChange.bind(this)}
                    addComment = {this.addComment.bind(this)}
                />
                <>{commentsShown}</>
            </>
        );
    }
}

ReactDOM.render(
    <CommentSection />,
    document.querySelector('.container')
);
