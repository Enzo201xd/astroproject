import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_DusQBYZe.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/[id].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/index.ts","pathname":"/api","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const l=e=>{for(;e.tagName!==\"LI\";)e=e.parentElement;return e},a=()=>{const e=document.querySelectorAll(\"input[type=checkbox]\"),c=document.querySelector('[data-selector=\"item-counter\"]');c.innerHTML=(e.length-1).toString()},s=document.querySelector('form[data-selector=\"task-form\"]'),i=document.querySelector('.hidden [data-selector=\"task-item\"]'),d=document.querySelector('[data-selector=\"task-list\"]');s.addEventListener(\"submit\",e=>{e.preventDefault();const n=new FormData(s).get(\"task\")?.toString()??\"\";if(n.length<3)return;s.reset();const r=i.cloneNode(!0),t=r.querySelector('[data-selector=\"item-content\"]');fetch(\"/api\",{method:\"POST\",body:JSON.stringify({title:n})});const o=Math.random().toString(36).substring(7);r.querySelector(\"label\")?.setAttribute(\"for\",o),r.querySelector(\"input\")?.setAttribute(\"id\",o),t.innerHTML=n,d.appendChild(r),a()});const u=document.querySelector('[data-selector=\"filters\"]');u.addEventListener(\"click\",e=>{const c=e.target;if(c.tagName!==\"BUTTON\")return;document.querySelector(\"button.active\")?.classList.remove(\"active\"),c.classList.add(\"active\");const n=c.getAttribute(\"data-selector\"),r=document.querySelectorAll('input[type=\"checkbox\"]');if(n===\"control-button-all\"){for(const t of r)l(t).classList.remove(\"hidden\");return}if(n===\"control-button-active\")for(const t of document.querySelectorAll('input[type=\"checkbox\"]')){const o=l(t);t.checked?o.classList.add(\"hidden\"):o.classList.remove(\"hidden\")}if(n===\"control-button-completed\")for(const t of document.querySelectorAll('input[type=\"checkbox\"]')){const o=l(t);t.checked?o.classList.remove(\"hidden\"):o.classList.add(\"hidden\")}});const m=document.querySelector('[data-selector=\"control-button-clear\"]');fetch(\"/api\",{method:\"PATCH\"});m.addEventListener(\"click\",()=>{for(const e of document.querySelectorAll(\"input:checked\"))l(e).remove();a()});\n"}],"styles":[{"type":"external","src":"/_astro/_id_.DxsZx4Zj.css"},{"type":"inline","content":".active[data-astro-cid-yo36rtky]{border:1px solid rgba(244,96,96,.25)}\n"}],"routeData":{"route":"/tasks","isIndex":false,"type":"page","pattern":"^\\/tasks\\/?$","segments":[[{"content":"tasks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tasks.astro","pathname":"/tasks","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelector(\".image\");e?.addEventListener(\"click\",()=>{alert(\"Click\")});\n"}],"styles":[{"type":"external","src":"/_astro/_id_.DxsZx4Zj.css"}],"routeData":{"route":"/[id]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"fetch(\"https://pokeapi.co/api/v2/pokemon\").then(t=>t.json()).then(t=>{i(t.results)});function i(t){const n=document.getElementById(\"container\");t.forEach(s=>{const e=document.createElement(\"div\");e.classList.add(\"card\",\"bg-white\",\"p-6\",\"rounded-lg\",\"shadow-md\");const a=document.createElement(\"img\");a.src=`https://pokeres.bastionbot.org/images/pokemon/${d(s.url)}.png`,a.classList.add(\"w-full\",\"mb-4\");const o=document.createElement(\"span\");o.textContent=`Nº. ${d(s.url)}`,o.classList.add(\"text-gray-600\",\"text-sm\");const c=document.createElement(\"h2\");c.textContent=s.name.charAt(0).toUpperCase()+s.name.slice(1),c.classList.add(\"text-xl\",\"font-semibold\"),e.appendChild(a),e.appendChild(o),e.appendChild(c),n.appendChild(e)})}function d(t){const n=t.split(\"/\");return n[n.length-2]}\n"}],"styles":[{"type":"external","src":"/_astro/_id_.DxsZx4Zj.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/tasks.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/[id].ts":"chunks/pages/_id__l0sNRNKZ.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_D3UbUlrZ.mjs","/src/pages/index.astro":"chunks/pages/index_BVa5khc7.mjs","/src/pages/api/index.ts":"chunks/pages/index_OBeEQQ4a.mjs","/src/pages/tasks.astro":"chunks/pages/tasks_3S_W__qi.mjs","\u0000@astrojs-manifest":"manifest_CA3nrDA0.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DdK8SHW8.mjs","\u0000@astro-page:src/pages/api/[id]@_@ts":"chunks/_id__CyAMeAcI.mjs","\u0000@astro-page:src/pages/api/index@_@ts":"chunks/index_D6MPCLDF.mjs","\u0000@astro-page:src/pages/tasks@_@astro":"chunks/tasks_BY-HTcGL.mjs","\u0000@astro-page:src/pages/[id]@_@astro":"chunks/_id__CKMHewQJ.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DpYyTC3I.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.CTpvw7I-.js","/astro/hoisted.js?q=2":"_astro/hoisted.u7MTnyp1.js","/astro/hoisted.js?q=0":"_astro/hoisted.B6Tk0f2s.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.DxsZx4Zj.css","/1.jpg","/2.jpg","/3.jpg","/favicon.svg"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
