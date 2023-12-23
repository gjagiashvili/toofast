import "./App.css";

import React, { useState } from "react";
import Comment from "./components/Comment";
import Reply from "./components/Reply";
import data from "./data.json";

const App = () => {
  const [dataState, setDataState] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [replyToggle, setReplyToggle] = useState(
    Array(dataState.comments.length).fill(false)
  ); //Array() funqcia argumentis toli sigrdzis masivs sheqmnis da mis titoeul elements gadaaqcevs bulean value falsad




  const replyHandler = (index) => {
    setReplyToggle((prevState) => {
      const updatedToggle = [...prevState];
      updatedToggle[index] = !updatedToggle[index];
      return updatedToggle;
    });
  };

  const addReply = (index) => {
    if (inputValue.trim() !== "") {
      const updatedComments = [...dataState.comments];
      const updatedReplies = [...updatedComments[index].replies];

      updatedReplies.push({
        id: updatedReplies.length + 1,
        content: inputValue,
        createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
        score: 0,
        user: {
          image: {
            png: "/images/avatars/image-juliusomo.png",
          },
          username: "julisomo",
        },
        isCurrentUser: true,
      });

      updatedComments[index] = {
        ...updatedComments[index],
        replies: updatedReplies,
      };

      setDataState({
        ...dataState,
        comments: updatedComments,
      });
      replyHandler(index);
      setInputValue("");
    } else {
      window.alert("Please Fill Input Field");
    }
  };

  const addComment = () => {
    if (inputValue.trim() !== "") {
      setDataState({
        ...dataState,
        comments: [
          ...dataState.comments,
          {
            id: dataState.comments.length + 1,
            content: inputValue,
            createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
            score: 0,
            user: {
              image: {
                png: "/images/avatars/image-juliusomo.png",
              },
              username: "juliusomo",
            },
            replies: [],
          },
        ],
      });
    } else {
      window.alert("Fill The Comment Input Please.");
    }
  };

  const commentData = dataState.comments.map((item, index) => (
    <React.Fragment key={index}>
      <Comment
        item={item}
        data={dataState}
        replyHandler={() => replyHandler(index)}
        type={true}
      />
      {replyToggle[index] && (
        <Reply
          buttonTxt={"reply"}
          setInputValue={setInputValue}
          addReply={addReply}
          index={index}
        />
      )}
      {item.replies.length !== 0 ? (
        <div className="reply-div" key={index + 100}>
          {item.replies.map((reply, replyIndex) => (
            <>
              <Comment
                item={reply}
                itemIndex={index}
                key={replyIndex}
                replyIndex={replyIndex}
                data={dataState}
                type={true}
                
              />
              
            </>
          ))}
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  ));

  return (
    <div>
      {commentData}
      <Reply
        buttonTxt={"send"}
        setInputValue={setInputValue}
        inputValue={inputValue}
        addComment={addComment}
      />
    </div>
  );
};

export default App;