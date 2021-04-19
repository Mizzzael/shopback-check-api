window.watchData = {};
window.config = {
    id: undefined,
    data: undefined,
};

function render() {
    const acc = document.getElementById('acc');
    const account = document.getElementById('account');
    const clinetid = document.getElementById('clientid');
    const pecas = document.getElementById('pecas');
    const cart = document.getElementById('cart');
    const orderid = document.getElementById('orderid');
    const val = document.getElementById('val');
    const productslength = document.getElementById('productslength');
    const code = document.getElementById('code');
    const zero = document.getElementById('zero');
    if (window.config.data.acc) {
        acc.innerHTML = window.config.data.acc;
        acc.classList.remove('text-melona-500');
        acc.classList.add('text-cloud-100');
    }
    if (window.config.data.account) {
        account.innerHTML = window.config.data.account;
        account.classList.remove('text-melona-500');
        account.classList.add('text-cloud-100');
    }
    if (window.config.data.clientId) {
        clinetid.innerHTML = window.config.data.clientId;
        clinetid.classList.remove('text-melona-500');
        clinetid.classList.add('text-cloud-100');
    }
    if (window.config.data.pecas) {
        pecas.innerHTML = window.config.data.pecas.replace('[', '').replace(']', '').replace(/(["])+/g, ' ');
        pecas.classList.remove('text-melona-500');
        pecas.classList.add('text-cloud-100');
    }
    if (window.config.data.cart) {
        cart.classList.remove('hidden');
        if (window.config.data.orderid) {
            orderid.innerHTML = window.config.data.orderid;
            orderid.classList.remove('text-melona-500');
            orderid.classList.add('text-cloud-100');
        }

        if (window.config.data.valor) {
            const formatter = new Intl.NumberFormat([], {
                style: 'currency',
                currency: 'BRL',
            });
            val.innerHTML = formatter.format(window.config.data.valor);
            val.classList.remove('text-melona-500');
            val.classList.add('text-cloud-100');
        }
    }
    productslength.innerHTML = window.config.data.products.length;
    if (window.config.data.products.length) {
        code.innerHTML = Prism.highlight(js_beautify(JSON.stringify({ data: window.config.data.products }, null, 4)).trim(), Prism.languages.json, 'json');
    } else {
        code.classList.add('hidden');
        zero.classList.remove('hidden');
        startZeroProducts();
    }
}

function startLoading() {
    lottie.loadAnimation({
        container: window.document.getElementById('loading'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'plugins/animation/15066-jooey-at-tgsticker-sticker-18.json', // the path to the animation json
    });
}

function startErr() {
    lottie.loadAnimation({
        container: window.document.getElementById('err'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'plugins/animation/55235-orangoutang-sticker-3.json', // the path to the animation json
    });
}

function startZeroProducts() {
    lottie.loadAnimation({
        container: window.document.getElementById('zero'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'plugins/animation/55236-orangoutang-sticker-4.json', // the path to the animation json
    });
}

function errScreen() {
    anime({
        targets: '.app\\.loading',
        backgroundColor: '#d13651',
        duration: 900,
        easing: 'easeInSine',
    });
    anime({
        targets: '#loading',
        opacity: [1, 0],
        duration: 900,
        easing: 'easeInSine',
    });
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('err').classList.add('opacity-0');
        document.getElementById('err').classList.remove('hidden');
        startErr();
        anime({
            targets: '#err',
            opacity: [0, 1],
            duration: 900,
            easing: 'easeInSine',
        });
    }, 1000);
}

function closeLoading() {
    anime({
        targets: '.app\\.loading',
        translateY: [0, '-100vh'],
        duration: 900,
        easing: 'easeInSine',
    });
}

function setData() {
    if (!window.config.data && window.watchData[window.config.id]) {
        window.config.data = window.watchData[window.config.id];
        render();
        closeLoading();
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    startLoading();
    let err = false;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        window.config.id = tabs[0].id;
    });
    chrome.runtime.onMessage.addListener((message, sender, _) => {
        if (sender.tab.id !== window.config.id) return;
        if (!message.essential.err) {
            window.watchData[sender.tab.id] = message.essential || null;
            setData();
        } else if (!err) {
            err = true;
            errScreen();
        }
    });
});
