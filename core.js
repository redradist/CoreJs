let coreJsApi = {
    "addEventListener": null,
    "alert": null,
    "atob": null,
    "btoa": null,
    "clearInterval": null,
    "clearTimeout": null,
    "confirm": null,
    "dispatchEvent": null,
    "fetch": null,
    "prompt": null,
    "queueMicrotask": null,
    "removeEventListener": null,
    "setInterval": null,
    "setTimeout": null,
    "WebAssembly": {
        "compile": null,
        "compileStreaming": null,
        "instantiate": null,
        "instantiateStreaming": null,
        "validate": null,
    },
};

function handler(jsApi) {
    return function(obj, prop) {
        if (prop in jsApi) {
            let subProps = jsApi[prop];
            if (subProps) {
                return new Proxy(obj[prop], handler(subProps));
            }
        }
        return undefined;
    };
}

export const coreThis = new Proxy(globalThis, handler(coreJsApi));
