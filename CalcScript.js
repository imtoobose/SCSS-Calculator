var ans = null, 
    checked = -1;
var ops = /x|plus|divide|\-/i;
var arr = [];

function clear() {
  $(".number-view").val("");
}

function update(n) {
  $(".number-view").val(n);
}

//give the value of eval
function operate(op, prev, num) {
  var now;
  if (op == 'plus') now = prev + num;
  else if (op == '-') now = prev - num;
  else if (op == 'divide') now = prev / num;
  else now = prev * num;
  return now;
}

//when an operator is clicked
function calculate(op, num) {
  //empty screen
  if (num == '') {
    if (arr.length > 0) {
      var temp = arr[0];
      arr.shift();
      arr.shift();
      arr.push(temp);
      arr.push(op);
      return;
    } else {
      return;
    }
  }

  //invalid input
  if (isNaN(num)) {
    clear();
    return;
  }

  num = +num;
  if (arr.length > 0) {
    var now;
    now = operate(arr[1], arr[0], num);
    arr.shift();
    arr.shift();
    arr.push(now, op);
    clear();
  } else {
    arr.push(num, op);
    clear();
  }
}

//main function
function addUp(e) {
  var id = "#" + e.target.id;
  var val = $(id).val();
  var num = $(".number-view").val();
  //numbers
  //console.log(id); 
  
  if (!isNaN(val) || val == '.') {
    if (checked == 1) {
      clear();
      checked = -1;
      update(val);
    } else {
      if (num.length <= 12) {
        update(num + val);
      }
    }
  } else {
    //operations
    if (ops.test(val)) {
      calculate(val, num);
    }
    //clear all
    else if (val == 'C') {
      while (arr.length !== 0)
        arr.shift();
      clear();
      ans = null;
    }
    //clear screen, not memory
    else if (val == 'CE') {
      clear();
    }
    //backspace
    else if (val == 'back') {
      if (num.length > 1)
        update(num.substring(0, num.length - 1));
      else
        update("");
    }
    //ans
    else if (val == 'ANS') {
      //console.log(val);
      if (!isNaN(ans)) {
        update(ans);
        checked = 1;
      }
    }
    //equals
    else if (val == 'equals') {
      //console.log(arr.length);
      if (arr.length !== 0) {
        if (num.length > 0) {
          var now = operate(arr[1], arr[0], +num);
        } else {
          now = arr[0];
        }
        if (("" + now).length > 15) {
          now = now.toPrecision(12);
        }
        ans = now;
        update(now);
        arr.shift();
        arr.shift();
        checked = 1;
      }
    }
  }
}

function board(e) {
  //console.log(e.which);
  var k = e.which;
  if (e.keyCode==8)
    e.preventDefault();
  if (e.keyCode == 46) {
      $("#back").click();
  }
  if(e.shiftKey){
    if(k==56)
      $("#val-x").click();
    else if(k==187)
      $("#val-plus").click();
    else if(k==189)
      $("#val--").click();
  }
  else{
      if (47 < k < 58) {
        $("#val-" + (k - 48)).click();
    }
  }
  
  if(k==189)
      $("#val--").click();
  else if(k==191)
      $("#val-div").click();
  else if (k == 32)
    $("#val-equal").click();
  else if(k == 106)
    $("#val-x").click();
  else if(k==190)
    $("#val-dot").click();
}
function everything(){
  $(".btn").on("click", addUp);
  $(document).on("keydown", board);
}
$(document).ready(everything);