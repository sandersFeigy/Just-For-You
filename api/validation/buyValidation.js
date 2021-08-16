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

//The function checks the validity of the date value entered  
// and returns the appropriate error message.
function madeDateError(madeDate) {
  if (madeDate === "אין הגבלה") {
    return null;
  }
  let date = new Date();
  let dateDay = formatDate(date);
  let dateOfMade =  madeDate; 
  if (dateOfMade > dateDay) {
    return "תאריך שגוי, נסה/י שנית";
  }
  return null;
}

function colorError(color) {
  if (color.length === 0) {
    return '!חובה לסמן את אחת מן האפשרויות ';
  }
  return null;
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}

function requestFurmat(ValuesOfInputs) {
  if ((ValuesOfInputs.id == undefined || ValuesOfInputs.userId == undefined || ValuesOfInputs.userItemsId == undefined || ValuesOfInputs.name == undefined
    || ValuesOfInputs.model == undefined || ValuesOfInputs.category == undefined || ValuesOfInputs.requastDate == undefined ||
    ValuesOfInputs.madeDate == undefined || ValuesOfInputs.companyName == undefined ||
    ValuesOfInputs.color == undefined || ValuesOfInputs.range == undefined || ValuesOfInputs.color == undefined || ValuesOfInputs.otherThings == undefined ||
    ValuesOfInputs.sellOffers == undefined || ValuesOfInputs.endDay == undefined || ValuesOfInputs.finish == undefined || ValuesOfInputs.close == undefined ||
    ValuesOfInputs.offers == undefined ||ValuesOfInputs.emailType==undefined ) ||
    (ValuesOfInputs.id == null || ValuesOfInputs.userId == null || ValuesOfInputs.userItemsId == null || ValuesOfInputs.name == null
      || ValuesOfInputs.model == null || ValuesOfInputs.category == null || ValuesOfInputs.requastDate == null ||
      ValuesOfInputs.madeDate == null || ValuesOfInputs.companyName == null ||
      ValuesOfInputs.color == null || ValuesOfInputs.range == null || ValuesOfInputs.color == null ||
      ValuesOfInputs.sellOffers == null || ValuesOfInputs.endDay == null || ValuesOfInputs.finish == null || ValuesOfInputs.close == null ||
      ValuesOfInputs.offers == null || ValuesOfInputs.emailType==null )) {
    return 'מידע לא תקין';
  }
  return null;
}

//The function checks the validity of all the feilds in the form
//and returns errors messages.
function valuesErrors(ValuesOfInputs) {
  const errors = {};
  const errorName = nameError(ValuesOfInputs.name);
  const errorMadeDate = madeDateError(ValuesOfInputs.madeDate)
  const errorColor = colorError(ValuesOfInputs.color);
  const errorFurmat = requestFurmat(ValuesOfInputs); 
  if (errorName != null) {
    errors.name = errorName;
  }
  if (errorMadeDate != null) {
    errors.madeDate = errorMadeDate;
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