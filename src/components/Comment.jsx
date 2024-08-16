import React, { useState } from 'react';
import styles from '../styles/comments.module.css'

const CommentItem = ({ comment, addNewReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);

  const addComment = (e) => {
    const newComment = e.target.value;
    addNewReply(comment.id, newComment);
    setShowAddReply(false);
    setShowReplies(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      addComment(e);
    }
  }

  return (
    <div className={styles.commentContainer}>
      <div className={styles.details}>
        <div>{comment.comment}</div>
        <div className={styles.controls}>
          {comment.subComments.length > 0 && (
            <span onClick={() => setShowReplies(!showReplies)}>View Replies</span>
          )}
          <span onClick={() => setShowAddReply(!showAddReply)}>Add Reply</span>
        </div>
      </div>

      {showReplies && (
        <Comment comments={comment.subComments} addNewReply={addNewReply} />
      )}
      {showAddReply && (
        <input type="text" className={styles.replyBox} autoFocus onKeyDown={handleKeyDown} />
      )}
    </div>
  )
}

const Comment = ({ comments, addNewReply }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem comment={comment} addNewReply={addNewReply} key={comment.id} />
      ))}
    </>
  )
};

export default Comment;