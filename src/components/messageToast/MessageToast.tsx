import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notificationSlice";
import { RootState } from "../../store";

export const MessageToast = () => {
  const messages = useSelector(
    (state: RootState) => state.notification.message
  );
  const dispatch = useDispatch();

  const clearMessage = (id: string) => {
    dispatch(notificationActions.removeMessage(id));
  };

  return (
    <div
      className="toast-container position-fixed"
      style={{ top: "64px", right: "15px" }}
    >
      {!!messages?.length &&
        messages?.map((message) => {
          return (
            <div
              key={message?.id}
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-delay="3000"
            >
              <div className={`toast-header text-white bg-${message?.type}`}>
                <strong className="me-auto">{message?.title}</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={() => {
                    clearMessage(message?.id);
                  }}
                />
              </div>
              <div className="toast-body">{message.text}</div>
            </div>
          );
        })}
    </div>
  );
};
