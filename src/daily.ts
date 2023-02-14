import * as dotenv from "dotenv";
dotenv.config();
import { Client, Language } from "genshin-kit.js";
import { Webhook, MessageBuilder } from "discord-webhook-node";
const accounts = JSON.parse(process.env.HOYO_COOKIES as string);
console.log(`Found ${accounts.length} account(s)!`);

accounts.forEach(
  async (account: { ltuid: string; ltoken: string }, i: number) => {
    const client = new Client({
      language: Language.EnglishUS,
    });

    client.login(account.ltuid, account.ltoken);
    if (client.isLogin()) {
      console.log(`Account ${i + 1} |`, `Logged In.`);

      const getDaily = await client.dailyReward.checkIn();
      if (getDaily.code === 0) {
        console.log(
          `Account ${i + 1} | ` +
            `Redeemed ${getDaily.rewards?.count} ${getDaily.rewards?.name}!`
        );

        if (process.env.DISCORD_WEBHOOK) {
          const hook = new Webhook(process.env.DISCORD_WEBHOOK);
          hook.setUsername(`AnimeLabs-Automation | Account ${i + 1}`);
          const embed = new MessageBuilder()
            .setTitle(
              `Redeemed ${getDaily.rewards?.count} ${getDaily.rewards?.name}!`
            )
            .setThumbnail(getDaily.rewards?.icon as string)
            .setDescription(
              `Successfully redeemed <t:${Math.round(Date.now() / 1000)}:R>!`
            )
            .setFooter("AnimeLabs-Automation by lonelil")
            .setTimestamp();
          hook.send(embed);
        }
      } else {
        console.error(`Account ${i + 1} | An error has occurred |`, getDaily);
        if (process.env.DISCORD_WEBHOOK) {
          const hook = new Webhook(process.env.DISCORD_WEBHOOK);
          hook.setUsername(`AnimeLabs-Automation | Account ${i + 1}`);
          const embed = new MessageBuilder()
            .setTitle("An error has occurred!")
            .setDescription(JSON.stringify(getDaily))
            .setFooter("AnimeLabs-Automation by lonelil")
            .setTimestamp();
          hook.send(embed);
        }
      }
    }
  }
);
