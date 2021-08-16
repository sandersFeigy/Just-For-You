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

//The function checks the validity of the email value entered by a regular
// expression and returns the appropriate error message.
function emailError(email) {
  if (email === "") {
    return "!שדה מילוי - חובה";
  }
  let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regx.test(email)) {
    return "דואר אלקטרוני שגוי, נסה/י שנית";
  }
  return null;
}

//The function checks the validity of the password value entered by a regular
// expression and returns the appropriate error message.
function passwordError(password) {
  if (password === "") {
    return "!שדה מילוי - חובה";
  }  
  let regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/ ;
  if (!regx.test(password)) {
    return "על הסיסמה להכיל אות גדולה ואות קטנה באנגלית ,ספרה\
    בין אחת לתשע ולהיות באורך שמונה תווים לפחות, נסה/י שנית";
  }
  return null;
} 
 
//The function checks the validity of all the feilds in the form
//and returns errors messages.
function valuesErrors(ValuesOfInputs) {
  const errors = {};
  const errorName = nameError(ValuesOfInputs.name);
  const errorEmail = emailError(ValuesOfInputs.email);
  const errorPassword = passwordError(ValuesOfInputs.password); 
  if (errorName != null) {
    errors.name = errorName;
  }
  if (errorEmail != null) {
    errors.email = errorEmail;
  }
  if (errorPassword != null) {
    errors.password = errorPassword;
  } 
  return errors;
}
 
module.exports = {valuesErrors} 
 