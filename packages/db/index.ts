import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var primsaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.primsaGlobal ?? prismaClientSingleton()

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.primsaGlobal = prisma