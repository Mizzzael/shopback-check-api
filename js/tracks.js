function injectScript(_file, _tag) {
    const node = document.getElementsByTagName(_tag)[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', _file);
    node.appendChild(script);
}

injectScript(chrome.extension.getURL('./js/inject.js'), 'body');

window.addEventListener('message', (e) => {
    if (e.data.type
        && (e.data.type === 'send_shopback' || e.data.type === 'send_shopback_error')) {
        chrome.runtime.sendMessage({ essential: e.data.essential });
    }
}, false);
