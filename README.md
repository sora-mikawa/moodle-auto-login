# Moodle Auto Login (Kagawa University)

香川大学のMoodle（kadai-moodle）のトップページを開いたときに、ログインページへのリンクを自動でクリックし、ログインページまでの遷移を省略するMicrosoft Edge拡張機能です。

## 概要

Moodleのトップページには「ログイン」リンクがありますが、そこまで手動で辿るのが地味に手間だったため作成しました。この拡張機能は**ログインページへの遷移**と**ログインボタンへのフォーカス**だけを自動化し、ユーザー名・パスワードの入力やログインボタンのクリック（自動送信）は行いません（セキュリティ上の理由から、認証情報の自動入力や自動送信は意図的に実装していません）。

## 主な機能

- Moodleトップページを開くと、ログインリンクを自動検出してクリックし、ログインページへ自動遷移します
- ログインページでは、ログインボタンに自動でフォーカスを当てます。ユーザー名・パスワードを入力した後、**Enterキーを押すだけ**でログインできます
- ユーザー名・パスワードの自動入力、ログインボタンの自動クリック（自動送信）は行わないため、通常のログインフローと同じ安全性を保ちます

## フォルダ構成

```text
moodle-auto-login/
├── manifest.json
└── content.js
```

## インストール方法（開発者モードでの読み込み）

### 1. Microsoft Edgeで拡張機能ページを開く

アドレスバーに以下を入力します。

```text
edge://extensions/
```

または右上の「…」メニューから **「拡張機能」→「拡張機能の管理」** を選択します。

### 2. 開発者モードを有効にする

拡張機能の管理ページ右上にある **「開発者モード」** をONにします。

ONにすると、拡張機能を手動で読み込むための **「展開して読み込み」** ボタンが表示されます。

### 3. 拡張機能を読み込む

1. **「展開して読み込み」** をクリックします。
2. ダウンロードした、または作成した拡張機能のフォルダ（`moodle-auto-login`）を選択します。
3. フォルダを選択すると、Microsoft Edgeに拡張機能が追加されます。

追加された拡張機能が一覧に表示され、**有効（ON）** になっていれば準備完了です。

## Chromeでの場合

本拡張機能はManifest V3ベースで、EdgeもChromeも同じChromiumエンジンのため、ほぼ同じ手順で動作します。

### 1. Google Chromeで拡張機能ページを開く

アドレスバーに以下を入力します。

```text
chrome://extensions/
```

### 2. デベロッパーモードを有効にする

拡張機能の管理ページ右上にある **「デベロッパーモード」** をONにします。

ONにすると、**「パッケージ化されていない拡張機能を読み込む」** ボタンが表示されます。

### 3. 拡張機能を読み込む

1. **「パッケージ化されていない拡張機能を読み込む」** をクリックします。
2. ダウンロードした、または作成した拡張機能のフォルダ（`moodle-auto-login`）を選択します。
3. フォルダを選択すると、Google Chromeに拡張機能が追加されます。

追加された拡張機能が一覧に表示され、**有効（ON）** になっていれば準備完了です。

> `manifest.json`と`content.js`はEdge・Chromeで共通して使用でき、変更は不要です。

## manifest.json（例）

```json
{
  "manifest_version": 3,
  "name": "Moodle Auto Login (Kagawa University)",
  "version": "1.0.0",
  "description": "kadai-moodleのログインページへの遷移を自動化する拡張機能",
  "content_scripts": [
    {
      "matches": ["https://kadai-moodle.kagawa-u.ac.jp/*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}
```

## content.js

```javascript
// トップページなど、ログインページ以外にいる場合のみリンクをクリックする
// （ログインページ内にも同じリンクが存在するテーマがあり、条件なしだと
//   自己参照的にクリック→再遷移→クリック…というリロードのループが発生するため）
if (!window.location.href.includes("/login/index.php")) {
    const loginLink = document.querySelector(
        'a[href="https://kadai-moodle.kagawa-u.ac.jp/login/index.php"]'
    );
    if (loginLink) loginLink.click();
}

// ログインページでは、ログインボタンにフォーカスを当てて
// ユーザー名・パスワード入力後にEnterキーだけでログインできるようにする
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
```

## 注意事項

- 本拡張機能はユーザー名・パスワードの自動入力、ログインボタンの自動クリック（自動送信）は行いません。認証はすべて手動操作（キーボードのEnterキー含む）で行われます。
- 香川大学のMoodleシステムの利用規約に従ってご利用ください。
- 個人の学習効率化を目的とした簡易ツールであり、公式のものではありません。

## License

MIT
