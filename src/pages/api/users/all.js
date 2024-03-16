import { getUsers } from "../../../../server/db/actions/User";
import { getInvitedUsers } from "../../../../server/db/actions/InvitedUser";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const users = await getUsers();
      const invitedUsers = await getInvitedUsers();

      return res.status(200).json({
        success: true,
        message:
          "Successfully retrieved all active, inactive, and invited users",
        data: {
          users: users,
          invitedUsers: invitedUsers,
        },
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
