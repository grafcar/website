document.getElementById('rangeNumber').addEventListener('input', function(){
    document.getElementById('rangeOutput').innerHTML = this.value;
});
document.getElementById('age').addEventListener('input', function() {
    document.getElementById('ageOutput').innerHTML = niceTryDiddy(this.value);
});

function niceTryDiddy(age){
    if(age >= 0 && age <= 1){
        return "💀 bro";
    }else if (age >= 2 && age <= 17){
        return "⛓️⛓️⛓️🚔👮🚓🫵";
    }else if (age > 17 && age < 68){
        return "🐒";
    }else if (age == 69){
        return "👀";
    }else{
        return "👴";
    }
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    const formData = new FormData(this); // Get the form data
  
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value; // Convert form data to a plain object
    });
  
    // Ensure that the "to" field is included (use the email field from the form)
    data.to = data.email;  // Adding the recipient email (from the form)
  
    // Send the data to the server using fetch
    fetch('https://api.grafcar.net/send-email', { // Replace with your backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Send data as JSON
    })
    .then(response => response.json())
    .then(result => {
      alert('Email sent successfully!');
    })
    .catch(error => {
      alert('Error sending email!');
      console.error(error);
    });
  });