function CommentItem({ comit }) {
  const avatar = comit.comment.trim().toUpperCase().split('').slice(0, 2);
  return (
    <div className="comment-item">
      <div className="comment-avatar">{avatar}</div>
      <p>{comit.comment}</p>
    </div>
  );
}

export default CommentItem;
