let products = [];
function init() {
    const { acc } = window.top.spl;
    let essential = {
        err: false,
        acc,
        account: window.top._st_account,
        pecas: (Object.keys(top.spl.cid_redirect).length) ? JSON.stringify((Object.keys(top.spl.cid_redirect))) : 'sem peças aqui',
        cart: (window.top.cv_data) ? window.top.cv_data : false,
        products,
    };
    if (window.top.shopback) {
        const sb = window.top.shopback;
        essential = {
            ...essential,
            clientId: sb.client_id,
        };
    }
    if (window.postMessage) {
        window.postMessage({
            type: 'send_shopback',
            essential,
        });
    } else {
        console.log(window.postMessage);
    }
}

function err() {
    window.postMessage({
        type: 'send_shopback_error',
        essential: {
            err: true,
        },
    });
}

window.addEventListener('load', () => {
    if (window.top.spl) {
        setInterval(() => {
            if (window.top.shopback && !products.length) {
                window.top.shopback.getRecommendations({}, ({ data }) => {
                    products = data;
                    init();
                });
            } else {
                init();
            }
        }, 1000);
    } else {
        setInterval(() => {
            if (!window.top.spl) {
                err();
            } else if (window.top.shopback && !products.length) {
                window.top.shopback.getRecommendations({}, ({ data }) => {
                    products = data;
                    init();
                });
            } else {
                init();
            }
        }, 1000);
    }
});
