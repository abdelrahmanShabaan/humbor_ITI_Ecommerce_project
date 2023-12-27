//session storage 
//if not null show name
//if null show login 
//if session storage have data and click logout delete session storage 

const username = sessionStorage.getItem('username');

// Display username in the navbar
const usernameDisplay = document.getElementById('usernameDisplay');
if (username) {
  usernameDisplay.textContent = `Welcome, ${username}`;
} else {
  // If username is not found, redirect back to the login page
//  window.location.href = 'login.html';
}

if(sessionStorage.username != null)
{
     //change style
     let x = document.getElementById('logouts');
     x.style.display = 'block';
}else{
    //
}
// Logout function
function logout() {
    // Clear Session Storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');

    // Redirect to the login page
    window.location.href = 'login.html';
}
