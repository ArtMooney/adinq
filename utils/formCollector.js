export function formCollector(form, extraFields) {
  let formData = new FormData();
  formData.append("form-name", form.name);

  for (const item of form.querySelectorAll("input")) {
    if (item.type !== "submit") {
      if (item.type === "file") {
        if (item.files[0]) {
          for (const file of item.files) {
            formData.append(item.name, file, file.name);
          }
        }
      } else if (
        item.name !== "gdpr-confirm" &&
        item.name !== "clientip" &&
        item.name !== "pageuri" &&
        item.name !== "pagename" &&
        item.name !== "amex"
      ) {
        if (item.type === "checkbox") {
          formData.append(item.name, item.checked);
        } else if (item.type === "radio") {
          formData.append(item.name, item.checked);
        } else {
          formData.append(item.name, item.value);
        }
      }
    }
  }

  for (const item of form.querySelectorAll("textarea")) {
    formData.append(item.name, item.value);
  }

  for (const item of form.querySelectorAll("select")) {
    formData.append(item.name, item.value);
  }

  if (extraFields) {
    for (const [key, value] of Object.entries(extraFields)) {
      formData.append(key, value);
    }
  }

  return formData;
}
