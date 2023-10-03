
export default function Navbar() {
    return (
        <div className="flex h-[74px] bg-foreground items-center px-8 border-b border-neutral-300 justify-start gap-4">
            <div className="px-10">
                Logo
            </div>

            <div className="border-b-4 self-stretch border-ca-green flex-col justify-center items-start inline-flex ">
                <div className="p-3 flex-col justify-center items-center flex">
                    <div className="text-center text-primary-text text-lg font-semibold">Dashboard</div>
                </div>
            </div>
            <div className="border-b-4 border-foreground self-stretch flex-col justify-center items-start inline-flex">
                <div className="p-3 flex-col justify-center items-center flex">
                    <div className="text-center text-primary-text text-lg font-semibold">Account</div>
                </div>
            </div>
            <div className="border-b-4 border-foreground self-stretch flex-col justify-center items-start inline-flex">
                <div className="p-3 flex-col justify-center items-center flex">
                    <div className="text-center text-primary-text text-lg font-semibold">User Management</div>
                </div>
            </div>

        </div>
    )
}