window.__ModuleLoader__.load({
	// Must equal the cordis.patch.yml row name / package name: the client
	// module loader matches the bundle's registration id against the row id.
	id: "@satuki_suto/dsh-font-settings",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");

		//#region constants
		/** Section entry id this bundle registers on the settings page. */
		const ENTRY_ID = "font-settings";
		/** Locale namespace owned by this plugin. */
		const NS = "fontSettings";
		/** Attribute marking this package's injected <style> element. */
		const STYLE_ATTR = "data-dsh-font-settings";
		/** localStorage key holding this browser's font preferences. */
		const STORE_KEY = "dsh-font-settings:v1";
		/** The shipped default: Meiryo first, so Japanese renders Japanese. */
		const DEFAULT_UI = "Meiryo, \"Yu Gothic UI\", \"Segoe UI\", sans-serif";
		/** The application's own stock UI stack (what the theme base.css sets). */
		const APP_DEFAULT_UI = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial, sans-serif";
		/** The application's own stock code stack (theme default). */
		const APP_DEFAULT_CODE = "\"SF Mono\", \"JetBrains Mono\", \"Fira Code\", Consolas, \"Liberation Mono\", Menlo, Courier, \"PingFang SC\", \"Microsoft YaHei\"";
		/** Sentinel select value for "the current stack is not a preset". */
		const CUSTOM = "\u0000custom";

		/** Preset UI font stacks (Windows-first, then cross-platform). */
		const UI_PRESETS = [
			{ stack: DEFAULT_UI, label: "メイリオ（Meiryo・既定）" },
			{ stack: "Meiryo", label: "メイリオ（Meiryo のみ）" },
			{ stack: "\"Meiryo UI\"", label: "メイリオ UI（Meiryo UI）" },
			{ stack: "\"biz UDPゴシック\", \"bizUDGothic\"", label: "biz UDPゴシック（biz UDゴシック）" },
			{ stack: "\"Yu Gothic UI\", \"Yu Gothic\"", label: "游ゴシック UI（Yu Gothic UI）" },
			{ stack: "\"Yu Gothic\", \"YuGothic\"", label: "游ゴシック（Yu Gothic）" },
			{ stack: "\"Hiragino Kaku Gothic New\", \"Hiragino Sans\"", label: "ヒラギノ角ゴシック（Hiragino）" },
			{ stack: "\"Noto Sans JP\", \"Noto Sans CJK JP\"", label: "Noto Sans JP" },
			{ stack: "\"Segoe UI\"", label: "Segoe UI（欧文字中心）" },
			{ stack: APP_DEFAULT_UI, label: "アプリ既定（中華フォント混じり）" },
		];
		/** Preset code font stacks; "" keeps the application default. */
		const CODE_PRESETS = [
			{ stack: "", label: "アプリ既定（モノスペース）" },
			{ stack: "Consolas, \"Meiryo Keika Medium\"", label: "Consolas + Meiryo Keika" },
			{ stack: "\"Cascadia Mono\", \"Meiryo Keika Medium\"", label: "Cascadia Mono + Meiryo Keika" },
			{ stack: "\"Meiryo Keika Medium\"", label: "Meiryo Keika（和文等幅）" },
			{ stack: APP_DEFAULT_CODE, label: "既定スタックを明示" },
		];
		//#endregion

		//#region dictionaries
		const dictJa = {
			"title": "フォント",
			"description": "GUI の表示フォントを変更します。既定はメイリオで、日本語の字形がそのまま表示されます。変更は即座に反映され、このブラウザに保存されます。",
			"enable": "フォント設定を有効にする",
			"uiTitle": "UI フォント",
			"codeTitle": "コードフォント",
			"custom": "カスタム…",
			"customPlaceholder": "CSS font-family 値（例: Meiryo, sans-serif）",
			"commitHint": "Enter またはフォーカス外出力で反映",
			"codeHint": "空欄はアプリ既定のまま。既定スタックの CJK は中華フォントにフォールバックします。",
			"preview": "プレビュー",
			"sampleUi": "あいうえお 日本語の字形 いろはにほへと AaBbCcDd 0123456789",
			"sampleCode": "const 漢字 = 値; // 100% 確認 — 0O1lI",
			"reset": "メイリオに戻す"
		};
		const dictEn = {
			"title": "Fonts",
			"description": "Change the GUI display fonts. The default is Meiryo so Japanese glyph shapes render natively. Changes apply instantly and are saved in this browser.",
			"enable": "Enable font settings",
			"uiTitle": "UI font",
			"codeTitle": "Code font",
			"custom": "Custom…",
			"customPlaceholder": "CSS font-family value (e.g. Meiryo, sans-serif)",
			"commitHint": "Press Enter or leave the field to apply",
			"codeHint": "Empty keeps the app default; the default CJK fallback is a Chinese font.",
			"preview": "Preview",
			"sampleUi": "あいうえお Japanese glyph forms いろはにほへと AaBbCcDd 0123456789",
			"sampleCode": "const 漢字 = 値; // 100% 確認 — 0O1lI",
			"reset": "Back to Meiryo"
		};
		const dictZh = {
			"title": "字体",
			"description": "更改 GUI 显示字体。默认使用 Meiryo（冬青黑体），日文按日本字形显示。修改即时生效并保存在此浏览器中。",
			"enable": "启用字体设置",
			"uiTitle": "界面字体",
			"codeTitle": "代码字体",
			"custom": "自定义…",
			"customPlaceholder": "CSS font-family 值（例如 Meiryo, sans-serif）",
			"commitHint": "按 Enter 或离开输入框后生效",
			"codeHint": "留空保持应用默认；默认 CJK 会回退到中文字体。",
			"preview": "预览",
			"sampleUi": "あいうえお 日本語の字形 いろはにほへと AaBbCcDd 0123456789",
			"sampleCode": "const 漢字 = 値; // 100% 確認 — 0O1lI",
			"reset": "恢复 Meiryo"
		};
		//#endregion

		//#region local store
		/**
		 * Settings live in the browser's localStorage rather than the DSH
		 * profile: the plugin ships no host-side config row and no npm
		 * dependency, so it activates identically under every install method
		 * (npm, git clone, folder copy — linked installs skip the plugin's
		 * own dependencies). A font choice is a per-display preference, so
		 * the per-browser scope is the natural one, and tabs of the same
		 * browser stay in sync through storage events.
		 */
		/** Normalize one raw value into the effective configuration shape. */
		function normalize(raw) {
			const v = raw && typeof raw === "object" ? raw : {};
			const ui = typeof v.uiFont === "string" ? v.uiFont.trim() : "";
			const code = typeof v.codeFont === "string" ? v.codeFont.trim() : "";
			return {
				enable: v.enable !== false,
				uiFont: ui !== "" ? ui : DEFAULT_UI,
				codeFont: code
			};
		}
		/** The effective configuration shipped with no stored state. */
		const DEFAULT_CFG = normalize({});
		/** Read the persisted configuration; null when nothing valid is stored. */
		function readStored() {
			try {
				const raw = window.localStorage.getItem(STORE_KEY);
				if (typeof raw !== "string") return null;
				return normalize(JSON.parse(raw));
			} catch {
				return null;
			}
		}
		/**
		 * External store over localStorage, compatible with react's
		 * useSyncExternalStore: the snapshot is cached and referentially
		 * stable until a change publishes.
		 * @returns the store face consumed by apply() and the section.
		 */
		function makeStore() {
			let state = readStored() ?? DEFAULT_CFG;
			const listeners = new Set();
			/** Publish one change to every listener. */
			const publish = () => {
				for (const listener of Array.from(listeners)) listener();
			};
			// Keep other tabs of the same browser in sync.
			try {
				window.addEventListener("storage", (event) => {
					if (event.key !== STORE_KEY) return;
					state = readStored() ?? DEFAULT_CFG;
					publish();
				});
			} catch {}
			return {
				getSnapshot: () => state,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				set: (field, value) => {
					const merged = {
						enable: field === "enable" ? value : state.enable,
						uiFont: field === "uiFont" ? value : state.uiFont,
						codeFont: field === "codeFont" ? value : state.codeFont
					};
					const next = normalize(merged);
					if (next.enable === state.enable && next.uiFont === state.uiFont && next.codeFont === state.codeFont) return;
					state = next;
					try {
						window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
					} catch {
						// Private mode or quota: the change still applies
						// live, it simply does not survive a reload.
					}
					publish();
				}
			};
		}
		//#endregion

		//#region css application
		/**
		 * Write (or clear) this package's override stylesheet. Two generations
		 * of theme base.css are supported at once:
		 * - pre-0.1.8: base.css defines --dsw-font-family / --ds-font-family-code
		 *   on :root, so overriding those on :root wins from our appended tag.
		 * - 0.1.8+: base.css moves the effective declarations to BODY, computed
		 *   from the user-font hooks --dsh-font-family-text / --dsh-font-family-code
		 *   (which the built-in Appearance settings write inline on body). A
		 *   :root override is then shadowed by body's own declaration, so we
		 *   force the hook variables on body itself: an author-stylesheet
		 *   !important outranks the inline non-important write.
		 * Every declaration carries !important, so the override holds regardless
		 * of stylesheet order or theme re-insertion.
		 * @param cfg - the effective font configuration.
		 */
		function writeCss(cfg) {
			const doc = window.document;
			if (doc.head === null) return;
			let style = doc.querySelector("style[" + STYLE_ATTR + "]");
			if (style === null) {
				style = doc.createElement("style");
				style.setAttribute(STYLE_ATTR, "");
				doc.head.appendChild(style);
			}
			if (cfg === null || cfg.enable === false) {
				style.textContent = "";
				return;
			}
			let css = "";
			const ui = String(cfg.uiFont === undefined || cfg.uiFont === null ? "" : cfg.uiFont).trim();
			if (ui !== "") {
				css += ":root{--dsw-font-family:" + ui + " !important;}";
				css += ":root,body{--dsh-font-family-text:" + ui + " !important;}";
			}
			const code = String(cfg.codeFont === undefined || cfg.codeFont === null ? "" : cfg.codeFont).trim();
			if (code !== "") {
				css += ":root{--ds-font-family-code:" + code + " !important;}";
				css += ":root,body{--dsh-font-family-code:" + code + " !important;}";
			}
			style.textContent = css;
		}
		//#endregion

		//#region settings section component
		const h = react.createElement;

		/**
		 * The font-settings card: enable switch, UI/code preset pickers with a
		 * free CSS-stack field, and a live sample. Renders inside the
		 * first-level settings section registered below.
		 * @param props - locale seat (t) plus the injected store face.
		 * @returns the card.
		 */
		function FontSettingsSection({ t, store }) {
			const snap = react.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
			const [uiDraft, setUiDraft] = react.useState(snap.uiFont);
			const [codeDraft, setCodeDraft] = react.useState(snap.codeFont);
			// Re-draft whenever the persisted value changes under us.
			const [lastUi, setLastUi] = react.useState(snap.uiFont);
			if (snap.uiFont !== lastUi) {
				setLastUi(snap.uiFont);
				setUiDraft(snap.uiFont);
			}
			const [lastCode, setLastCode] = react.useState(snap.codeFont);
			if (snap.codeFont !== lastCode) {
				setLastCode(snap.codeFont);
				setCodeDraft(snap.codeFont);
			}

			/** Commit one field write to the local store. */
			const write = (field, value) => {
				store.set(field, value);
			};
			const uiSelectValue = UI_PRESETS.some((p) => p.stack === snap.uiFont) ? snap.uiFont : CUSTOM;
			const codeSelectValue = CODE_PRESETS.some((p) => p.stack === snap.codeFont) ? snap.codeFont : CUSTOM;

			const rowStyle = {
				display: "flex",
				flexDirection: "column",
				gap: "6px",
				padding: "14px 0",
				borderTop: "1px solid color-mix(in srgb, currentColor 12%, transparent)"
			};
			const labelStyle = { fontWeight: 600, fontSize: "14px" };
			const hintStyle = { fontSize: "12px", opacity: 0.65 };
			const inputStyle = {
				width: "100%",
				boxSizing: "border-box",
				padding: "8px 10px",
				borderRadius: "8px",
				border: "1px solid color-mix(in srgb, currentColor 25%, transparent)",
				background: "color-mix(in srgb, currentColor 4%, transparent)",
				color: "inherit",
				fontFamily: "var(--ds-font-family-code, monospace)",
				fontSize: "13px"
			};
			const selectStyle = { ...inputStyle, fontFamily: "" };

			/** Commit the custom UI stack field if it changed. */
			const commitUi = () => {
				const next = uiDraft.trim();
				if (next !== "" && next !== snap.uiFont) write("uiFont", next);
				else setUiDraft(snap.uiFont);
			};
			/** Commit the custom code stack field if it changed. */
			const commitCode = () => {
				const next = codeDraft.trim();
				if (next !== snap.codeFont) write("codeFont", next);
				else setCodeDraft(snap.codeFont);
			};

			return h("div", { style: { maxWidth: "680px", display: "flex", flexDirection: "column" } },
				h("p", { style: { margin: "0 0 4px", fontSize: "13px", opacity: 0.8 } }, t("description")),
				h("label", { style: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 0", cursor: "pointer" } },
					h("input", {
						type: "checkbox",
						checked: snap.enable,
						onChange: (e) => write("enable", e.target.checked)
					}),
					h("span", { style: labelStyle }, t("enable"))
				),
				h("div", { style: rowStyle },
					h("div", { style: labelStyle }, t("uiTitle")),
					h("select", {
						style: selectStyle,
						value: uiSelectValue,
						onChange: (e) => {
							const v = e.target.value;
							if (v === CUSTOM) return;
							write("uiFont", v);
						}
					}, UI_PRESETS.map((p) => h("option", { key: p.label, value: p.stack }, p.label)),
						h("option", { value: CUSTOM }, t("custom"))),
					h("input", {
						style: inputStyle,
						value: uiDraft,
						placeholder: t("customPlaceholder"),
						onChange: (e) => setUiDraft(e.target.value),
						onBlur: commitUi,
						onKeyDown: (e) => {
							if (e.key === "Enter") commitUi();
						}
					}),
					h("div", { style: hintStyle }, t("commitHint"))
				),
				h("div", { style: rowStyle },
					h("div", { style: labelStyle }, t("codeTitle")),
					h("select", {
						style: selectStyle,
						value: codeSelectValue,
						onChange: (e) => {
							const v = e.target.value;
							if (v === CUSTOM) return;
							write("codeFont", v);
						}
					}, CODE_PRESETS.map((p) => h("option", { key: p.label, value: p.stack }, p.label)),
						h("option", { value: CUSTOM }, t("custom"))),
					h("input", {
						style: inputStyle,
						value: codeDraft,
						placeholder: t("customPlaceholder"),
						onChange: (e) => setCodeDraft(e.target.value),
						onBlur: commitCode,
						onKeyDown: (e) => {
							if (e.key === "Enter") commitCode();
						}
					}),
					h("div", { style: hintStyle }, t("codeHint"))
				),
				h("div", { style: rowStyle },
					h("div", { style: labelStyle }, t("preview")),
					h("div", {
						style: {
							fontFamily: (snap.enable ? uiDraft : DEFAULT_UI) || DEFAULT_UI,
							fontSize: "16px",
							lineHeight: 1.7,
							padding: "10px 12px",
							borderRadius: "8px",
							border: "1px dashed color-mix(in srgb, currentColor 25%, transparent)"
						}
					}, t("sampleUi")),
					h("pre", {
						style: {
							fontFamily: (snap.enable && codeDraft ? codeDraft : "var(--ds-font-family-code, monospace)"),
							fontSize: "13px",
							lineHeight: 1.6,
							margin: "8px 0 0",
							padding: "10px 12px",
							borderRadius: "8px",
							border: "1px dashed color-mix(in srgb, currentColor 25%, transparent)",
							whiteSpace: "pre-wrap"
						}
					}, t("sampleCode")),
					h("button", {
						type: "button",
						disabled: snap.uiFont === DEFAULT_UI,
						style: { alignSelf: "flex-start", marginTop: "10px" },
						onClick: () => write("uiFont", DEFAULT_UI)
					}, t("reset"))
				)
			);
		}
		//#endregion

		//#region apply
		/** Required services: slots + locale (everything else is self-contained). */
		const inject = ["slots", "locale"];

		/**
		 * Mount the font settings: keep preferences in localStorage, apply the
		 * stylesheet live, and register the settings page.
		 * @param ctx - client root context.
		 */
		function apply(ctx) {
			// Dictionaries: ja/en/zh registered independently so one clash
			// never blocks the others (the ja language is added by dsh-i18n-ja;
			// adding it again is harmless and swallowed).
			ctx.effect(() => {
				const disposers = [];
				try {
					disposers.push(ctx.locale.addLanguage({ id: "ja", label: "日本語", fallback: "en" }));
				} catch {}
				try {
					disposers.push(ctx.locale.register(NS, "ja", dictJa));
				} catch {}
				try {
					disposers.push(ctx.locale.register(NS, "en", dictEn));
				} catch {}
				try {
					disposers.push(ctx.locale.register(NS, "zh", dictZh));
				} catch {}
				return () => {
					for (const dispose of disposers) try {
						dispose();
					} catch {}
				};
			}, "dsh-font-settings: dictionaries");

			// The self-contained store, then the live stylesheet: initial paint
			// plus every change. With nothing stored the shipped Meiryo default
			// applies immediately — the whole point of the plugin is that the
			// default IS Meiryo, even on a first run on a fresh machine.
			const store = makeStore();
			ctx.effect(() => {
				writeCss(store.getSnapshot());
				const unsubscribe = store.subscribe(() => {
					writeCss(store.getSnapshot());
				});
				return () => {
					unsubscribe();
					const el = window.document.querySelector("style[" + STYLE_ATTR + "]");
					if (el !== null) el.remove();
				};
			}, "dsh-font-settings: stylesheet");

			// The settings page: a first-level section next to the other
			// plugin sections (order sits between Web UI plugins and Skin
			// Center).
			ctx.slots.inject("settings.section", () => {
				try {
					return ctx.slots.register({
						name: "settings.section",
						id: ENTRY_ID,
						order: 115,
						label: () => ctx.locale.bind(NS)("title"),
						locale: NS,
						// The renderer calls entry.inject(...) at render time
						// (runInject in dsh-client-ui-renderer) and spreads the
						// returned face into the component props — the face must
						// be a thunk, not a plain object. The result is cached
						// per entry, so a stable face is fine.
						inject: () => ({
							store
						})
					}, FontSettingsSection);
				} catch {
					return () => {};
				}
			});
		}
		//#endregion

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
