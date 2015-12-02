$(document).ready(function() {
  
  var inputField = { number: "0", haveBeenCalculated: false },
      allCalculationsString,
      stringUsedForEval;
  
  /**
   * Changes text displayed in the "screen" above the buttons
   *
   */
  function changeScreenText() {
    
    $("#screen-current-number").text(inputField.number);  
    $("#screen-string").text(allCalculationsString);
    
  }
  
  /**
   * Click event handler for buttons with class .erase
   *
   */
  $(".erase").click(function() {
    
    // Only clear previously entered calculations if hard clear button is clicked
    if($(this).hasClass("c")) {
      
      // Clear all previous choices made
      allCalculationsString = "";
      stringUsedForEval = "";
      inputField.haveBeenCalculated = false;
      
    }
    
    // Reset inputField.number and update the screen
    inputField.number = "0";
    changeScreenText();
    
  });
  
  /**
   * Click event handler for buttons with class .number or .decimal
   *
   */
  $(".number, .decimal").click(function() {
    
    var regexForDigitsAndDot = /^([\d]|\.)$/,
        clickedButton = this.textContent;
        
    // When a button is pressed and the input field is currently occupied by a
    // previously calculated number, clear it before continuing
    if(inputField.haveBeenCalculated === true) {
      
      inputField.number = "0";
      inputField.haveBeenCalculated = false;
      
    }
    
    // Only accepts a single digit or single decimal character value
    if(regexForDigitsAndDot.test(clickedButton)) {
      
      // If the decimal button is clicked
      if(clickedButton === ".") {
        
        // Check if inputField.number already contain s a dot character
        if(inputField.number.indexOf(".") !== -1) {
          
          // Cancel function so there's not two dots in inputField.number
          return;
          
        }
        else {
          
          // Append dot character to inputField.number
          inputField.number = inputField.number += clickedButton;
          
        }
        
      }
      // If a number button is clicked
      else {
        
        // If the inputField.number is at default value "0" and clickedButton is "0"
        if(inputField.number === "0" && clickedButton === "0") {
          
          // Cancel the function so there's no inputField.number starting with more than one zero
          return;
          
        }
        // Replaces inputField.number if it's "0" and clickedButton is other than "0"
        else if(inputField.number === "0" && clickedButton !== "0") {
        
          inputField.number = clickedButton;
        
        }
        // Append clickedButton to inputField.number
        else {
          
          inputField.number = inputField.number += clickedButton;
          
        }
        
      }
      
    }
    
    changeScreenText();
    
  });
  
  /**
   * Click event handler for buttons with class .calculation
   *
   */
  $(".calculation").click(function() {
  
    var regexForCalculationChars = /^(\+|\-|\/|\*)$/,
        clickedButton = this.textContent,
        tempResult;
        
    // Check that the calculation char is one of the allowed (+ - / *)
    if(regexForCalculationChars.test(clickedButton)) {
      
      // If the client wants to change recently entered calculation choice
      if(inputField.haveBeenCalculated === true) {
        
        // Remove previously chosen calculation choice from end of strings (last character)
        allCalculationsString = allCalculationsString.slice(0, -1);
        stringUsedForEval = stringUsedForEval.slice(0, -1);
        
        // Add newly chosen calculation method to end of strings (last character)
        allCalculationsString += clickedButton;
        stringUsedForEval += clickedButton;
        
      }
      else {
        
        // If there already have been an amount added
        if(allCalculationsString) {
          
          // Put newly entered value in output string allCalculationsString
          allCalculationsString = allCalculationsString + " " + inputField.number + " " + clickedButton;
          
          // Prepare stringUsedForEval for the eval() function
          stringUsedForEval = stringUsedForEval += inputField.number;
          
          // Put result in var tempResult
          tempResult = eval(stringUsedForEval);
          
          // Change the inputField.number to the result
          inputField.number = tempResult;
          
          // To let function that handles button entering know it is a temporary result
          inputField.haveBeenCalculated = true;
          
          // Change var stringUsedForEval for next round of calculations
          stringUsedForEval = tempResult + "" + clickedButton;
          
          
        }
        // If first calculation added
        else {
          
          stringUsedForEval = inputField.number + "" + clickedButton;
          allCalculationsString = inputField.number + " " + clickedButton;
          inputField.haveBeenCalculated = true;
          
        }
        
      }
      
    }
    
    changeScreenText();
    
  });
  
  /**
   * Click event handler for button with class .equals
   *
   */
  $(".equals").click(function() {
    
    var result;
    
    // Prepare the string for eval() function
    stringUsedForEval = stringUsedForEval + inputField.number;
    
    // Get result
    result = eval(stringUsedForEval);
    
    // Display result in input field
    inputField.number = result;
    
    // Clear all previous choices made
    allCalculationsString = "";
    stringUsedForEval = "";
    inputField.haveBeenCalculated = false;
    
    changeScreenText();
    
  });
    
});