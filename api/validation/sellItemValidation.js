//The function checks the validity of the name value entered by the a regoler
// expression and returns the appropriate error message.
function modelError(model, modelNeded) {
  if (model === "") {
    return "!שדה מילוי - חובה";
  }
  else if (modelNeded === "אין הגבלה") {
    return null;
  }
  else if (modelNeded !== model) {
    return "הדגם אינו זהה לדגם המבוקש ,נסה/י שנית";
  }
  return null;
}

function categoryError(category, categoryNeded) {
  if (categoryNeded !== category && categoryNeded !== "שונות") {
    return "הקטגוריה אינה זהה לקטגוריה המבוקשת ,נסה/י שנית";
  }
  return null;
}
//The function checks the validity of the date value entered
// and returns the appropriate error message.
function priceError(price, priceNeded) {
  let Price = String(price.slice(1));
  if (Number(Price) === 0) {
    return "!שדה מילוי - חובה";
  }
  else if (priceNeded === "אין הגבלה") {
    return null;
  }
  let regx = /^[0-9]*$/;
  if (!regx.test(Number(Price))) {
    return "מחיר מכיל מספרים בלבד, נסה/י שנית";
  }
  else if (priceNeded !== price) {
    console.log( price )
    console.log(priceNeded)
    return "ה נסה/י שנית";
  }
  return null;
}

function companyNameError(companyName, companyNameNeded) {
  if (companyName === "") {
    return "!שדה מילוי - חובה";
  }
  else if (companyNameNeded === "אין הגבלה") {
    return null;
  }
  else if (companyNameNeded !== companyName) {
    return "החברה אינה זהה לחברה המבוקשת ,נסה/י שנית";
  }
  return null;
}

function srcError(src) {
  if (src === "") {
    return "!שדה מילוי - חובה";
  }
  return null;
}

function otherThingsError(otherThings, otherThingsNeded) {
  if (otherThingsNeded !== otherThings && otherThingsNeded !== "אין הגבלה") {
    return "המידע צריך להיות תואם לנדרש  ,נסה/י שנית";
  }
  return null;
}

//The function checks the validity of the date value entered
// and returns the appropriate error message.
function madeDateError(madeDate, madeDateNeded) {
  let dateOfMade = formatDate(madeDate);
  if (madeDate === '') {
    return "!שדה מילוי - חובה";
  }
  if (dateOfMade === "" && madeDateNeded !== "" || (dateOfMade !== madeDateNeded && madeDateNeded != "אין הגבלה")) {
    return "התאריך יצור אינו תואם את הדרוש ,נסה/י שנית";
  }
  return null;
}

function colorError(color, colorNeded) {
  if ((colorNeded === "אין הגבלה") && (color.length > 0)) {
    return null;
  }
  else if (color.length === 0) {
    return '!חובה לסמן את אחת מן האפשרויות ';
  }
  else {
    let flag;
    for (let i = 0; i < color.length; i++) {
      flag = false;
      for (let j = 0; j < colorNeded.length; j++) {
        if (color[i] === colorNeded[j]) {
          flag = true;
        }
      }
      if (!flag) {
        return "הצבעים אינם תואמים את הצבעים הדרושים,נסה/י שנית"
      }
    }
  }
  return null;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}


function sellFurmat(ValuesOfInputs) {
  if ((ValuesOfInputs.id == undefined || ValuesOfInputs.sellerId == undefined || ValuesOfInputs.name == undefined
    || ValuesOfInputs.model == undefined || ValuesOfInputs.category == undefined ||
    ValuesOfInputs.madeDate == undefined || ValuesOfInputs.companyName == undefined ||
    ValuesOfInputs.color == undefined || ValuesOfInputs.otherThings == undefined ||
    ValuesOfInputs.sellerItemId == undefined || ValuesOfInputs.price == undefined ||
    ValuesOfInputs.src == undefined || ValuesOfInputs.buy == undefined) ||
    (ValuesOfInputs.id == null || ValuesOfInputs.sellerId == null || ValuesOfInputs.name == null
      || ValuesOfInputs.model == null || ValuesOfInputs.category == null ||
      ValuesOfInputs.madeDate == null || ValuesOfInputs.companyName == null ||
      ValuesOfInputs.color == null || ValuesOfInputs.otherThings == null ||
      ValuesOfInputs.sellerItemId == null || ValuesOfInputs.price == null ||
      ValuesOfInputs.src == null|| ValuesOfInputs.buy ==null)) {
    return 'מידע לא תקין';
  }
  return null;
}
//The function checks the validity of all the feilds in the form
//and returns errors messages.
function valuesErrors(ValuesOfInputs, buyItem) {
  const errors = {};
  const errorModel = modelError(ValuesOfInputs.model, buyItem.model);
  const errorPrice = priceError(ValuesOfInputs.price, buyItem.price);
  const errorFurmat = sellFurmat(ValuesOfInputs)
  const errorCompanyName = companyNameError(
    ValuesOfInputs.companyName,
    buyItem.companyName
  );
  const errorOtherThings = otherThingsError(
    ValuesOfInputs.otherThings,
    buyItem.otherThings
  );
  const errorMadeDate = madeDateError(
    ValuesOfInputs.madeDate,
    buyItem.madeDate
  );
  const errorColor = colorError(ValuesOfInputs.color, buyItem.color);
  const errorCategory = categoryError(ValuesOfInputs.category, buyItem.category);
  const errorSrc = srcError(ValuesOfInputs.imgSrc);
  if (errorSrc != null) {
    errors.src = errorSrc;
  }
  if (errorCategory != null) {
    errors.category = errorCategory;
  }
  if (errorCompanyName != null) {
    errors.companyName = errorCompanyName;
  }
  if (errorMadeDate != null) {
    errors.madeDate = errorMadeDate;
  }
  if (errorColor != null) {
    errors.color = errorColor;
  }
  if (errorModel != null) {
    errors.model = errorModel;
  }
  if (errorPrice != null) {
    errors.price = errorPrice;
  }
  if (errorOtherThings != null) {
    errors.otherThings = errorOtherThings;
  }
  if (errorFurmat != null) {
    errors.errorFurmat = errorFurmat;
  }
  return errors;
}

module.exports = { valuesErrors };
