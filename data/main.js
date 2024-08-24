function handleSetupClick() {
  document.getElementById("main").innerHTML = "";
  createSetupSection();
  createList(getNetworks, "div-table-body-stp", renderNetworksRow);
}

function handleTestClick() {
  document.getElementById("main").innerHTML = "";
  createTestSection();
  createList(getListWithValues, "div-table-body-ios", renderIOsRow);
}

function init() {
  const setupBtn = document.getElementById("setupBtn");
  const testBtn = document.getElementById("testBtn");

  setupBtn.removeEventListener("click", handleSetupClick);
  testBtn.removeEventListener("click", handleTestClick);

  setupBtn.addEventListener("click", handleSetupClick);

  testBtn.addEventListener("click", handleTestClick);

  handleSetupClick();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
