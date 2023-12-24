const Reply = (props) => {

  return(
    <div className="reply-container">
      <img src="/images/avatars/image-juliusomo.png" alt="" />
      <input value={props.inputValue} onChange={(e)=>props.setInputValue(e.target.value)} type="text" placeholder="Add a comment..." />
      {props.buttonTxt === 'send' && <button className='sendbtn' onClick={()=>{props.addComment()}}>{props.buttonTxt}</button>}
      {props.buttonTxt === 'reply' && <button className='sendbtn' onClick={()=>{props.addReply(props.index)}}>{props.buttonTxt}</button>}
    </div>
  )
}

export default Reply