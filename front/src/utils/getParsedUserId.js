export const getParsedUserId = () => {
  let parsedUserId;

  if (sessionStorage.getItem("user_id")) {
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      return parsedUserId = parseInt(userId);
    }
  }
}