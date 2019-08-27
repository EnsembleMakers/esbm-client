export const confirmBox = (msg, event) => {
  const result = window.confirm(msg)
  if(result) {
    event();
  }else {
    return 0;
  }
}