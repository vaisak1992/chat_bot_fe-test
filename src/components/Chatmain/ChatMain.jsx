import { React, useReducer } from "react";
import styles from "./Chatmain.module.css";
import {
  AccountCircleRounded,
  AddCircleOutline,
  Send,
} from "@mui/icons-material";
import { INITIAL_STATE, chatReducer, ACTIONS } from "./reducers/Chatreducer";
import axios from "axios";

export default function ChatMain() {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const handleMsgChange = (e) => {
    console.log(e);
    dispatch({
      type: ACTIONS.INPUT_BOX_VALUE,
      payload: e.target.value,
    });
  };
  const handleSend = (e) => {
    if (e.keyCode === 13 || e.type === "click") {
      axios
        .post("http://16.171.136.200:3000/query", { question: state.input_box })
        .then((res) => {
          const pay = {
            question: state.input_box,
            answer: res.status === 200 ? res.data.data : "No answer found",
          };
          dispatch({ type: ACTIONS.SEND_MSG, payload: pay });
          dispatch({ type: ACTIONS.ANSWER, payload: "Answer" });
        })
        .catch((error) => {
          console.error("There was an error!", error);
          const pay = {
            question: state.input_box,
            answer: "No answer found",
          };
          dispatch({ type: ACTIONS.SEND_MSG, payload: pay });
          dispatch({ type: ACTIONS.ANSWER, payload: "Answer" });
          // Optionally handle the error state here
        });
    }
  };
  console.log("reducer state>>>", state);
  return (
    <div className={styles.main}>
      <div className={styles.ans_box}>
        <>
          {state.msg.length > 0 &&
            state.msg.map((val, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
                key={`msg_${index}`}
              >
                {val.question && (
                  <div style={{ border: "1p xsolid red" }}>
                    <span className={styles.msg_bubble}>{val.question}</span>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span className={styles.answer_bubble}>{val.answer}</span>
                    <AccountCircleRounded />
                  </div>
                </div>
              </div>
            ))}
        </>
      </div>
      <div className={styles.msg_main_div}>
        <input
          onKeyDown={(e) => handleSend(e)}
          onChange={handleMsgChange}
          value={state.input_box}
          type="text"
          placeholder="Type your questions here"
        />
        <div
          className={
            state.input_box.length > 0
              ? styles.div_send_btn_container_2
              : styles.div_send_btn_container
          }
        >
          <Send onClick={state.input_box.length > 0 ? handleSend : null} />
        </div>
      </div>
    </div>
  );
}
