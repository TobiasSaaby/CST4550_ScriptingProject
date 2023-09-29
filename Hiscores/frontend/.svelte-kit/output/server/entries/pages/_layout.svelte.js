import { c as create_ssr_component, v as validate_component, e as each, b as escape, d as null_to_empty } from "../../chunks/index.js";
import { u as userStore, a as userChallengeStore, M as Modal, D as DeployButton } from "../../chunks/Modal.js";
import { w as writable } from "../../chunks/index2.js";
import "../../chunks/static_values.js";
const ChallengesList_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".wrapper.svelte-1w547o9.svelte-1w547o9{text-align:center}h1.svelte-1w547o9.svelte-1w547o9{color:#00ff00}table.svelte-1w547o9.svelte-1w547o9{border-collapse:collapse;width:100%;background-color:#111;color:#00ff00}th.svelte-1w547o9.svelte-1w547o9,td.svelte-1w547o9.svelte-1w547o9{text-align:center}th.svelte-1w547o9.svelte-1w547o9{background-color:#000}th.svelte-1w547o9.svelte-1w547o9,td.svelte-1w547o9.svelte-1w547o9{border-bottom:1px solid #00ff00}tbody.svelte-1w547o9 tr.svelte-1w547o9:nth-child(even){background-color:#222}tbody.svelte-1w547o9 tr.svelte-1w547o9:nth-child(odd){background-color:#111}",
  map: null
};
const ChallengesList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal = false } = $$props;
  let user;
  let challengeTableData;
  userStore.subscribe((x) => user = x);
  userChallengeStore.subscribe((x) => challengeTableData = x);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  $$result.css.add(css$4);
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
        default: () => {
          return `<div class="${"wrapper svelte-1w547o9"}"><h1 class="${"svelte-1w547o9"}">Flag details</h1>
	<br></div>
<div class="${"wrapper svelte-1w547o9"}"><table class="${"svelte-1w547o9"}"><thead><tr><th class="${"svelte-1w547o9"}">Description</th>
				<th class="${"svelte-1w547o9"}">Access</th>
				<th class="${"svelte-1w547o9"}">Score</th>
				${user ? `<th class="${"svelte-1w547o9"}">Status</th>` : ``}
			</tr><tr></tr></thead>
		<tbody class="${"svelte-1w547o9"}">${each(challengeTableData, (challenge) => {
            var _a;
            return `<tr class="${"svelte-1w547o9"}"><td class="${"svelte-1w547o9"}">${escape(challenge.description)}</td>
					${challenge.hosted ? `<td class="${"svelte-1w547o9"}">${validate_component(DeployButton, "DeployButton").$$render(
              $$result,
              { challenge },
              {
                challenge: ($$value) => {
                  challenge = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</td>` : `<td class="${"svelte-1w547o9"}">${escape(challenge.access)}</td>`}
					<td class="${"svelte-1w547o9"}">${escape(challenge.score)}</td>
					${user ? `<td class="${"svelte-1w547o9"}">Status: ${escape(((_a = challenge.state) == null ? void 0 : _a.status) || "Not done!")}</td>` : ``}
				</tr>`;
          })}</tbody></table></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const userTableStore = writable();
const Hiscore_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "h1.svelte-7smm5u,tr.svelte-7smm5u{color:#01b118d0}",
  map: null
};
const Hiscore = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal = false } = $$props;
  let user;
  let userTableData;
  userStore.subscribe((x) => user = x);
  userTableStore.subscribe((x) => userTableData = x);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  $$result.css.add(css$3);
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
        default: () => {
          return `<div class="${"wrapper"}"><h1 class="${"svelte-7smm5u"}">Hiscore</h1>
	<br></div>
<div class="${"wrapper"}"><table><thead><tr class="${"svelte-7smm5u"}"><th>Username</th>
				<th>Score</th>
				<th>Flags</th></tr></thead>
		<tbody>${each(Object.keys(userTableData), (userData) => {
            return `<tr class="${escape(
              null_to_empty(user && userTableData[Number(userData)].username == user ? "player" : ""),
              true
            ) + " svelte-7smm5u"}"><td>${escape(userTableData[Number(userData)].username)}</td>
					<td>${escape(userTableData[Number(userData)].flags.reduce((pSum, x) => pSum + x.score, 0))}</td>
					<td>${escape(userTableData[Number(userData)].flags.length)}</td>
				</tr>`;
          })}</tbody></table></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Login_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".login-box.svelte-m00vk6.svelte-m00vk6.svelte-m00vk6{box-sizing:border-box;border-radius:10px}.login-box.svelte-m00vk6 h2.svelte-m00vk6.svelte-m00vk6{margin:0 0 30px;padding:0;color:#fff;text-align:center}.login-box.svelte-m00vk6 .user-box.svelte-m00vk6.svelte-m00vk6{position:relative}.login-box.svelte-m00vk6 .user-box input.svelte-m00vk6.svelte-m00vk6{width:100%;padding:10px 0;font-size:16px;color:#fff;margin-bottom:30px;border:none;border-bottom:1px solid #fff;outline:none;background:transparent}.login-box.svelte-m00vk6 .user-box label.svelte-m00vk6.svelte-m00vk6{position:absolute;top:0;left:0;padding:10px 0;font-size:16px;color:#fff;pointer-events:none;transition:0.5s}.login-box.svelte-m00vk6 .user-box input.svelte-m00vk6:focus~label.svelte-m00vk6,.login-box.svelte-m00vk6 .user-box input.svelte-m00vk6:valid~label.svelte-m00vk6{top:-20px;left:0;color:#00dd1d;font-size:12px}.login-box.svelte-m00vk6 form button.svelte-m00vk6.svelte-m00vk6{border:none;position:relative;display:inline-block;padding:10px 20px;color:#00dd1d;background-color:transparent;font-size:16px;text-decoration:none;text-transform:uppercase;overflow:hidden;transition:0.5s;margin-top:40px;letter-spacing:4px}.login-box.svelte-m00vk6 button.svelte-m00vk6.svelte-m00vk6:hover{color:#00dd1d;color:#fff;border-radius:5px;box-shadow:0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,\n            0 0 100px #00dd1d}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6{position:absolute;display:block}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(1){top:0;left:-100%;width:100%;height:2px;background:linear-gradient(90deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim1 1s linear infinite}@keyframes svelte-m00vk6-btn-anim1{0%{left:-100%}50%,100%{left:100%}}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(2){top:-100%;right:0;width:2px;height:100%;background:linear-gradient(180deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim2 1s linear infinite;animation-delay:0.25s}@keyframes svelte-m00vk6-btn-anim2{0%{top:-100%}50%,100%{top:100%}}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(3){bottom:0;right:-100%;width:100%;height:2px;background:linear-gradient(270deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim3 1s linear infinite;animation-delay:0.5s}@keyframes svelte-m00vk6-btn-anim3{0%{right:-100%}50%,100%{right:100%}}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(4){bottom:-100%;left:0;width:2px;height:100%;background:linear-gradient(360deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim4 1s linear infinite;animation-delay:0.75s}@keyframes svelte-m00vk6-btn-anim4{0%{bottom:-100%}50%,100%{bottom:100%}}",
  map: null
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal = false } = $$props;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
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
        default: () => {
          return `<div class="${"login-box svelte-m00vk6"}"><h2 class="${"svelte-m00vk6"}">Login</h2>
        <form id="${"loginForm"}"><div class="${"user-box svelte-m00vk6"}"><input id="${"username"}" type="${"text"}" name="${"username"}" class="${"svelte-m00vk6"}">
                <label for="${"username"}" class="${"svelte-m00vk6"}">Username</label></div>
            <div class="${"user-box svelte-m00vk6"}"><input id="${"password"}" type="${"password"}" name="${"password"}" class="${"svelte-m00vk6"}">
                <label for="${"password"}" class="${"svelte-m00vk6"}">Password</label></div>
            
            
            <button type="${"submit"}" class="${"svelte-m00vk6"}"><span class="${"svelte-m00vk6"}"></span>
                <span class="${"svelte-m00vk6"}"></span>
                <span class="${"svelte-m00vk6"}"></span>
                <span class="${"svelte-m00vk6"}"></span>
                Submit
            </button></form></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Register_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".login-box.svelte-m00vk6.svelte-m00vk6.svelte-m00vk6{box-sizing:border-box;border-radius:10px}.login-box.svelte-m00vk6 h2.svelte-m00vk6.svelte-m00vk6{margin:0 0 30px;padding:0;color:#fff;text-align:center}.login-box.svelte-m00vk6 .user-box.svelte-m00vk6.svelte-m00vk6{position:relative}.login-box.svelte-m00vk6 .user-box input.svelte-m00vk6.svelte-m00vk6{width:100%;padding:10px 0;font-size:16px;color:#fff;margin-bottom:30px;border:none;border-bottom:1px solid #fff;outline:none;background:transparent}.login-box.svelte-m00vk6 .user-box label.svelte-m00vk6.svelte-m00vk6{position:absolute;top:0;left:0;padding:10px 0;font-size:16px;color:#fff;pointer-events:none;transition:0.5s}.login-box.svelte-m00vk6 .user-box input.svelte-m00vk6:focus~label.svelte-m00vk6,.login-box.svelte-m00vk6 .user-box input.svelte-m00vk6:valid~label.svelte-m00vk6{top:-20px;left:0;color:#00dd1d;font-size:12px}.login-box.svelte-m00vk6 form button.svelte-m00vk6.svelte-m00vk6{border:none;position:relative;display:inline-block;padding:10px 20px;color:#00dd1d;background-color:transparent;font-size:16px;text-decoration:none;text-transform:uppercase;overflow:hidden;transition:0.5s;margin-top:40px;letter-spacing:4px}.login-box.svelte-m00vk6 button.svelte-m00vk6.svelte-m00vk6:hover{color:#00dd1d;color:#fff;border-radius:5px;box-shadow:0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,\n            0 0 100px #00dd1d}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6{position:absolute;display:block}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(1){top:0;left:-100%;width:100%;height:2px;background:linear-gradient(90deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim1 1s linear infinite}@keyframes svelte-m00vk6-btn-anim1{0%{left:-100%}50%,100%{left:100%}}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(2){top:-100%;right:0;width:2px;height:100%;background:linear-gradient(180deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim2 1s linear infinite;animation-delay:0.25s}@keyframes svelte-m00vk6-btn-anim2{0%{top:-100%}50%,100%{top:100%}}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(3){bottom:0;right:-100%;width:100%;height:2px;background:linear-gradient(270deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim3 1s linear infinite;animation-delay:0.5s}@keyframes svelte-m00vk6-btn-anim3{0%{right:-100%}50%,100%{right:100%}}.login-box.svelte-m00vk6 button span.svelte-m00vk6.svelte-m00vk6:nth-child(4){bottom:-100%;left:0;width:2px;height:100%;background:linear-gradient(360deg, transparent, #00dd1d);animation:svelte-m00vk6-btn-anim4 1s linear infinite;animation-delay:0.75s}@keyframes svelte-m00vk6-btn-anim4{0%{bottom:-100%}50%,100%{bottom:100%}}",
  map: null
};
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal = false } = $$props;
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  $$result.css.add(css$1);
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
        default: () => {
          return `<div class="${"login-box svelte-m00vk6"}"><h2 class="${"svelte-m00vk6"}">Login</h2>
        <form id="${"loginForm"}"><div class="${"user-box svelte-m00vk6"}"><input id="${"username"}" type="${"text"}" name="${"username"}" class="${"svelte-m00vk6"}">
                <label for="${"username"}" class="${"svelte-m00vk6"}">Username</label></div>
            <div class="${"user-box svelte-m00vk6"}"><input id="${"password"}" type="${"password"}" name="${"password"}" class="${"svelte-m00vk6"}">
                <label for="${"password"}" class="${"svelte-m00vk6"}">Password</label></div>
            <div class="${"user-box svelte-m00vk6"}"><input id="${"repPassword"}" type="${"password"}" name="${"repPassword"}" class="${"svelte-m00vk6"}">
                <label for="${"repPassword"}" class="${"svelte-m00vk6"}">Repeat Password</label></div>
            
            
            <button type="${"submit"}" class="${"svelte-m00vk6"}"><span class="${"svelte-m00vk6"}"></span>
                <span class="${"svelte-m00vk6"}"></span>
                <span class="${"svelte-m00vk6"}"></span>
                <span class="${"svelte-m00vk6"}"></span>
                Submit
            </button></form></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Nav_svelte_svelte_type_style_lang = "";
const css = {
  code: '@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");.svelte-381m61.svelte-381m61{box-sizing:border-box;margin:0;padding:0}header.svelte-381m61.svelte-381m61{position:fixed;top:0;left:0;width:100%;padding:1rem 5%;display:flex;justify-content:space-between;align-items:center;z-index:5}.nav-item.svelte-381m61.svelte-381m61{position:relative;color:#fff;font-size:1rem;font-weight:500;line-height:25px;letter-spacing:-0.13px;text-decoration:none;margin-left:2.5rem;transition:all 0.5s ease}.nav-item.svelte-381m61.svelte-381m61:hover{color:rgba(0, 185, 46, 0.9)}.nav-item.svelte-381m61.svelte-381m61::after{content:"";position:absolute;bottom:-0.3rem;left:50%;width:0;height:0.15rem;transform:translateX(-50%);background-color:rgba(0, 185, 46, 0.9);transition:all 0.5s ease}.nav-item.svelte-381m61.svelte-381m61:hover::after{width:100%}@keyframes svelte-381m61-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@media(max-width: 900px){header.svelte-381m61.svelte-381m61{padding:1.3rem 5%}}@media(max-width: 700px){header.svelte-381m61.svelte-381m61::before{content:"";top:0;left:0;position:absolute;width:100%;height:100%;background:rgba(0, 0, 0, 0.1);backdrop-filter:blur(50px);z-index:-1}header.svelte-381m61.svelte-381m61::after{content:"";top:0;left:-100%;position:absolute;width:100%;height:100%;background:linear-gradient(\n        90deg,\n        transparent,\n        rgba(255, 255, 255, 0.4),\n        transparent\n      );transition:0.8s}.navbar.svelte-381m61.svelte-381m61{position:absolute;top:100%;left:0;width:100%;height:0;background:rgba(0, 0, 0, 0.1);backdrop-filter:blur(50px);box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.1);overflow:hidden;transition:all 0.3s ease}.nav-item.svelte-381m61.svelte-381m61{display:block;font-size:1.1rem;margin:2rem 0;text-align:center;transform:translateY(-50px);opacity:0;transition:all 0.3s ease}.nav-item.svelte-381m61.svelte-381m61:hover::after{width:auto}#check:checked~.navbar.svelte-381m61 a.svelte-381m61{transform:translateY(0);opacity:1;transition-delay:calc(0.15s * var(--i))}}',
  map: null
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let u;
  let showChallengesModal = false;
  let showHiscoresModal = false;
  let showLoginModal = false;
  let showRegisterModal = false;
  userStore.subscribe((x) => u = x);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<link rel="${"stylesheet"}" href="${"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"}" class="${"svelte-381m61"}">
<header class="${"svelte-381m61"}">
  
  ${u ? `<a class="${"svelte-381m61"}"><img src="${"https://github.com/ecemgo/today-i-learned-app/assets/13468728/4f2923ea-9eca-4221-8b18-7198f78fd04e"}" alt="${"logo"}" class="${"logo svelte-381m61"}"></a>` : `<a class="${"svelte-381m61"}"></a>`}
  <nav class="${"navbar svelte-381m61"}"><a class="${"nav-item svelte-381m61"}" style="${"--i: 0"}">Challenges</a>
    <a class="${"nav-item svelte-381m61"}" style="${"--i: 0"}">Hiscores</a>
    ${!u ? `<a class="${"nav-item svelte-381m61"}" style="${"--i: 0"}">Register</a>
      <a class="${"nav-item svelte-381m61"}" style="${"--i: 0"}">Login</a>` : `<a class="${"nav-item svelte-381m61"}" style="${"--i: 0"}">Logout</a>`}</nav></header>

${validate_component(ChallengesList, "Challenges").$$render(
      $$result,
      { showModal: showChallengesModal },
      {
        showModal: ($$value) => {
          showChallengesModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Hiscore, "Hiscore").$$render(
      $$result,
      { showModal: showHiscoresModal },
      {
        showModal: ($$value) => {
          showHiscoresModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Login, "Login").$$render(
      $$result,
      { showModal: showLoginModal },
      {
        showModal: ($$value) => {
          showLoginModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Register, "Register").$$render(
      $$result,
      { showModal: showRegisterModal },
      {
        showModal: ($$value) => {
          showRegisterModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { user, userTableData, challengeTableData } = data;
  userTableData = userTableData.sort((x, y) => y.flags.reduce((ySum, yVal) => yVal.score, 0) - x.flags.reduce((xSum, xVal) => xVal.score, 0));
  userStore.set(user);
  userTableStore.set(userTableData);
  userChallengeStore.set(challengeTableData);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}

<main>${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
