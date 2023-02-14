# AnimeLabs-Automation

## Daily Reward Check In
Fork https://github.com/lonelil/AnimeLabs-Automation

Goto hoyolab and run 
```js
let cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
alert(`Please copy the value below and follow the guide.\n\n{ "ltuid": "${cookies.ltuid}", "ltoken": "${cookies.ltoken}" }`)
```
in your browser console

Goto Settings > Secrets and variables > Actions

Press "New repository secret"

Name: HOYO_COOKIES

Secret: "[PUT THE THING FROM THE POPUP ON HOYOLAB]"

Add secret



### If you want a discord webhook notification

Press "New repository secret"

Name: DISCORD_WEBHOOK

Secret: "YOUR DISCORD WEBHOOK LINK"

Add secret 
