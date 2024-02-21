import UserTable from "@/components/User/UserTable";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

/**
 * The main page for user management
 *
 * @returns {React.ReactElement} The User management page
 */
export default function UsersPage() {


  // Ensuring that only Admins and Managers can view this page
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState(null);
  

  useEffect(() => {
    fetch(`/api/users/${session?.user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data?.data?.role);
      });
  }, [session?.user]);

  if (status === "loading" || !userRole) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (userRole && userRole !== "Admin" && userRole !== "Manager") {
    return <div className="p-10 text-center">You must be an Admin or Manager to access this page.</div>
  }


  return (
    <div className={`pt-4 container mx-auto`}>
      <div className="pt-5 text-gray-800 order-b border-gray-300 flex-grow">
        <div className="flex">
          <UserTable/>
        </div>
      </div>
    </div>
  );
}