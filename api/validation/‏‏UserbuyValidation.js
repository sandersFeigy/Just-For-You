//The function checks the validity of the name value entered by the a regoler
// expression and returns the appropriate error message.
function nameError(name) {
  if (name === "") {
    return "!שדה מילוי - חובה";
  }
  let regx = /^[a-z\u0590-\u05FF ,.'-]+$/i;
  if (!regx.test(name)) {
    return "שם חוקי מכיל אותיות בעברית או באנגלית ואינו מכיל תווים נוספים, נסה/י שנית";
  }
  return null;
}


function colorError(color) {
  if (color.length === 0) {
    return '!חובה לסמן את אחת מן האפשרויות ';
  }
  return null;
} 

function requestFurmat(ValuesOfInputs) {
  if ((ValuesOfInputs.id == undefined || ValuesOfInputs.userId == undefined || ValuesOfInputs.requestId == undefined || ValuesOfInputs.name == undefined
    || ValuesOfInputs.model == undefined || ValuesOfInputs.category == undefined || ValuesOfInputs.requastDate == undefined ||
    ValuesOfInputs.madeDate == undefined || ValuesOfInputs.companyName == undefined ||
    ValuesOfInputs.color == undefined || ValuesOfInputs.range == undefined || ValuesOfInputs.otherThings == undefined ||
    ValuesOfInputs.sellOffers == undefined || ValuesOfInputs.endDay == undefined || ValuesOfInputs.finish == undefined || ValuesOfInputs.close == undefined ||
    ValuesOfInputs.offers == undefined) ||
    (ValuesOfInputs.id == null || ValuesOfInputs.userId == null || ValuesOfInputs.requestId == null || ValuesOfInputs.name == null
      || ValuesOfInputs.model == null || ValuesOfInputs.category == null || ValuesOfInputs.requastDate == null ||
      ValuesOfInputs.madeDate == null || ValuesOfInputs.companyName == null ||
      ValuesOfInputs.color == null || ValuesOfInputs.range == null || ValuesOfInputs.otherThings == null ||
      ValuesOfInputs.sellOffers == null || ValuesOfInputs.endDay == null || ValuesOfInputs.finish == null || ValuesOfInputs.close == null ||
      ValuesOfInputs.offers == null)) {
    return 'מידע לא תקין';
  }
  return null;
}

//The function checks the validity of all the feilds in the form
//and returns errors messages.
function valuesErrors(ValuesOfInputs) {
  const errors = {};
  const errorName = nameError(ValuesOfInputs.name);
  const errorColor = colorError(ValuesOfInputs.color);
  const errorFurmat = requestFurmat(ValuesOfInputs);
  if (errorName != null) {
    errors.name = errorName;
  }
  if (errorColor != null) {
    errors.color = errorColor;
  }
  if (errorFurmat != null) {
    errors.furmat = errorFurmat;
  }
  return errors;
}

module.exports = { valuesErrors };