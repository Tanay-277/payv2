export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="relative">
            <div className="absolute font-semibold text-[15rem] leading-none z-0">
                Pay
            </div>
            {children}
        </main>
    )
}