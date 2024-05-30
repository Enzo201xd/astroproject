/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, e as renderSlot, f as createAstro, h as renderComponent } from '../astro_DusQBYZe.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */
import { $ as $$Layout } from './_id__BG0Sp4F1.mjs';

const $$Astro = createAstro();
const $$ControlButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ControlButton;
  const { active, selector } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`control-button-${selector}`, "data-selector")}${addAttribute(`text-stone-600 p-2 px-4 rounded-sm duration-200 hover:font-bold ${active ? "active" : ""}`, "class")} data-astro-cid-yo36rtky> ${renderSlot($$result, $$slots["default"])} </button> `;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/tasks/ControlButton.astro", void 0);

const $$Filters = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div data-selector="filters"> ${renderComponent($$result, "ControlButton", $$ControlButton, { "selector": "all", "active": true }, { "default": ($$result2) => renderTemplate`All` })} ${renderComponent($$result, "ControlButton", $$ControlButton, { "selector": "active" }, { "default": ($$result2) => renderTemplate`Active` })} ${renderComponent($$result, "ControlButton", $$ControlButton, { "selector": "completed" }, { "default": ($$result2) => renderTemplate`Completed` })} </div> `;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/tasks/Filters.astro", void 0);

const $$TaskItem = createComponent(($$result, $$props, $$slots) => {
  const randomId = Math.random().toString(36).substring(7);
  return renderTemplate`${maybeRenderHead()}<li data-selector="task-item" class="w-full relative border-t border-stone-500/25"> <label${addAttribute(randomId, "for")} class="flex items-center w-full h-20 text-4xl px-4 py-2 select-none cursor-pointer duration-200 hover:translate-x-2"> <input${addAttribute(randomId, "id")} type="checkbox" class="absolute peer h-0 w-0"> <span class="hidden peer-checked:block absolute z-10 left-6 text-green-700 text-2xl font-light">✔</span> <span class="relative mr-4 font-extralight text-stone-300">◯</span> <div class="peer-checked:line-through peer-checked:opacity-40" data-selector="item-content"> ${renderSlot($$result, $$slots["default"])} </div> </label> </li>`;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/tasks/TaskItem.astro", void 0);

const $$ClearCompletedButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button data-selector="control-button-clear" class="underline text-stone-400 decoration-stone-400/25">Clear Completed</button> `;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/tasks/ClearCompletedButton.astro", void 0);

const $$TaskBoard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="w-half bg-white flex flex-col border border-stone-300 shadow-lg"> <form data-selector="task-form" class="flex items-center h-20 text-stone-400"> <span class="block w-24 text-center text-2xl scale-x-[3] cursor-default">v</span> <input type="text" name="task" class="flex-grow h-20 z-10 text-4xl px-4" placeholder="What needs to be done?"> </form> <ul data-selector="task-list"> ${renderComponent($$result, "TaskItem", $$TaskItem, {}, { "default": ($$result2) => renderTemplate`Go Shopping` })} </ul> <div class="flex justify-between items-center p-2 border-t border-stone-500/25"> <div><span data-selector="item-counter">1</span> items left</div> ${renderComponent($$result, "Filters", $$Filters, {})} ${renderComponent($$result, "ClearCompletedButton", $$ClearCompletedButton, {})} </div> </section> <div class="hidden"> ${renderComponent($$result, "TaskItem", $$TaskItem, {})} </div> `;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/components/tasks/TaskBoard.astro", void 0);

const $$Tasks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tasks" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-bold text-7xl text-red-400/30 my-6">todos</h1> ${renderComponent($$result2, "TaskBoard", $$TaskBoard, {})} ` })}`;
}, "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/tasks.astro", void 0);

const $$file = "C:/Users/UD/Desktop/prog3/pokedex gral/astroproject/src/pages/tasks.astro";
const $$url = "/tasks";

export { $$Tasks as default, $$file as file, $$url as url };
