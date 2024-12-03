import {PrismaClient} from "@prisma/client";
import seed from "@/utils/seed";

export const db = new PrismaClient();

export async function databaseInit() {
    db.$connect().then(async () => {
        const isPopulated = await db.config.findUnique({
            where: {
                key: "isSetup"
            },
        })
        if (!isPopulated) {
            await seed();
        }
    }).catch((e: any) => {
        throw new Error(e);
    });
}