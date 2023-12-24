import { useState } from 'react';

const Comment = ({ item, replyHandler, data, replyIndex, itemIndex, onDelete, onEditComplete}) => {
  const isYou = data?.currentUser?.username === item.user.username || item.isCurrentUser;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comment, setComment] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState(item.content); 
  const [score, setScore] = useState(item.score);
  const [changeCount, setChangeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

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
  const editCommentHandler = (index) => {
    setEditedText(item.content); // Set the edited text to the current comment content
    setIsEditing(true); // Enable edit mode
  };

  const commentEditHandler = (e) => {
    setEditedText(e.target.value); // Update edited text while typing
  };

  const handleEditComplete = () => {
    if (editedText.trim() !== '') {
      const updatedComments = [...data.comments];
      updatedComments[itemIndex].content = editedText; // Update the comment content

      onEditComplete(updatedComments); // Pass the updated comments back to the parent component
      setIsEditing(false); // Disable edit mode
    } else {
      setIsEditing(false); // Disable edit mode if edited text is empty
    }
  };

  
  const handleEditCancel = () => {
    setEditedText(item.content); // Reset edited text to original content
    setIsEditing(false); // Disable edit mode on cancel
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
        {isEditing ? (
          <input
            type="text"
            className='edit-input'
            value={editedText}
            onChange={commentEditHandler}
            onBlur={handleEditComplete}
            autoFocus // Optional: Autofocus the input field when in edit mode
          />
        ) : (
          <p>{item.content}</p>
        )}
        {isEditing && (
          <div>
            <button onClick={handleEditCancel}>Cancel</button>
            <button onClick={handleEditComplete}>Finish</button>
          </div>
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
              <button className="modal-button do" onClick={() => onDelete(replyIndex)}>
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


