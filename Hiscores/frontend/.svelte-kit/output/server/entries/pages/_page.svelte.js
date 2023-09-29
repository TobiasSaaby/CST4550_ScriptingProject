import { c as create_ssr_component, v as validate_component, b as escape } from "../../chunks/index.js";
import "mapbox-gl";
import { u as userStore, M as Modal, D as DeployButton, a as userChallengeStore } from "../../chunks/Modal.js";
import "../../chunks/static_values.js";
const mapboxGl = "";
const ChallengeDetails_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "h2.svelte-1v5mw06.svelte-1v5mw06,h3.svelte-1v5mw06.svelte-1v5mw06,p.svelte-1v5mw06.svelte-1v5mw06{color:green}.submit-box.svelte-1v5mw06.svelte-1v5mw06{box-sizing:border-box;border-radius:10px}.submit-box.svelte-1v5mw06 .submit-form.svelte-1v5mw06{position:relative}.submit-box.svelte-1v5mw06 .submit-form input.svelte-1v5mw06{width:100%;padding:10px 0;font-size:16px;color:#fff;border:none;border-bottom:1px solid #fff;outline:none;background:transparent}.submit-box.svelte-1v5mw06 form button.svelte-1v5mw06{border:none;position:relative;display:inline-block;padding:10px 20px;color:#00dd1d;background-color:transparent;font-size:16px;text-decoration:none;text-transform:uppercase;overflow:hidden;transition:0.5s;margin-top:40px;letter-spacing:4px}.submit-box.svelte-1v5mw06 button.svelte-1v5mw06:hover{color:#00dd1d;color:#fff;border-radius:5px;box-shadow:0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,\n            0 0 100px #00dd1d}.submit-box.svelte-1v5mw06 button span.svelte-1v5mw06{position:absolute;display:block}.submit-box.svelte-1v5mw06 button span.svelte-1v5mw06:nth-child(1){top:0;left:-100%;width:100%;height:2px;background:linear-gradient(90deg, transparent, #00dd1d);animation:svelte-1v5mw06-btn-anim1 1s linear infinite}@keyframes svelte-1v5mw06-btn-anim1{0%{left:-100%}50%,100%{left:100%}}.submit-box.svelte-1v5mw06 button span.svelte-1v5mw06:nth-child(2){top:-100%;right:0;width:2px;height:100%;background:linear-gradient(180deg, transparent, #00dd1d);animation:svelte-1v5mw06-btn-anim2 1s linear infinite;animation-delay:0.25s}@keyframes svelte-1v5mw06-btn-anim2{0%{top:-100%}50%,100%{top:100%}}.submit-box.svelte-1v5mw06 button span.svelte-1v5mw06:nth-child(3){bottom:0;right:-100%;width:100%;height:2px;background:linear-gradient(270deg, transparent, #00dd1d);animation:svelte-1v5mw06-btn-anim3 1s linear infinite;animation-delay:0.5s}@keyframes svelte-1v5mw06-btn-anim3{0%{right:-100%}50%,100%{right:100%}}.submit-box.svelte-1v5mw06 button span.svelte-1v5mw06:nth-child(4){bottom:-100%;left:0;width:2px;height:100%;background:linear-gradient(360deg, transparent, #00dd1d);animation:svelte-1v5mw06-btn-anim4 1s linear infinite;animation-delay:0.75s}@keyframes svelte-1v5mw06-btn-anim4{0%{bottom:-100%}50%,100%{bottom:100%}}",
  map: null
};
const ChallengeDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal } = $$props;
  let { challenge } = $$props;
  let user = "";
  userStore.subscribe((x) => user = x);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  if ($$props.challenge === void 0 && $$bindings.challenge && challenge !== void 0)
    $$bindings.challenge(challenge);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<h2 slot="${"header"}" class="${"svelte-1v5mw06"}">${escape(challenge == null ? void 0 : challenge.description)}</h2>`;
        },
        default: () => {
          var _a, _b, _c;
          return `<p class="${"svelte-1v5mw06"}">Score: ${escape(challenge == null ? void 0 : challenge.score)}<br>
        Status: ${escape(((_a = challenge == null ? void 0 : challenge.state) == null ? void 0 : _a.status) || "Not done!")}</p>
    ${((_b = challenge == null ? void 0 : challenge.state) == null ? void 0 : _b.ip) ? `<p class="${"svelte-1v5mw06"}">PUBLIC IP: ${escape((_c = challenge == null ? void 0 : challenge.state) == null ? void 0 : _c.ip)}</p>` : ``}

    ${(challenge == null ? void 0 : challenge.type) == 2 ? `${validate_component(DeployButton, "DeployButton").$$render(
            $$result,
            { challenge },
            {
              challenge: ($$value) => {
                challenge = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : `<p class="${"svelte-1v5mw06"}">ACCESS PORT: ${escape(challenge == null ? void 0 : challenge.access)}</p>`}

${user ? `<div class="${"submit-box svelte-1v5mw06"}"><h3 class="${"svelte-1v5mw06"}">Submit flag</h3>
		<form class="${"submit-form svelte-1v5mw06"}"><input type="${"text"}" id="${"flag"}" name="${"flag"}" class="${"svelte-1v5mw06"}">
			<button type="${"submit"}" class="${"svelte-1v5mw06"}"><span class="${"svelte-1v5mw06"}"></span>
                <span class="${"svelte-1v5mw06"}"></span>
                <span class="${"svelte-1v5mw06"}"></span>
                <span class="${"svelte-1v5mw06"}"></span>
                Submit
            </button></form></div>` : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Map_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".map.svelte-oetx69{display:block;position:fixed;width:100%;height:100%;background-color:lightblue}",
  map: null
};
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let showModal = false;
  userChallengeStore.subscribe((x) => x);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div id="${"map"}" class="${"map svelte-oetx69"}"></div>

${validate_component(ChallengeDetails, "ChallengeDetails").$$render(
      $$result,
      { showModal, challenge: selected },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        },
        challenge: ($$value) => {
          selected = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-lut6ft{padding:0;margin:0}.wrapper.svelte-lut6ft{display:block;justify-content:center;align-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"wrapper svelte-lut6ft"}">${validate_component(Map, "Map").$$render($$result, {}, {}, {})}
	</div>`;
});
export {
  Page as default
};
