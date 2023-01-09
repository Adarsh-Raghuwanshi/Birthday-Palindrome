const input = document.querySelector("input");
const btn = document.querySelector("button");
const output = document.querySelector("div");

function checkLeapYear(year){
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
}

function changeDate(date, nextOrPrev){
    let day = date[2], month = Number(date[1]), year = date[0];
    let monthDays = [31, (checkLeapYear(year))? 29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(nextOrPrev == "nextDate"){
        if(monthDays[month-1] == day){
            if(month == 12){
                year++;
                month = 1;
            }else{
                month++;
            }
            day = 1
        }else{
            day++;
        }
    }else{
        if(day == 1){
            if(month == 1){
                year--;
                month = 12;
                day = 31;
            }else{
                day = monthDays[month-2];
                month--;
            }
        }else{
            day--;
        }
    }
    
    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    return [year.toString(), month.toString(), day.toString()];
}

function reverseDate(date){
    let dateArr = date.split("").reverse();
    let revDate = dateArr.join("");
    return revDate;
}

function diffDateFormat(date){
    let ddmmyyyy = [date[2] + date[1] + date[0], date[2], date[1], date[0]];
    let mmddyyyy = [date[1] + date[2] + date[0], date[1], date[2], date[0]];
    let yyyymmdd = [date[0] + date[1] + date[2], date[0], date[1], date[2]];
    let ddmmyy = [date[2] + date[1] + date[0].slice(2), date[2], date[1], date[0].slice(2)];
    let mmddyy = [date[1] + date[2] + date[0].slice(2), date[1], date[2], date[0].slice(2)];
    let yymmdd = [date[0].slice(2) + date[1] + date[2], date[0].slice(2), date[1], date[2]];

    let dob = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dob;
}

function handleDate(date){
    let possibleDateFormat = diffDateFormat(date);
    let isPalindrome = false;
    
    for(let i = 0; i < possibleDateFormat.length; i++){
        let newDate = possibleDateFormat[i];
        date = newDate[0];
        if(date == reverseDate(date)){
            isPalindrome = true;
            date = newDate[1] + "/" + newDate[2] + "/" + newDate[3];
            break;
        }
    }
    return [isPalindrome, date];
}

function findNearPalindrome(date){
    let count1 = 0, count2 = 0, nextPalindromeDate, prevPalindromeDate, check;

    while(1){
        count1++;
        date = changeDate(date, "nextDate");
        check = handleDate(date);
        if(check[0]){
            nextPalindromeDate = check[1];
            break;
        }
    }
    while(1){
        count2++;
        date = changeDate(date, "prevDate");
        check = handleDate(date);
        if(check[0]){
            prevPalindromeDate = check[1];
            break;
        }
    }
    return [count1, count2, nextPalindromeDate, prevPalindromeDate];
}

function clickHandler(){
    let dob = input.value;
    if(dob == ""){
        alert("Please enter a your dob to check");
        return;
    }
    let date = dob.split("-"); 
    let check = handleDate(date);

    if(check[0]){
        output.innerHTML = "Yayy! Your Birthday is Palindrome! If we write it like " + check[1];
    }
    else{
        check = findNearPalindrome(date);

        if(check[0] < check[1]){
            output.innerHTML = "Oops! Your Birthday is not Palindrome. The near palindrome date is " + check[2] + ".You missed by " + check[0] + " days.";
        }else{
            output.innerHTML = "Oops! Your Birthday is not Palindrome. The near palindrome date is " + check[3] + ".You missed by " + check[1] + " days.";
        }
    }
}

btn.addEventListener("click", clickHandler);