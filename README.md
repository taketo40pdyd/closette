# Closette

持っている服の着用回数・1回あたりの価格・お手入れの時期を記録できる衣服管理アプリです。
HTML 1ファイル(`index.html`)で動き、ビルドは不要です。フォルダーはありません。すべてリポジトリの直下に置きます。

## ファイル

| ファイル | 役割 |
| --- | --- |
| `index.html` | アプリ本体 |
| `404.html` | 見つからないときの案内(トップへ自動で移動) |
| `.nojekyll` | GitHub Pages の Jekyll 処理を無効にする(空ファイル) |
| `firestore.rules` | Firestore のセキュリティルール |
| `storage.rules` | Cloud Storage のルール(未使用のため全面拒否) |
| `firebase.json` | ルールのデプロイ設定 |
| `.gitignore` | Git で無視するファイル |

## 公開手順(GitHub Pages)

1. GitHub で新しいリポジトリを作ります。
2. このファイルをすべて、リポジトリの直下にアップロードします(「Add file → Upload files」にドラッグするだけで構いません)。`.nojekyll` などドットで始まるファイルも忘れずに入れてください。
3. **Settings → Pages → Build and deployment** で、Source を **Deploy from a branch**、Branch を **main** / **/(root)** にして Save します。
4. 1〜2分ほどで `https://<ユーザー名>.github.io/<リポジトリ名>/` で開けます。

プライベートリポジトリで Pages を使うには、GitHub の有料プランが必要です。

## Firebase の設定(ログイン・端末間同期を使う場合)

1. **承認済みドメインの追加**
   Firebase コンソール → Authentication → 設定 → 承認済みドメイン に `<ユーザー名>.github.io` を追加します(リポジトリ名は含めません)。
2. **ルールの反映**
   Firestore と Storage の「ルール」画面に、`firestore.rules` と `storage.rules` の中身を貼って公開します。
   Firebase CLI を使うなら次のコマンドでも反映できます。
   ```
   firebase deploy --only firestore:rules,storage
   ```
3. **APIキーの制限(推奨)**
   Google Cloud コンソール → APIとサービス → 認証情報 で、ウェブ用APIキーの「アプリケーションの制限」を「HTTPリファラー」にし、`https://<ユーザー名>.github.io/*` を指定します。

Authentication の「ログイン方法」では、Google と匿名(ゲスト用)を有効にしてください。

## ローカルで確認する

```
python3 -m http.server 8000
```

`http://localhost:8000/` を開きます。`file://` で直接開くと、ホーム画面への追加(PWA)などが動きません。

## 注意

- `index.html` には `robots: noindex` が入っています。検索エンジンに載せたい場合は、このメタタグを削除してください。
- 外部サービス(Firebase、Open-Meteo の天気、フォント、QR/バーコード読み取りライブラリ)にはインターネット接続が必要です。
- ログインしない場合、データはそのブラウザの localStorage にだけ保存されます。
