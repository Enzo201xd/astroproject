/* empty css                         */
import { c as createComponent, r as renderTemplate, d as renderHead, e as renderSlot, f as createAstro, m as maybeRenderHead, g as addAttribute, h as renderComponent } from '../astro_DusQBYZe.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="bg-stone-300 flex flex-col items-center"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$ImageCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ImageCard;
  const id = Astro2.props.id;
  const alts = {
    1: "Primera imagen",
    2: "Segunda imagen",
    3: "Tercera imagen"
  };
  const titles = {
    1: "Golden hour",
    2: "Colores",
    3: "Paisaje"
  };
  const alt = alts[id];
  const title = titles[id];
  return renderTemplate`${maybeRenderHead()}<section class="card"> <h1 class="title">${title}</h1> <div class="image-container"> <a${addAttribute((parseInt(id, 10) - 1).toString(), "href")} class="next">&lt;</a> <img class="image"${addAttribute(`${id}.jpg`, "src")}${addAttribute(alt, "alt")}> <a${addAttribute((parseInt(id, 10) + 1).toString(), "href")} class="next">&gt;</a> </div> </section> `;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/ImageCard.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const id = Astro2.params.id ?? "1";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pagina" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ImageCard", $$ImageCard, { "id": id })} ` })}`;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/[id].astro", void 0);

const $$file = "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/[id].astro";
const $$url = "/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _id_ as _ };
