# dsh-font-settings

DeepSeek Harness の Web/デスクトップ GUI で**表示フォントを変更できるようにするプラグイン**です。
既定のフォントスタックは CJK フォールバックが中華フォント（PingFang SC / Microsoft YaHei）になっているため、
日本語の字形（ハネ・ハライ・ツクリなど）が見慣れない表示になりがちです。
このプラグインは既定フォントを **メイリオ（Meiryo）** にし、設定ページからいつでも変更できます。

## 動作

- テーマが定義している CSS 変数 `--dsw-font-family`（UI 全体）と `--ds-font-family-code`（コード）を、
  プラグイン独自の `<style>` で上書きします（`!important` 付きなのでスタイルシート順に依存しません）。
- 選択はエントリ設定（`font-settings` ロウ）に永続保存され、**ページ読み込み時に自動で再適用**、
  設定変更は**リロード不要で即時反映**されます（volatile 設定）。
- 設定ページに「フォント」セクションが増えます：
  - UI フォント：メイリオ / Meiryo UI / biz UDPゴシック / 游ゴシック UI / 游ゴシック / ヒラギノ / Noto Sans JP / Segoe UI / アプリ既定 / カスタム
  - コードフォント：アプリ既定 / Consolas + Meiryo Keika / Cascadia Mono + Meiryo Keika / Meiryo Keika / カスタム
  - プレビューと「メイリオに戻す」ボタン

## 設定項目（Host `Config`）

| フィールド | 既定値 | 説明 |
| --- | --- | --- |
| `enable` | `true` | 上書きのマスタースイッチ |
| `uiFont` | `Meiryo, "Yu Gothic UI", "Segoe UI", sans-serif` | UI の CSS font-family スタック |
| `codeFont` | `""`（アプリ既定） | コードの CSS font-family スタック |

## インストール

npm（公開名：`@satuki_suto/dsh-font-settings`）:

```
dsh plugin install @satuki_suto/dsh-font-settings
```

または GitHub（https://github.com/SatukiSuto-HPC/dsh-font-settings）を clone して、
`dsh plugin install <このフォルダ>` でローカルインストールできます。

npm 不要の共有経路として、[GitHub Releases](https://github.com/SatukiSuto-HPC/dsh-font-settings/releases) の tarball をダウンロードして:

```
dsh plugin install ./satuki_suto-dsh-font-settings-0.1.0.tgz
```

プロファイル（例：`~/.dsh/profiles/desktop/`）に本バンドルを入れ、
`cordis.patch.yml` の行（`id: font-settings`）がロースターに入っていることを確認してください。

## アンインストール

プラグインを無効化／削除すると `<style>` はクリーンアップされ、アプリ既定のフォントに戻ります。

---

## English

A DeepSeek Harness plugin that makes the GUI display font changeable from the settings page.
The stock font stacks fall back to Chinese CJK fonts (PingFang SC / Microsoft YaHei), so Japanese
glyph shapes look unfamiliar; this plugin defaults to **Meiryo (メイリオ)** and lets you switch
to other presets (Meiryo UI, biz UDP Gothic, Yu Gothic UI, Yu Gothic, Hiragino, Noto Sans JP,
Segoe UI, or a custom CSS font-family value) from **Settings → Fonts**. Changes apply live and
are saved as entry config.

Install: `dsh plugin install @satuki_suto/dsh-font-settings`

License: MIT
