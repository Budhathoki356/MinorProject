module.exports = function map_user_req(user, userDetails) {
    if (userDetails.lastName && userDetails.firstName)
        user.username = userDetails.firstName + ' ' + userDetails.lastName;
    if (userDetails.password)
        user.password = userDetails.password;
    if (userDetails.email)
        user.email = userDetails.email;
    if (userDetails.role)
        user.role = userDetails.role;
    if (userDetails.dob)
        user.dob = userDetails.dob;
    if (userDetails.mobileNumber)
        user.mobileNumber = userDetails.mobileNumber;
    if (userDetails.gender)
        user.gender = userDetails.gender;
    if (userDetails.activeStatus)
        user.activeStatus = userDetails.activeStatus;
        
    return user;
}