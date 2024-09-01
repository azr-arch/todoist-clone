export async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        throw new Error("Service worker are not supported by this browser.");
    }
    await navigator.serviceWorker.register("/serviceWorker.js");
}

export async function getReadyServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        throw new Error("Service worker are not supported by this browser.");
    }

    return navigator.serviceWorker.ready;
}
