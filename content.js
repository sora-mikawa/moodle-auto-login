// トップページなど、ログインページ以外にいる場合のみリンクをクリックする
if (!window.location.href.includes("/login/index.php")) {
    const loginLink = document.querySelector(
        'a[href="https://kadai-moodle.kagawa-u.ac.jp/login/index.php"]'
    );
    if (loginLink) loginLink.click();
}

// ログインページ用の処理
const waitForLoginButton = () => {
    const loginButton = document.querySelector("#loginbtn");

    if (loginButton) {
        loginButton.focus();
        console.log("ログインボタンにフォーカスしました");
    } else {
        setTimeout(waitForLoginButton, 100);
    }
};

if (window.location.href.includes("/login/index.php")) {
    if (document.readyState === "complete") {
        waitForLoginButton();
    } else {
        window.addEventListener("load", waitForLoginButton);
    }
}

