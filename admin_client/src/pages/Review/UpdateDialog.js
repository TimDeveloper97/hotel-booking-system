import { useContext, useState } from "react";
// UI
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  CircularProgress,
} from "@mui/material";
// Logic
import NotificationContext from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  acceptReview,
  ignoreReview,
  resetReview,
} from "../../redux/actions/review";

// ----------------------------
const UpdateDialog = ({ dialogContent, open, setOpen, id, setId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const [doing, setDoing] = useState(false);

  const handleClose = () => {
    if (doing) return;
    setId();
    setOpen(false);
  };

  const handleSuccess = () => {
    context.setNotification({
      type: "success",
      content: dialogContent.successMessage,
    });
    context.setOpen(true);
    setDoing(false);
    handleClose();
  };

  const handleFailure = (needLogin, message) => {
    context.setNotification({
      type: "error",
      content: message,
    });
    context.setOpen(true);
    setDoing(false);
    if (needLogin)
      navigate("/login", {
        state: { returnUrl: "/review" },
      });
    handleClose();
  };

  const handleDelete = () => {
    setDoing(true);
    switch (dialogContent.type) {
      case "WAITING":
        dispatch(resetReview(id, handleSuccess, handleFailure));
        break;
      case "APPROVE":
        dispatch(acceptReview(id, handleSuccess, handleFailure));
        break;
      case "REJECT":
        dispatch(ignoreReview(id, handleSuccess, handleFailure));
        break;
      default:
        alert("Không hợp lệ");
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          style={{ height: 50 }}
        >
          ĐÓNG
        </Button>
        <Button
          onClick={handleDelete}
          color={dialogContent.buttonColor}
          variant="contained"
          style={{ marginLeft: 10, height: 50, minWidth: 80, color: "#FFF" }}
          disabled={doing}
        >
          {doing ? (
            <CircularProgress style={{ color: "#FFF" }} />
          ) : (
            dialogContent.buttonText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
