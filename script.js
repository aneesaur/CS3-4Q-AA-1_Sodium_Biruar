/*
Computer Science 3 | 4th Quarter | Alternative Assessment 1
Sodium, Aneesa Fareedah B. Biruar
04/19/2026
*/

function validateForm() {

    var errorMessages = document.getElementsByClassName("errorMessage");
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].innerHTML = "";
    }

    let isValid = true;

    // Variables for Form Validation
    var presentDate = new Date();

    var userInput_email_atCount = 0;
    var userInput_email_atLocation = -1;
    var userInput_email_dotCount = 0;
    var userInput_email_dotLocation = -1;

    var userInput_username_isAnUppercaseLetter = false;
    var userInput_username_isALowercaseLetter = false;
    var userInput_username_isADigit = false;
    var userInput_username_isValid = true;

    var userInput_password_hasUppercaseLetter = false;
    var userInput_password_hasLowercaseLetter = false;
    var userInput_password_hasDigit = false;

    // Variables from User Input
    var userInput_fullName = document.getElementById("fullName").value;
    var userInput_birthdate = document.getElementById("birthdate").value;
    var userInput_sex = document.getElementsByName("sex");
    var userInput_email = document.getElementById("email").value;
    var userInput_username = document.getElementById("username").value;
    var userInput_password = document.getElementById("password").value;
    var userInput_confirmPassword = document.getElementById("confirmPassword").value;

    var userInput_volunteeringLocationPreference = document.getElementById("volunteeringLocationPreference").value;
    var userInput_preferredCommittee = document.getElementById("preferredCommittee");
    var userInput_personalCauseForJoining = document.getElementsByName("personalCauseForJoining");

    // Variables from Form Validation
    var fullName = "";
    var birthdate = "";
    var sex = "";
    var email = "";
    var username = "";
    var password = "";
    
    var volunteeringLocationPreference = "";
    var preferredCommittee = "";
    var personalCauseForJoining = [];

    //// Personal Information

    // Full Name
    if (userInput_fullName !== "" && userInput_fullName.trim().length > 2) {
        fullName = userInput_fullName;
    } else {
        document.getElementById("errorMessage_fullName").innerHTML = "Please enter at least 2 characters.";
        isValid = false;
    }

    // Birthdate
    if (userInput_birthdate === "") {
        document.getElementById("errorMessage_birthdate").innerHTML = "Please enter a birthdate.";
        isValid = false;
    } else {
        var userInput_validBirthdate = new Date(userInput_birthdate);

        var yearsDifference = presentDate.getFullYear() - userInput_validBirthdate.getFullYear();
        var monthsDifference = presentDate.getMonth() - userInput_validBirthdate.getMonth();
        var daysDifference = presentDate.getDate() - userInput_validBirthdate.getDate();

        if (yearsDifference > 13 || (yearsDifference === 13 && (monthsDifference > 0 || (monthsDifference === 0 && daysDifference >= 0)))) { //// This line determines if the difference between the present date and the user-inputted birthdate is over 13, indicating that the user is over 13 years old, or if the user is exactly 13 years old by calculating the difference between the present month and the user-inputted birth month, should it be greater than 0 the birth month has passed and the user is indicated to be 13 years old and if it is exactly 0, calculates the difference between the present date and the user-inputted date, should it be at least 0 either the present date is the birthday of the user or the birthday of the user has already passed, indicating that the user is 13 years old. These conditions are necessary to ensure age accuracy because simply subtracting the years would result only to a difference between years and not the actual age, which includes months and days, of the user. For example, the present is April 2013 and the birthdate of the user is June 2000. Calculating the difference between the years 2000 and 2013 only gives you 13, but that is not the actual age of the user because the present date is still April and the actual 13th birthday of the user is later in June.
            birthdate = userInput_birthdate;
        } else {
            document.getElementById("errorMessage_birthdate").innerHTML = "Please enter a valid birthdate. (Members must be at least 13 years old.)";
        isValid = false;
        }

    }

    // Sex
    for (let i = 0; i < userInput_sex.length; i++) {
        if (userInput_sex[i].checked) {
            sex = userInput_sex[i].value;
            break;
        }
    }

    if (sex === "") {
        document.getElementById("errorMessage_sex").innerHTML = "Please select your sex.";
        isValid = false;
    }

    // Email
    if (userInput_email === "") {
        document.getElementById("errorMessage_email").innerHTML = "Please enter an e-mail address.";
        isValid = false;
    } else {
        for (let i = 0; i < userInput_email.length; i++) {
            if (userInput_email[i] === "@") {
                userInput_email_atCount++;
                userInput_email_atLocation = i;
            }

            if (userInput_email[i] === "." && userInput_email_atLocation !== -1 && i < (userInput_email.length - 1) && i > userInput_email_atLocation) {
                userInput_email_dotCount++;
                userInput_email_dotLocation = i;
            }
        }

        if (userInput_email_atCount === 1 && userInput_email_atLocation > 0 && userInput_email_dotCount >= 1 && userInput_email_dotLocation < (userInput_email.length - 1)) { //// This line determines the existence of only one "@" within the user input, "@" not being the first character of the user input, the existence of at least one "." (which was earlier determined to be or not to be after the/an "@") within the user input, and "." not being either of the last two characters of the user input. For the succeeding statement to run, all of these conditions must pass together (hence "&&") because these are the actual rules in the syntax of e-mail addresses. Additionally, earlier checking of e-mail address syntax for other rules that affect the truth of the conditions was done in previous lines within the block.
            email = userInput_email;
        }
    }

    if (email === "") {
        document.getElementById("errorMessage_email").innerHTML = "Please enter a valid e-mail address.";
        isValid = false;
    }

    //// Account Details

    // Username
    if (userInput_username === "") {
        document.getElementById("errorMessage_username").innerHTML = "Please enter a username.";
        isValid = false;
    } else {
        if (userInput_username.length >= 8 && userInput_username.length <= 20) {
            for (let i = 0; i < userInput_username.length; i++) {
                if (!((userInput_username[i] >= "A" && userInput_username[i] <= "Z") || (userInput_username[i] >= "a" && userInput_username[i] <= "z") || (userInput_username[i] >= "0" && userInput_username[i] <= "9"))) {
                    userInput_username_isValid = false;
                    break;
                }
            }
        }

        if ((userInput_username.length >= 8 && userInput_username.length <= 20) && userInput_username_isValid === true) {
            username = userInput_username;
        }
    }

    if (username === "") {
        document.getElementById("errorMessage_username").innerHTML = "Please enter a valid username. (Usernames must contain 8 to 20 characters that are letters and/or numbers.)";
        isValid = false;
    }

    // Password
    if (userInput_password === "") {
        document.getElementById("errorMessage_password").innerHTML = "Please enter a password.";
        isValid = false;
    } else {
        if (userInput_password.length >= 10) {
            for (let i = 0; i < userInput_password.length; i++) {
                if (userInput_password[i] >= "A" && userInput_password[i] <= "Z") {
                    userInput_password_hasUppercaseLetter = true;
                }
                
                if (userInput_password[i] >= "a" && userInput_password[i] <= "z") {
                    userInput_password_hasLowercaseLetter = true;
                }
                
                if (userInput_password[i] >= "0" && userInput_password[i] <= "9") {
                    userInput_password_hasDigit = true;
                }
            }
        }

        if (userInput_password.length >= 10 && userInput_password_hasUppercaseLetter === true && userInput_password_hasLowercaseLetter === true && userInput_password_hasDigit === true) {
            password = userInput_password;
        }
    }

    if (password === "") {
        document.getElementById("errorMessage_password").innerHTML = "Please enter a valid password. (Passwords must contain at least 10 characters that include at least 1 uppercase letter, 1 lowercase letter, and 1 digit.)";
        isValid = false;
    }

    // Confirm Password
    if (userInput_confirmPassword !== "" && userInput_confirmPassword === userInput_password) {
        if (userInput_confirmPassword === password) {
            confirmPassword = userInput_confirmPassword;
        }
    } else {
        document.getElementById("errorMessage_confirmPassword").innerHTML = "Please match the entered password.";
        isValid = false;
    }

    //// Topic Questions

    // Volunteering Location Preference
    if (userInput_volunteeringLocationPreference === "") {
        document.getElementById("errorMessage_volunteeringLocationPreference").innerHTML = "Please enter a valid location. (Locations must include a city, its respective country, and a comma separating the two names.)";
        isValid = false;
    } else {
        for (let i = 0; i < userInput_volunteeringLocationPreference.length; i++) {
            if (userInput_volunteeringLocationPreference[i] === ",") { //// This line, within a loop, determines whether there is a "," within user input. The "," indicates the separation of the name of the city and the name of its respective country; conventionally, having a comma allows easier reading and understanding of the requested input and its format "City, Country", especially in cases where there is more than one noun in either name.
                volunteeringLocationPreference = userInput_volunteeringLocationPreference;
            }
        }
    }

    if (volunteeringLocationPreference === "") {
        document.getElementById("errorMessage_volunteeringLocationPreference").innerHTML = "Please enter a valid location. (Locations must include a city, its respective country, and a comma separating the two names.)";
        isValid = false;
    }

    // Preferred Committee
    for (let i = 1; i < userInput_preferredCommittee.options.length; i++) { //// This line of code begins the loop to check which one of the dropdown options the user selected. For each iteration, i = 1 is incremented by 1 for as long as i is less than the length of the array of dropdown options. Because the first index, 0, of the array of dropdown options is blank for default, checking it would not give us a conventionally valid value and so we skip it; this also prevents it from ever becoming the index value of the element of the array of dropdown options that is accepted as the final user-selected dropdown option.
        if (userInput_preferredCommittee.options[i].selected) {
            preferredCommittee = userInput_preferredCommittee.options[i].value;
            break;
        }
    }

    if (preferredCommittee === "") {
        document.getElementById("errorMessage_preferredCommittee").innerHTML = "Please select a committee.";
        isValid = false;
    }

    // Personal Cause for Joining
    for (let i = 0; i < userInput_personalCauseForJoining.length; i++) {
        if (userInput_personalCauseForJoining[i].checked) {
            personalCauseForJoining.push(userInput_personalCauseForJoining[i].value); //// This line of code adds the element of the checked index value of the array of checkboxes to the array of the final user-checked checkboxes. After the name of the array, .push() adds the element of the checked index value of the array of checkboxes to the end of the array of the final user-checked checkboxes.
        }
    }

    if (personalCauseForJoining.length === 0) {
        document.getElementById("errorMessage_personalCauseForJoining").innerHTML = "Please select at least one personal cause for joining.";
        isValid = false;
    }

    return isValid;

}