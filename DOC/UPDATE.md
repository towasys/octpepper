wsl rsync -avrz --exclude=node_modules ./* t_w-rinkaku@207.148.98.69:~/bin/octpepper

pm2 start app.ts --interpreter="deno" --interpreter-args="run --allow-env --allow-net --allow-read --allow-sys" --name octpepper