import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

import { AddMoney, BalanceCard, RecentTransaction, TransferCard } from "./components/Wallet";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
    return null;
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3">
      <div className="left border-r border-border p-4 gap-4 grid md:grid-rows-5">
        <BalanceCard className="row-span-2" />
        <AddMoney className="row-span-3" />
      </div>
      <div className="right col-span-2 p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BalanceCard />
          <TransferCard />
        </div>
        <div>
          <RecentTransaction />
        </div>
      </div>
    </main>
  );
}
