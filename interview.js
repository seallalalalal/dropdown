var submitOptions;
function MultiselectDropdown(options) {
  function newEl(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs !== undefined)
      Object.keys(attrs).forEach((k) => {
        if (k === "class") {
          Array.isArray(attrs[k])
            ? attrs[k].forEach((o) => (o !== "" ? e.classList.add(o) : 0))
            : attrs[k] !== ""
            ? e.classList.add(attrs[k])
            : 0;
        } else if (k === "style") {
          Object.keys(attrs[k]).forEach((ks) => {
            e.style[ks] = attrs[k][ks];
          });
        } else if (k === "text") {
          attrs[k] === "" ? (e.innerHTML = "&nbsp;") : (e.innerText = attrs[k]);
        } else e[k] = attrs[k];
      });
    return e;
  }

  document.querySelectorAll("select[multiple]").forEach((element, k) => {
    var div = newEl("div", { class: "multiselect-dropdown" });
    element.style.display = "none";
    element.parentNode.insertBefore(div, element.nextSibling);
    var listWrap = newEl("div", { class: "multiselect-dropdown-list-wrapper" });
    var list = newEl("div", { class: "multiselect-dropdown-list" });
    div.appendChild(listWrap);
    listWrap.appendChild(list);

    element.loadOptions = () => {
      Array.from(element.options).map((o) => {
        var op = newEl("div", { class: o.selected ? "checked" : "", optEl: o });
        var ic = newEl("input", { type: "checkbox", checked: o.selected });
        op.appendChild(ic);
        op.appendChild(newEl("label", { text: o.text }));

        op.addEventListener("click", () => {
          op.classList.toggle("checked");
          op.querySelector("input").checked =
            !op.querySelector("input").checked;
          op.optEl.selected = !!!op.optEl.selected;
          element.dispatchEvent(new Event("change"));
          submitOptions = [...element.selectedOptions].map((e) => e.text);
          console.log(submitOptions);
        });
        ic.addEventListener("click", (ev) => {
          ic.checked = !ic.checked;
        });
        o.listitemEl = op;
        list.appendChild(op);
      });
      div.listEl = listWrap;

      div.refresh = () => {
        div
          .querySelectorAll("span.optext, span.placeholder")
          .forEach((t) => div.removeChild(t));
        var sels = Array.from(element.selectedOptions);

        sels.map((x) => {
          var c = newEl("span", {
            class: "optext",
            text: x.text,
            srcOption: x,
          });

          div.appendChild(c);
        });

        if (0 == element.selectedOptions.length)
          div.appendChild(
            newEl("span", {
              class: "placeholder",
              text: element.attributes["placeholder"]?.value ?? "select",
            })
          );
      };
      div.refresh();
    };
    element.loadOptions();

    div.addEventListener("click", () => {
      div.listEl.style.display = "block";
    });

    document.addEventListener("click", function (event) {
      if (!div.contains(event.target)) {
        listWrap.style.display = "none";
        div.refresh();
      }
    });
  });
}

window.addEventListener("load", () => {
  MultiselectDropdown(window.MultiselectDropdownOptions);
});

function onSubmit() {
  window.alert(submitOptions);
}
