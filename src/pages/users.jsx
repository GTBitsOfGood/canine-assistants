import UserTable from "@/components/User/UserTable";
/**
 * The main page for user management
 *
 * @returns {React.ReactElement} The User management page
 */
export default function UsersPage() {
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