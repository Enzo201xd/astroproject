/* empty css                         */
import { c as createComponent, r as renderTemplate, d as renderHead, h as renderComponent } from '../astro_DusQBYZe.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './_id__BG0Sp4F1.mjs';
import 'clsx';

const $$Pokedex = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Pokedex</title>${renderHead()}</head> <body class="bg-white font-serif"> <div class="bg-red-700 px-5 py-4 fixed top-0 w-full text-white"> <h1 class="text-2xl font-bold">Pokedex</h1> </div> <div id="container" class="max-w-screen-lg mx-auto mt-20"></div>  </body> </html>`;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/tasks/Pokedex.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Pokedex", $$Pokedex, {})} ` })}`;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/index.astro", void 0);

const $$file = "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
