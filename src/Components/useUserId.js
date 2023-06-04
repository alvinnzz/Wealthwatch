import { useState } from "react";

function useUserId() {
  const getUserId = () => {
    const userIdString = sessionStorage.getItem("userId");
    const Id = JSON.parse(userIdString);
    return Id?.userId;
  };

  const [userId, setUserId] = useState(getUserId());

  const saveUserId = (userId) => {
    sessionStorage.setItem("userId", JSON.stringify(userId));
    setUserId(userId.userId);
  };

  return {
    setUserId: saveUserId,
    userId,
  };
}

export default useUserId;
