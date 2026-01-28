import toast from "react-hot-toast";

function Toast(data) {
  if (!data) {
    toast.error("Server Down");
  }
  if (data?.status) {
    console.log("Message==", data?.message);
    return toast.success(data?.message);
  } else {
    console.log("Message", data?.message);
    return toast.error(data?.message);
  }
}

export default Toast;
