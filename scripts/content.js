import { useLBDB } from "./lbdb.js";
import { Memoria } from "./memoria.js";
import { useStore } from "./store.js";
import { useUtils } from "./utils.js";

const { loadElements } = useLBDB();
const { createElement, setDatalist, debounce } = useUtils();
const { store, setQuery, addQueryHistory, setRegexFlg } = useStore();

const main = async () => {
  const { lbdbCtrlBtns, lbdbTable } = await loadElements();

  const getMemorias = () =>
    [...lbdbTable.querySelectorAll("tr")]
      .filter((x) => !x.querySelectorAll(".sortEnabled").length)
      .map((x) => new Memoria(x));

  const apply = debounce(() => {
    getMemorias().forEach(
      (memoria) =>
        (memoria.isShow =
          !store.query ||
          (!store.regexFlg && memoria.textContent.includes(store.query)) ||
          (store.regexFlg && new RegExp(store.query).test(memoria.textContent)))
    );
    if (store.query) {
      addQueryHistory(store.query);
    }
    setDatalist(searchInput, "search-list", store.queryHistory);
  });

  const searchInput = createElement("input", {
    id: "search",
    value: store.query,
    style: {
      padding: "4px",
      marginRight: "8px",
      height: "22px",
      fontSize: "1.2rem",
    },
    on: {
      change: ({ target }) => {
        setQuery(target.value ? target.value.trim() : "");
        apply();
      },
    },
    parent: lbdbCtrlBtns,
  });

  createElement("input", {
    id: "regexFlg",
    type: "checkbox",
    checked: store.regexFlg,
    on: {
      change: ({ target }) => {
        setRegexFlg(target.checked);
        apply();
      },
    },
    parent: lbdbCtrlBtns,
  });

  createElement("label", {
    for: "regexFlg",
    text: "正規表現で検索",
    parent: lbdbCtrlBtns,
  });

  apply();
};

main();
