import { serve } from "https://deno.land/std/http/server.ts";
import { config } from "./.config.ts";

serve(async (request_orig: Request) => {
    const request = new Request(request_orig.url, {
        method: request_orig.method,
        headers: request_orig.headers,
        redirect: request_orig.redirect,
        cache: "no-store",
    });
    const cache = await caches.open("v1");
    const response_cache = await cache.match(request_orig.url);
    console.log({ response_cache });
    if (response_cache?.status == 200) {
        const last_modified = response_cache.headers.get("last-modified");
        if (last_modified) {
            request.headers.append('if-modified-since', last_modified);
            console.log("add if-modified-since", {request});
        }
    }
    const url = request.url.replace(config.src, config.dst);
    console.log({url});
    const response_fetch = await fetch(url, request);
    console.log({response_fetch})
    if (response_fetch.status == 304 && response_cache?.status == 200) {
        response_cache?.headers.append("o-cache", "HIT");
        console.log("return cache due to 304");
        return response_cache;
    }
    if(response_fetch.status == 200 && request.method == "GET") {
        console.log("cache.put", {response: response_fetch});
        await cache.delete(request_orig.url);
        await cache.put(request_orig.url, response_fetch.clone());
    }

    return response_fetch;
}, { port: config.port });