import * as dotenv from "dotenv";
dotenv.config();
import { Client, Language } from "genshin-kit.js";
const accounts = JSON.parse(process.env.HOYO_COOKIES as string);
console.log(`Found ${accounts.length} accounts!`);

accounts.forEach(
  async (account: { ltuid: string; ltoken: string }, i: number) => {
    const client = new Client({
      language: Language.EnglishUS,
    });

    client.login(account.ltuid, account.ltoken);
    if (client.isLogin()) {
      console.warn(`Account ${i + 1} |`, `Logged In.`);
      const getDaily = await client.dailyReward.checkIn();
      if (getDaily.code === 0) {
        console.log(
          `Account ${i + 1} | ` +
            `Redeemed ${getDaily.rewards?.name}!`
        );
      } else {
        console.warn(`Account ${i + 1} |`, getDaily);
      }
    }
  }
);
