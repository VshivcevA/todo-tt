import { todoMocks } from "./mocks";

const list = document.querySelector(".todo__list");
const item = document
  .querySelector("#template")
  .content.querySelector(".todo__item");

function getCheckbox(template) {
  const content = template.querySelector(".todo__content");
  const checkbox = template.querySelector(".todo__checkbox");
  if (checkbox.checked) {
    content.classList.add("todo__content--checked");
  }
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      content.classList.add("todo__content--checked");
    } else {
      content.classList.remove("todo__content--checked");
    }
  });
}

todoMocks.forEach((i) => {
  const template = item.cloneNode(true);
  template.querySelector(".todo__title").textContent = i.title;
  template.querySelector(".todo__description").textContent = i.description;
  template.querySelector(".todo__checkbox").checked = i.checked;
  template.querySelector(".todo__checkbox").setAttribute("id", i.title);
  template.querySelector(".todo__label").setAttribute("for", i.title);
  getCheckbox(template);
  list.appendChild(template);
});
