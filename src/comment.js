import React from 'react';

const Comment = (props) => {
    return (
        <li key={props.id} className={'comment'}>
            <div className={'comment-header'}>
                <span className={'comment-name'}>{props.name}</span>
                <span className={'comment-date'}>{props.date}</span>
            </div>
            <div className={"comment-text"}>{props.text}</div>
            <button 
                className={'remove-button'}
                onClick={props.deleteComment}>
            Удалить</button>
        </li>
    )
}

export default Comment;