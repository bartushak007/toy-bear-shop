export const resolvePath = (
  filePath,
  prefix = process.env.PUBLIC_URL ? process.env.PUBLIC_URL.concat("/") : "./"
) =>
  filePath.startsWith("http")
    ? filePath
    : prefix.concat(filePath || "/images/noImg1.jpg");

export const capitalizeFirst = str => {
  return typeof str === "string"
    ? (str.charAt(0) ? str.charAt(0).toUpperCase() : "") +
        (str.charAt(1) ? str.slice(1).toLowerCase() : "")
    : "";
};

class FormHelper {
  validateFormField({ validationRules, value }) {
    if (validationRules) {
      if (validationRules.isRequired && !`${value}`.length) {
        return {
          isValid: false,
          error: `The field is required.`
        };
      }
      if (
        validationRules.minLength &&
        value.length < validationRules.minLength
      ) {
        return {
          isValid: false,
          error: `The field must be at least ${validationRules.minLength} characters long.`
        };
      }
      if (
        validationRules.maxLength &&
        value.length > validationRules.maxLength
      ) {
        return {
          isValid: false,
          error: `The field must be bigger then ${validationRules.maxLength} characters long.`
        };
      }

      if (validationRules.type === "number" && !parseInt(value)) {
        return {
          isValid: false,
          error: `The field must contains only numbers.`
        };
      }
    }
    return { isValid: true, error: "" };
  }

  accumulateFields(fields) {
    return Object.entries(fields).reduce(
      (obj, [key, { value }]) => ({
        ...obj,
        [key]: value
      }),
      {}
    );
  }

  setCreateLotValueAction = storeFieldKey => (state, { payload }) => {
    return {
      ...state,
      [storeFieldKey]: {
        ...state[storeFieldKey],
        [payload.key]: {
          ...state[storeFieldKey][payload.key],
          value: payload.value,
          ...this.validateFormField({
            validationRules: state[storeFieldKey][payload.key].validationRules,
            value: payload.value
          })
        }
      }
    };
  };
}
export const formHelper = new FormHelper();
