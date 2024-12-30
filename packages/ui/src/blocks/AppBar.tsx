import UserBtn from "./UserBtn.js";

export default function AppBar() {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b border-muted">
                <h1 className="text-xl font-semibold">Pay</h1>
                <UserBtn />
            </header>
    )
}