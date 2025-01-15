export class Memoria {
  #el;

  constructor(el) {
    this.#el = el;
  }

  get textContent() {
    return this.#el.textContent;
  }

  get name() {
    return this.#el.querySelector(".colName").textContent;
  }

  get url() {
    return this.#el.querySelector(".colIcon a").getAttribute("href");
  }

  get cardType() {
    return this.#el.querySelector(".colCardType").textContent;
  }

  get isShow() {
    return this.#el.style.display !== "none";
  }

  set isShow(dest) {
    this.#el.style.display = dest ? "table-row" : "none";
  }
}
