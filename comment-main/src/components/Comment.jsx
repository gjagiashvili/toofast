import { useState } from 'react';

const Comment = ({ item, replyHandler, data, replyIndex, itemIndex, onDelete, comments}) => {
  const isYou = data?.currentUser?.username === item.user.username || item.isCurrentUser;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comment, setComment] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [score, setScore] = useState(item.score);
  const [changeCount, setChangeCount] = useState(0);

  const increaseScore = () => {
    if (changeCount === 0) {
      setScore(score + 1);
      setChangeCount(1);
    }
  };




  const decreaseScore = () => {
    if (changeCount === 1) {
      setScore(score - 1);
      setChangeCount(0);
    }
  };


  const commentEditHandler = (event, index) => {
    const newComment = [...comment];
    newComment[index].content = event.target.value;
    setComment(newComment);
  };

  
  
  const editCommentHandler = (index) => {
    setEditIndex(index);
  };

  const deleteCommentHandler = (commentId) => {
    const updatedComments = comment.filter((comment) => comment.id !== commentId);
    setComment(updatedComments);
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <div className="rating-side">
        <button onClick={increaseScore}>
          <img src="/images/icon-plus.svg" alt="" />
        </button>
        <button>
          <p>{score}</p>
        </button>
        <button onClick={decreaseScore}>
          <img src="/images/icon-minus.svg" alt="" />
        </button>
      </div>
      <div className="text-side">
        <div className="header">
          <div className="header-title">
            <img src={item.user.image.png} alt="" />
            {isYou && <div className="you">you</div>}
            <p>{item.user.username}</p>
            <p className="postedAt">{item.createdAt}</p>
          </div>
          {!isYou ? (
            <div
              className="reply-box"
              onClick={() => replyHandler(item.id - 1)}
            >
              <img src="/images/icon-reply.svg" alt="" />
              <p>Reply</p>
            </div>
          ) : (
            <div className="config-box">
              <button className="delete" onClick={() => setShowDeleteModal(true)}> 
                <div className="delete">
                  <img src="/images/icon-delete.svg" alt="" />
                  <p>delete</p>
                </div>
              </button>
              <button className='edit' onClick={() => editCommentHandler(itemIndex)}>
                <div className="edit">
                  <img src="/images/icon-edit.svg" alt="" />
                  <p>edit</p>
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="footer">
        {editIndex === itemIndex ? (
  <input
    type='text'
    value={item.content}
    onChange={(e) => commentEditHandler(e, itemIndex)} // Change 'index' to 'itemIndex'
    onBlur={() => setEditIndex(null)} 
  />
) : (
  <p>{item.content}</p>
)}


        </div>
      </div>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="modal-title"><b>Delete Comment</b></h2>
            <p> Are you sure you would like to delete this comment? This will remove the comment and can't be undone.   </p>
            <div className="modal-buttons">
              <button className="modal-button  undo" onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </button>
              <button className="modal-button do" onClick={() => deleteCommentHandler(item.id)}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
