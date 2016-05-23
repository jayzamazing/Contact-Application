$('document').ready(function() {
  var contacts = new MapOfContacts();
  //keep track of how many phone number and address fields there are
  var phoneAddressFields = [1, 1];
  /*
  * Function to create new map of contact with first contact entered in. Also
  * sets links in contacts section
  */
  $('#contactForm').submit(function(e) {
    createNewContact();
    clearFields();
    setContactLinks();
    e.preventDefault();
  });
  $('#addAddress').click(function(e) {
    //limit address fields to 2
    if (phoneAddressFields[0] === 1) {
      $('#addAddress').prev('div').append('<div class="form-group" id="address2"><label ' +
      'for="inputStreet2">Street</label><input type="street" class="form-control"' +
      ' id="inputStreet2"></div><div class="form-group"><label for="inputCity2">City' +
      '</label><input type="city" class="form-control" id="inputCity2"></div><div' +
      ' class="form-group"><label for="inputState2">State</label><input type="lastState"' +
      ' class="form-control" id="inputState2"></div>');
      phoneAddressFields[0]++;
    }
  });
  $('#addPhoneNumber').click(function(e) {
    //limit phone number fields to 2
    if (phoneAddressFields[1] === 1) {
      $('#addPhoneNumber').parent().parent().append('<div class="form-group" id="phone2">' +
      '<label for="inputPhoneNumber2">Phone Number</label><input type="phoneNumber"' +
      ' class="form-control" id="inputPhoneNumber2"></div>');
      phoneAddressFields[1]++;
    }
  });
  /*
  * Function to add nextdoor neighbor information along with addresses
  */
  $('#contactsLinks').on('click', 'li a', function(e) {
    var fullContact = contacts.findContact($(e.target).text());
    $('#neighborFirstName').html(fullContact[0]);
    $('#neighborLastName').html(fullContact[1]);
    setPhoneNumbers(fullContact);
    setAddresses(fullContact);
    e.preventDefault();
  });
  /*
  * Function to create a new contact
  */
  function createNewContact() {
    contacts.addContact($('#inputFirstName').val(), $('#inputLastName').val(),
    $('#inputPhoneNumber').val(), $('#inputStreet').val(), $('#inputCity').val(),
    $('#inputState').val(), $('#inputPhoneNumber2').val(), $('#inputStreet2').val(),
    $('#inputCity2').val(), $('#inputState2').val());
  }
  /*
  * function to iterate and set the contact links
  */
  function setContactLinks() {
    $('#contactsLinks').html('');
    var names = contacts.iterateOverFirstLast();
    for (var i in names){
      $('#contactsLinks').append('<li><a href="#">' + names[i] + '</a></li>');
    }
  }
  /*
  * Function to iterate and set phone numbers
  */
  function setPhoneNumbers(list) {
    $('#neighborPhoneNumber').html('');
    for (i = 2, j = 0; j < 2; i++, j++) {
      if (list[i] !== null && list[i] !== undefined && list[i] !== ''){
        $('#neighborPhoneNumber').append('<li>' + list[i] + '</li>');
      }
    }
  }
  /*
  * Function to iterate and set the addresses
  */
  function setAddresses(list) {
    $('#neighborAddressList').html('');
    for (i = 4, j = 0; j < 2; i += 3, j++){
      if (list[i] !== null && list[i] !== undefined && list[i] !== ''){
        $('#neighborAddressList').append('<li>' + list[i] + ', ' + list[i + 1] + ', ' + list[i + 2] + '</li>');
      }
    }
  }
  /*
  * Function to clear all of the fields
  */
  function clearFields() {
    $('#inputFirstName').val('');
    $('#inputLastName').val('');
    $('#inputPhoneNumber').val('');
    $('#inputStreet').val('');
    $('#inputCity').val('');
    $('#inputState').val('');
    $('#inputPhoneNumber2').val('');
    $('#inputStreet2').val('');
    $('#inputCity2').val('');
    $('#inputState2').val('');
    $('#phone2').remove();
    $('#address2').remove();
    phoneAddressFields[0] = 1;
    phoneAddressFields[1] = 1;
  }
});
/*
* Contact object for map
*/
function Contact(firstName, lastName, phoneNumber, street, city, state, phoneNumber2,
  street2, city2, state2) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.street = street;
  this.city = city;
  this.state = state;
  this.phoneNumber2 = phoneNumber2;
  this.street2 = street2;
  this.city2 = city2;
  this.state2 = state2;
}
/*
* Function to get first name
*/
Contact.prototype.getFirst = function() {
  return this.firstName;
};
/*
* Function to get last name
*/
Contact.prototype.getLastName = function() {
  return this.lastName;
};
/*
* Function to get phone number
*/
Contact.prototype.getPhoneNumber = function() {
  return this.phoneNumber;
};
/*
* Function to get street address
*/
Contact.prototype.getStreet = function() {
  return this.street;
};
/*
* Function to get city
*/
Contact.prototype.getCity = function() {
  return this.city;
};
/*
* Function to get state
*/
Contact.prototype.getState = function() {
  return this.state;
};
/*
* Function to get phone number 2
*/
Contact.prototype.getPhoneNumber2 = function() {
  return this.phoneNumber2;
};
/*
* Function to get street address 2
*/
Contact.prototype.getStreet2 = function() {
  return this.street2;
};
/*
* Function to get city 2
*/
Contact.prototype.getCity2 = function() {
  return this.city2;
};
/*
* Function to get state 2
*/
Contact.prototype.getState2 = function() {
  return this.state2;
};
/*
* Map object
*/
function MapOfContacts() {
  this.contacts = new Map();
}
/*
* Function to addContact
*/
MapOfContacts.prototype.addContact = function(firstName, lastName, phoneNumber,
  street, city, state, phoneNumber2, street2, city2, state2) {
  this.contacts.set((firstName.concat(' ' + lastName)), new Contact(firstName,
    lastName, phoneNumber, street, city, state, phoneNumber2, street2, city2, state2));
};
/*
* Function to get the first name and last name for the links
*/
MapOfContacts.prototype.iterateOverFirstLast = function() {
  var firstLast = [];
  this.contacts.forEach(function (contact) {
    firstLast.push(contact.getFirst() + ' ' + contact.getLastName());
  });
  return firstLast;
};
/*
* Function to get all information for contact based on link selection
*/
MapOfContacts.prototype.findContact = function(name) {
  var fullContact = [], temp;
  temp = this.contacts.get(name);
  fullContact.push(temp.getFirst());
  fullContact.push(temp.getLastName());
  fullContact.push(temp.getPhoneNumber());
  fullContact.push(temp.getPhoneNumber2());
  fullContact.push(temp.getStreet());
  fullContact.push(temp.getCity());
  fullContact.push(temp.getState());
  fullContact.push(temp.getStreet2());
  fullContact.push(temp.getCity2());
  fullContact.push(temp.getState2());
  return fullContact;
};
