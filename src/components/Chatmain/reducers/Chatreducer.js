export const INITIAL_STATE = {
  input_box: "",
  msg: [],
  answer: [],
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_BOX_VALUE": {
      return {
        ...state,
        input_box: action.payload,
      };
    }
    case "SEND_MSG": {
      return {
        ...state,
        msg: [
          ...state.msg,
          { question: action.payload.question, answer: action.payload.answer },
        ],
        input_box: "",
      };
    }
    case "ANSWER": {
      return {
        ...state,
        answer: [...state.answer, action.payload],
      };
    }
    default:
      return state;
  }
};

export const ACTIONS = {
  INPUT_BOX_VALUE: "INPUT_BOX_VALUE",
  SEND_MSG: "SEND_MSG",
  ANSWER: "ANSWER",
};
