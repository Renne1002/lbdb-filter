const INIT_INTERVAL = 200;
const INIT_TIMEOUT_MSEC = 10000;

const loadElements = () =>
  new Promise((resolve, reject) => {
    const startDate = Date.now();
    const id = setInterval(() => {
      if (Date.now() - startDate >= INIT_TIMEOUT_MSEC) {
        clearInterval(id);
        reject("timeout");
      }

      const lbdbCtrlBtns = document.querySelector(".ctrlbtns");
      const lbdbTable = document.querySelectorAll("table.jss10").item(1);
      if (!(lbdbCtrlBtns && lbdbTable)) return;

      clearInterval(id);
      resolve({ lbdbCtrlBtns, lbdbTable });
    }, INIT_INTERVAL);
  });

export const useLBDB = () => ({
  loadElements,
});
