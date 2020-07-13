import React from "react";

type INewsProps = {
  commentsList: any[];
}

export const CommentsList: React.FC<INewsProps> = ({ commentsList }) => {
  return (
    <div onClick={e => e.stopPropagation()} className="comment-wrapper">
      <div className="comment-inner">

      </div>
      {commentsList.map((comment, index) =>
        <p className="comment-inner" key={index}>
          {comment.text}
        </p>
      )}
    </div>
  );
}

