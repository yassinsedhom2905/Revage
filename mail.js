const firebaseConfig = {
    apiKey: "AIzaSyBZx8vSqIJxvFRyqduYhQrTuPinvM_RmQI",
    authDomain: "contactus-c40b6.firebaseapp.com",
    databaseURL: "https://contactus-c40b6-default-rtdb.firebaseio.com",
    projectId: "contactus-c40b6",
    storageBucket: "contactus-c40b6.appspot.com",
    messagingSenderId: "442747548935",
    appId: "1:442747548935:web:7fa6294418b9edb8e041a2",
    measurementId: "G-LSQ67Z7XNW"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
var ContactFormDB = firebase.database().ref('ContactForm');
 
// Change 'Submit' to 'submit'
document.getElementById('ContactForm').addEventListener('submit', submitForm);
 
function submitForm(e) {
    e.preventDefault();
 
    var name = getElementVal('name');
    var emailid = getElementVal('emailid');
    var msgContent = getElementVal('MsgContent');
 
    saveMessage(name, emailid, msgContent);
 
    // Show temporary notification message
    showNotification("Submitted");
 
    // Optionally, clear the form after submission
    document.getElementById('ContactForm').reset();
}
 
const saveMessage = (name, email, msgContent) => {
    var newContactForm = ContactFormDB.push();
 
    newContactForm.set({
        name: name,
        emailid: email,
        msgContent: msgContent,
    });
};
 
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
 
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
 
    document.body.appendChild(notification);
 
    // Remove the notification after 7 seconds
    setTimeout(() => {
        notification.remove();
    }, 7000);
};
 