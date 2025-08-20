import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const FollowButton = ({ isFollowing, username }) => {
  const followUser = async () => {
    const res = await apiRequest.post(`/user/follow/${username}`);
    return res.data;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {isFollowing ? "Unfollow" : "Follow"} 
    </button>
  );
};
export default FollowButton