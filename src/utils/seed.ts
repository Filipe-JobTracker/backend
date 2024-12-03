import logger from "@/utils/logger";
import {db} from "@/utils/db";

async function baseConfig() {
    const seeds = [
        {
            key: "isSetup",
            value: "false",
        }

    ]
    for (const seed of seeds) {
        await db.config.create({
            data: {
                key: seed.key,
                value: seed.value,
                deletable: false,
            }
        })
    }
    logger.info("Base Config created")
}

export default async function () {
    await baseConfig();
}