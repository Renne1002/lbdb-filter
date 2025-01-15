const createElement = (
  tagName,
  { text, style, classNames, data, on, children, parent, ...props }
) => {
  const el = document.createElement(tagName);
  text && (el.innerHTML = text);
  style && Object.entries(style).forEach(([k, v]) => (el.style[k] = v));
  classNames && classNames.forEach((x) => x && el.classList.add(x));
  data && Object.entries(data).forEach(([k, v]) => (el.dataset[k] = v));
  on && Object.entries(on).forEach(([k, v]) => el.addEventListener(k, v));
  props && Object.entries(props).forEach(([k, v]) => (el[k] = v));
  children && children.forEach((x) => el.appendChild(x));
  parent && parent.appendChild(el);
  return el;
};

let temp = "";
const setDatalist = (el, id, values) => {
  document.getElementById(id)?.remove();
  const datalist = createElement("datalist", {
    id,
    children: values.map((value) => createElement("option", { value })),
  });

  if (!el.dataset.hasDatalist) {
    el.addEventListener("mousedown", () => {
      temp = el.value;
      el.value = "";
    });
    el.addEventListener("click", () => {
      if (temp !== "") {
        el.value = temp;
      }
    });
  }

  el.dataset.hasDatalist = true;
  el.setAttribute("list", id);
  el.setAttribute("autocomplete", "off");
  el.after(datalist);
};

const debounce = (fn, delay = 250) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
};

export const useUtils = () => ({
  createElement,
  setDatalist,
  debounce,
});
