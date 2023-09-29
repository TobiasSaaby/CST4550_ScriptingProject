import { w as writable } from "./index2.js";
import { c as create_ssr_component, f as subscribe, g as add_attribute } from "./index.js";
import { p as page } from "./stores.js";
import "./static_values.js";
const userStore = writable("");
const userChallengeStore = writable();
const DeployButton_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".form.svelte-1uo0zfy.svelte-1uo0zfy{position:relative;padding:20px}button.svelte-1uo0zfy.svelte-1uo0zfy{border:none;position:relative;display:inline-block;padding:10px 20px;color:#00dd1d;background-color:transparent;font-size:12px;text-decoration:none;text-transform:uppercase;overflow:hidden;transition:0.5s;letter-spacing:4px}button.svelte-1uo0zfy.svelte-1uo0zfy:hover{color:#00dd1d;color:#fff;border-radius:5px;box-shadow:0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,\n			0 0 100px #00dd1d}button.svelte-1uo0zfy span.svelte-1uo0zfy{position:absolute;display:block}button.svelte-1uo0zfy span.svelte-1uo0zfy:nth-child(1){top:0;left:-100%;width:100%;height:2px;background:linear-gradient(90deg, transparent, #00dd1d);animation:svelte-1uo0zfy-btn-anim1 1s linear infinite}@keyframes svelte-1uo0zfy-btn-anim1{0%{left:-100%}50%,100%{left:100%}}button.svelte-1uo0zfy span.svelte-1uo0zfy:nth-child(2){top:-100%;right:0;width:2px;height:100%;background:linear-gradient(180deg, transparent, #00dd1d);animation:svelte-1uo0zfy-btn-anim2 1s linear infinite;animation-delay:0.25s}@keyframes svelte-1uo0zfy-btn-anim2{0%{top:-100%}50%,100%{top:100%}}button.svelte-1uo0zfy span.svelte-1uo0zfy:nth-child(3){bottom:0;right:-100%;width:100%;height:2px;background:linear-gradient(270deg, transparent, #00dd1d);animation:svelte-1uo0zfy-btn-anim3 1s linear infinite;animation-delay:0.5s}@keyframes svelte-1uo0zfy-btn-anim3{0%{right:-100%}50%,100%{right:100%}}button.svelte-1uo0zfy span.svelte-1uo0zfy:nth-child(4){bottom:-100%;left:0;width:2px;height:100%;background:linear-gradient(360deg, transparent, #00dd1d);animation:svelte-1uo0zfy-btn-anim4 1s linear infinite;animation-delay:0.75s}@keyframes svelte-1uo0zfy-btn-anim4{0%{bottom:-100%}50%,100%{bottom:100%}}",
  map: null
};
const DeployButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { challenge } = $$props;
  if ($$props.challenge === void 0 && $$bindings.challenge && challenge !== void 0)
    $$bindings.challenge(challenge);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<div class="${"form svelte-1uo0zfy"}">${!(challenge == null ? void 0 : challenge.state) || !challenge.state.instanceid ? `<button class="${"svelte-1uo0zfy"}"><span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			Initialize CTF
		</button>` : `${challenge.state.ip ? `<button class="${"svelte-1uo0zfy"}"><span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			Terminate CTF
		</button>` : `${`<button class="${"svelte-1uo0zfy"}"><span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			<span class="${"svelte-1uo0zfy"}"></span>
			Loading...
		</button>`}`}`}
</div>`;
});
const Modal_svelte_svelte_type_style_lang = "";
const css = {
  code: "dialog.svelte-u6tq7r.svelte-u6tq7r{max-width:32em;border-radius:0.2em;border:none;padding:0;background-color:rgba(0, 0, 0, 0.7);padding:40px;box-sizing:border-box;box-shadow:0 15px 25px rgba(0, 0, 0, 0.8);border-radius:10px}dialog.svelte-u6tq7r.svelte-u6tq7r::backdrop{background:rgba(0, 0, 0, 0.3)}dialog.svelte-u6tq7r>div.svelte-u6tq7r{padding:1em}dialog[open].svelte-u6tq7r.svelte-u6tq7r{animation:svelte-u6tq7r-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-u6tq7r-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-u6tq7r.svelte-u6tq7r::backdrop{animation:svelte-u6tq7r-fade 0.2s ease-out}@keyframes svelte-u6tq7r-fade{from{opacity:0}to{opacity:1}}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal } = $$props;
  let dialog;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  $$result.css.add(css);
  return `
<dialog class="${"svelte-u6tq7r"}"${add_attribute("this", dialog, 0)}><div class="${"svelte-u6tq7r"}">${slots.header ? slots.header({}) : ``}
		${slots.default ? slots.default({}) : ``}</div>
</dialog>`;
});
export {
  DeployButton as D,
  Modal as M,
  userChallengeStore as a,
  userStore as u
};
