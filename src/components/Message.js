import { Alert } from "react-bootstrap";

const Message = ({ type, msg }) => {
  return (
    <Alert
      variant={type}
      className={`mt-2 ${type === "success" ? "success-box" : "error-box"}`}
    >
      {msg}
    </Alert>
  );
};

export default Message;
