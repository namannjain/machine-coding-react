import React, { useState } from 'react';
import commentsData from '../data/comments';
import Comment from './Comment';

const CommentSection = () => {
  const [comments, setComments] = useState(commentsData);

  const getUpdatedComments = (comments, targetId, reply) => {
    const commentsDeepCopy = JSON.parse(JSON.stringify(comments));
  
    for (const comment of commentsDeepCopy) {
      if (comment.id === targetId) {
        comment.subComments.push({
          id: new Date().getTime(),
          comment: reply,
          subComments: [],
        });
      }
  
      if (comment.subComments.length > 0) {
        comment.subComments = getUpdatedComments(
          comment.subComments,
          targetId,
          reply
        );
      }
    }
  
    return commentsDeepCopy;
  };

  const addNewReply = (commentId, reply) => {
    setComments(getUpdatedComments(comments, commentId, reply));
  }

  return (
    <>
      <Comment comments={comments} addNewReply={addNewReply} />
    </>
  )
}

export default CommentSection