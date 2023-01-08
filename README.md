# What this program do
![](https://i.gyazo.com/e1e8a21af3ad8740fd6225feb32c3041.png)

# Usage
## Just use
1. Create `.config.ts` like `export const config = {
    src: "localhost:3080",
    dst: "twegaku.towasys.com",
    port: "3080"
}`
2. run `deno run --allow-env --allow-net --allow-read --allow-sys app.ts`

## Run on a server with pm2
1. run `pm2 start app.ts --interpreter="deno" --interpreter-args="run --allow-env --allow-net --allow-read --allow-sys" --name octpepper`
