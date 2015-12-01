$(document).ready(function() {
  var holdingArray = [],
      tempNumber = "0",
      calcMade = false;
  
  /**
   * Changes text displayed in the #screen-string span element
   * Iterates over values inside array holdingArray and replaces current #screen-string
   *
   */
  function changeScreenText() {
    
    $("#screen-string").text("");
    
    $.each(holdingArray, function(index, value) {
        $("#screen-string").append(value + " ");
    });
    
  }
  
  /**
   * Calculates the result and displays it on screen
   * Uses array holdingArray to get calculations to be made
   *
   */
  function calculate() {

    var arrayLength = holdingArray.length - 1, // -1 because it"s an array
        stringCatcher = "",
        inbetweenResult,
        tempStringForCalc;
        
    // Put entire calculation string at top
    changeScreenText();
    
    // Iterate through array containing calculations to be done
    $.each(holdingArray, function(index, value) {
      
      // Append value for index to the stringCatcher string
      stringCatcher += value;
      
      // If the index is an even number and not zero
      if(index % 2 === 0 && index !== 0) {
        
        // Done for every even index higher than 2
        if(inbetweenResult) {
          
          // Make string to do eval() on using inbetweenResult and the two values concatenaded in stringCatcher
          tempStringForCalc = inbetweenResult += stringCatcher;
          
          // Do eval(), replace current inbetweenResult, reset stringCatcher
          inbetweenResult = eval(tempStringForCalc);
          stringCatcher = "";
          
        }
        // Done on index 2 in array
        else {
          
          // Do eval() on everything in stringCatcher, put in inbetweenResult, then reset stringCatcher
          inbetweenResult = eval(stringCatcher);
          stringCatcher = "";
          
        }
      }
      
    });
    
    // Return result
    return inbetweenResult;
    
  }
  
  /**
   * Clear the screen
   * If param is false, clear only input value (what's expected with CE button)
   *
   * @param boolean
   *
   */
  function clearScreen(everything) {
    
    // Clear the input field and tempNumber variable
    tempNumber = "0";
    $("#screen-current-number").text(0);
    
    // If it's the C button, also clear holdingArray and remove the calculation from screen
    if(everything) {
      holdingArray = [];
      changeScreenText();
    }
    
  }
  
  /**
   * Click event hanlder for buttons with class .erase
   *
   */
  $(".erase").click(function() {
    
    if($(this).hasClass("c")) {
      calcMade = false;
      clearScreen(true);
    }
    else {
      clearScreen();
    }
    
  });
  
  /**
   * Click event handler for buttons with class .number or .decimal
   *
   */
  $(".number, .decimal").click(function() {
    
    var clickedNumber = this.textContent; // A string, containing a digit or a dot (.), taken from the button text values
    
    if(calcMade === true) {
      clearScreen(true);
      calcMade = false;
    }
    
    // If the string already contains a dot and decimal button is clicked, do nothing
    // Here to prevent multiple decimals in number
    if(tempNumber.indexOf(".") >= 0 && $(this).hasClass("decimal")) {
      
      return;
      
    }
    // Otherwise change tempNumber and #screen-current-number
    else {
      
      // If the number in the screen is at zero (default start mode), this will be triggered
      // Replaces the tempNumber with clicked no or appends decimal
      if(tempNumber.length < 2 && parseInt(tempNumber) === 0) {
        
        // If decimal is clicked when only 0 in tempNumber, append the decimal
        if(clickedNumber === ".") {
          
          $("#screen-current-number").append(clickedNumber);
          tempNumber += clickedNumber;
          
        }
        // Otherwise change the tempNumber
        else {
          
          $("#screen-current-number").text(clickedNumber);
          tempNumber = clickedNumber;
          
        }
      }
      // If the tempNumber is anything but a single zero
      else {
        
        $("#screen-current-number").append(clickedNumber);
        tempNumber += clickedNumber;
        
      }
    }
    
    //console.log(tempNumber);
    
  });
  
  /**
   * Click event handler for buttons with class .calculation
   *
   */
  $(".calculation").click(function() {
    
    var tempNumberIntOrFloat;
    
    tempNumberIntOrFloat = parseFloat(tempNumber);
    
    // Only allow adding to holdingArray if input value is different than zero (0)
    if(tempNumberIntOrFloat !== 0) {
    
      // If button clicked is addition "+"
      if($(this).hasClass("addition")) {
        
        holdingArray.push(tempNumberIntOrFloat, "+");
        
      }
      else if($(this).hasClass("subtraction")) {
        
        holdingArray.push(tempNumberIntOrFloat, "-");
        
      }
      else if($(this).hasClass("multiplication")) {
        
        holdingArray.push(tempNumberIntOrFloat, "*");
        
      }
      else if($(this).hasClass("division")) {
        
        holdingArray.push(tempNumberIntOrFloat, "/");
        
      }
      
      changeScreenText();
      tempNumber = "0";
      $("#screen-current-number").text("0");
    
    }
    
  });
  
  /**
   * Click event handler for button with class .equals
   *
   */
  $(".equals").click(function() {
    
    if(holdingArray.length > 1) {
      
      var result;
      
      holdingArray.push(parseFloat(tempNumber));
      result = calculate();
      $("#screen-current-number").text(result);
      
      holdingArray = [];
      tempNumber = "0";
      calcMade = true;
      
    }
    else {
      
      return;
      
    }
  });
    
});