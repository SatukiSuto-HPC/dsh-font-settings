window.__ModuleLoader__.load({
	id: "dsh-font-settings",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");

		//#region constants
		/** Profile entry row this bundle's patch inserts (cordis.patch.yml). */
		const ENTRY_ID = "font-settings";
		/** Locale namespace owned by this plugin. */
		const NS = "fontSettings";
		/** Attribute marking this package's injected <style> element. */
		const STYLE_ATTR = "data-dsh-font-settings";
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
			{ stack: "Meiryo", label: "メイリオ（Meiryo）" },
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
			"description": "GUI の表示フォントを変更します。既定はメイリオで、日本語の字形がそのまま表示されます。変更は即座に反映され、設定として保存されます。",
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
			"loading": "設定を読み込んでいます…",
			"unavailable": "設定サーバーに接続できません。ページを更新するか、DSH を再起動してください。",
			"readOnly": "この設定は現在読み取り専用です。",
			"reset": "メイリオに戻す"
		};
		const dictEn = {
			"title": "Fonts",
			"description": "Change the GUI display fonts. The default is Meiryo so Japanese glyph shapes render natively. Changes apply instantly and are saved.",
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
			"loading": "Loading settings…",
			"unavailable": "Cannot reach the settings server. Refresh the page or restart DSH.",
			"readOnly": "This setting is currently read-only.",
			"reset": "Back to Meiryo"
		};
		const dictZh = {
			"title": "字体",
			"description": "更改 GUI 显示字体。默认使用 Meiryo（冬青黑体），日文按日本字形显示。修改即时生效并会保存。",
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
			"loading": "正在读取设置…",
			"unavailable": "无法连接设置服务，请刷新页面或重启 DSH。",
			"readOnly": "当前设置为只读。",
			"reset": "恢复 Meiryo"
		};
		//#endregion

		//#region css application
		/**
		 * Write (or clear) this package's override stylesheet. The theme
		 * base.css defines --dsw-font-family on :root; our tag is appended
		 * after it and every declaration carries !important, so the override
		 * holds regardless of stylesheet order or theme re-insertion.
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
			if (ui !== "") css += ":root{--dsw-font-family:" + ui + " !important;}";
			const code = String(cfg.codeFont === undefined || cfg.codeFont === null ? "" : cfg.codeFont).trim();
			if (code !== "") css += ":root{--ds-font-family-code:" + code + " !important;}";
			style.textContent = css;
		}
		//#endregion

		//#region form helpers
		/**
		 * Normalize one form snapshot into the effective configuration.
		 * @param snapshot - a ConfigForm snapshot (any status).
		 * @returns the effective { enable, uiFont, codeFont }.
		 */
		function effectiveOf(snapshot) {
			const v = snapshot && typeof snapshot.value === "object" && snapshot.value !== null ? snapshot.value : {};
			return {
				enable: v.enable !== false,
				uiFont: typeof v.uiFont === "string" && v.uiFont.trim() !== "" ? v.uiFont : DEFAULT_UI,
				codeFont: typeof v.codeFont === "string" ? v.codeFont : ""
			};
		}
		/** Snapshot stub for a form the Host does not (yet) serve. */
		const UNAVAILABLE_SNAPSHOT = {
			status: "unavailable",
			value: undefined,
			base: undefined,
			user: undefined,
			revision: 0,
			writable: false,
			mode: "entry"
		};
		/** Subscribe stub for the unavailable form. */
		function noSubscribe(_listener) {
			return () => {};
		}
		/**
		 * Deferred binding of this entry's config form. The shared forms
		 * service only learns which entries are served through its describe()
		 * mirror, which may be unready at mount; get() can throw until then.
		 * This wrapper keeps a stable ConfigForm face, re-binds whenever the
		 * mirror answers, and never re-enters itself (the guard mirrors the
		 * skin-center pattern; an unbound form publishing would stack-overflow
		 * a listener that reads the snapshot during bind).
		 * @param forms - the shared ctx.configForms service.
		 * @param entryId - the profile entry row this bundle inserts.
		 * @returns a ConfigForm delegating to the entry's form once bound.
		 */
		function makeDeferredForm(forms, entryId) {
			const listeners = new Set();
			let bound;
			let boundId;
			let offBound;
			let mirrorSubscribed = false;
			let binding = false;
			/** Whether the describe() mirror currently lists our entry. */
			const served = () => {
				try {
					const view = forms.describe().getSnapshot().view;
					return !!view && Array.isArray(view.namespaces) && view.namespaces.some((v) => v.ns === entryId);
				} catch {
					return false;
				}
			};
			/** Publish one change to every wrapper listener. */
			const publish = () => {
				for (const listener of [...listeners]) listener();
			};
			/** (Re-)resolve the underlying form from the mirror. */
			const bind = () => {
				if (binding) return;
				binding = true;
				try {
					ensureMirror();
					if (!served()) {
						const hadBinding = bound !== undefined;
						boundId = undefined;
						bound = undefined;
						if (hadBinding) publish();
						return;
					}
					if (boundId === entryId && bound !== undefined) return;
					if (offBound !== undefined) {
						offBound();
						offBound = undefined;
					}
					let form;
					try {
						form = forms.get(entryId);
					} catch {
						const hadBinding = bound !== undefined;
						boundId = undefined;
						bound = undefined;
						if (hadBinding) publish();
						return;
					}
					boundId = entryId;
					bound = form;
					offBound = bound.subscribe(() => {
						publish();
					});
					publish();
				} finally {
					binding = false;
				}
			};
			/** Subscribe to the mirror once and kick its first answer. */
			const ensureMirror = () => {
				if (mirrorSubscribed) return;
				try {
					const describeFace = forms.describe();
					if (describeFace !== null && typeof describeFace.subscribe === "function") {
						describeFace.subscribe(() => {
							bind();
						});
						mirrorSubscribed = true;
					}
					if (describeFace !== null && typeof describeFace.ensure === "function") void describeFace.ensure();
				} catch {}
			};
			bind();
			return {
				getSnapshot: () => {
					if (bound === undefined) bind();
					return bound !== undefined ? bound.getSnapshot() : UNAVAILABLE_SNAPSHOT;
				},
				subscribe: (listener) => {
					ensureMirror();
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				set: (field, value) => {
					if (bound === undefined) bind();
					return bound !== undefined ? bound.set(field, value) : Promise.resolve(false);
				},
				unset: (field) => {
					if (bound === undefined) bind();
					return bound !== undefined ? bound.unset(field) : Promise.resolve(false);
				},
				mutate: (ops, expectedRevision) => {
					if (bound === undefined) bind();
					return bound !== undefined ? bound.mutate(ops, expectedRevision) : Promise.resolve(false);
				}
			};
		}
		//#endregion

		//#region settings section component
		const h = react.createElement;

		/**
		 * The font-settings card: enable switch, UI/code preset pickers with a
		 * free CSS-stack field, and a live sample. Renders inside the
		 * first-level settings section registered below.
		 * @param props - locale seat (t) plus the injected face.
		 * @returns the card.
		 */
		function FontSettingsSection({ t, form, defaults }) {
			const subscribe = form !== null ? form.subscribe : noSubscribe;
			const getSnapshot = form !== null ? form.getSnapshot : () => UNAVAILABLE_SNAPSHOT;
			const snap = react.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
			const eff = effectiveOf(snap);
			const [uiDraft, setUiDraft] = react.useState(eff.uiFont);
			const [codeDraft, setCodeDraft] = react.useState(eff.codeFont);
			// Re-draft whenever the persisted value changes under us.
			const [lastUi, setLastUi] = react.useState(eff.uiFont);
			if (eff.uiFont !== lastUi) {
				setLastUi(eff.uiFont);
				setUiDraft(eff.uiFont);
			}
			const [lastCode, setLastCode] = react.useState(eff.codeFont);
			if (eff.codeFont !== lastCode) {
				setLastCode(eff.codeFont);
				setCodeDraft(eff.codeFont);
			}
			const ready = snap.status === "ready";
			const writable = ready && snap.writable !== false;

			/** Commit one field write, swallowing transport errors. */
			const write = (field, value) => {
				if (form === null || !writable) return;
				Promise.resolve(form.set(field, value)).catch(() => {});
			};
			const uiSelectValue = UI_PRESETS.some((p) => p.stack === eff.uiFont) ? eff.uiFont : CUSTOM;
			const codeSelectValue = CODE_PRESETS.some((p) => p.stack === eff.codeFont) ? eff.codeFont : CUSTOM;

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
				if (next !== "" && next !== eff.uiFont) write("uiFont", next);
				else setUiDraft(eff.uiFont);
			};
			/** Commit the custom code stack field if it changed. */
			const commitCode = () => {
				const next = codeDraft.trim();
				if (next !== eff.codeFont) write("codeFont", next);
				else setCodeDraft(eff.codeFont);
			};

			return h("div", { style: { maxWidth: "680px", display: "flex", flexDirection: "column" } },
				h("p", { style: { margin: "0 0 4px", fontSize: "13px", opacity: 0.8 } }, t("description")),
				!ready ? h("p", { style: { margin: "8px 0", fontSize: "13px", opacity: 0.7 } }, snap.status === "loading" ? t("loading") : t("unavailable")) : null,
				ready && !writable ? h("p", { style: { margin: "4px 0", fontSize: "12px", opacity: 0.7 } }, t("readOnly")) : null,
				h("label", { style: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 0", cursor: writable ? "pointer" : "default" } },
					h("input", {
						type: "checkbox",
						checked: eff.enable,
						disabled: !writable,
						onChange: (e) => write("enable", e.target.checked)
					}),
					h("span", { style: labelStyle }, t("enable"))
				),
				h("div", { style: rowStyle },
					h("div", { style: labelStyle }, t("uiTitle")),
					h("select", {
						style: selectStyle,
						value: uiSelectValue,
						disabled: !writable,
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
						disabled: !writable,
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
						disabled: !writable,
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
						disabled: !writable,
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
							fontFamily: (eff.enable ? uiDraft : DEFAULT_UI) || DEFAULT_UI,
							fontSize: "16px",
							lineHeight: 1.7,
							padding: "10px 12px",
							borderRadius: "8px",
							border: "1px dashed color-mix(in srgb, currentColor 25%, transparent)"
						}
					}, t("sampleUi")),
					h("pre", {
						style: {
							fontFamily: (eff.enable && codeDraft ? codeDraft : "var(--ds-font-family-code, monospace)"),
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
						disabled: !writable || eff.uiFont === "Meiryo",
						style: { alignSelf: "flex-start", marginTop: "10px" },
						onClick: () => write("uiFont", "Meiryo")
					}, t("reset"))
				)
			);
		}
		//#endregion

		//#region apply
		/** Required services: slots + locale + configForms. */
		const inject = ["slots", "locale", "configForms"];

		/**
		 * Mount the font settings: bind this entry's config form, apply the
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

			// Resolve this entry's configuration form through the deferred
			// binder: the describe() mirror decides when the row is served,
			// and get() may throw until then (skin-center pattern).
			let form = null;
			try {
				form = makeDeferredForm(ctx.configForms, ENTRY_ID);
			} catch {
				form = null;
			}

			// Live stylesheet: initial paint plus every form change. When the
			// form cannot be reached at all, still ship the Meiryo default —
			// the whole point of the plugin is that the default IS Meiryo.
			ctx.effect(() => {
				if (form !== null) {
					writeCss(effectiveOf(form.getSnapshot()));
					const unsubscribe = form.subscribe(() => {
						writeCss(effectiveOf(form.getSnapshot()));
					});
					return () => {
						unsubscribe();
						const el = window.document.querySelector("style[" + STYLE_ATTR + "]");
						if (el !== null) el.remove();
					};
				}
				writeCss({ enable: true, uiFont: DEFAULT_UI, codeFont: "" });
				return () => {
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
							form,
							defaults: { uiFont: DEFAULT_UI, codeFont: "" }
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
