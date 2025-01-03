import prisma from "..";
import { hashItem } from "@pay/utils"

async function main() {
    const banks = ["Axis Quick", "HDFC True", "ICICI Fast"];

    await Promise.all(
        [
            { number: "10101", password: "arthur@123", name: "Arthur Morgan" },
            { number: "20202", password: "carl@123", name: "Carl Johnson" },
            { number: "30303", password: "john@123", name: "John Marston" },
            { number: "40404", password: "tommy@123", name: "Tommy Vercetti" },
            { number: "50505", password: "michael@123", name: "Michael De Santa" },
            { number: "60606", password: "trevor@123", name: "Trevor Philips" },
            { number: "70707", password: "niko@123", name: "Niko Bellic" },
            { number: "80808", password: "claude@123", name: "Claude Speed" },
            { number: "90909", password: "dutch@123", name: "Dutch van der linde" },
            { number: "11111", password: "javier@123", name: "Javier Escuella" },
            { number: "22222", password: "vito@123", name: "Vito Scaletta" },
        ].map(async (user, i) => {
            const hashedPassword = await hashItem(user.password);
            return prisma.user.upsert({
                where: { number: user.number },
                update: {},
                create: {
                    ...user,
                    password: hashedPassword,
                    OnRampTransaction: {
                        create: {
                            startTime: new Date(),
                            status: i % 2 === 0 ? "Success" : "Failure",
                            amount: (i + 1) * 1000,
                            token: `token_${i}`,
                            provider: banks[Math.floor(Math.random() * banks.length)] || "HDFC True",
                        },
                    },
                },
            });
        })
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
