$('document').ready(function() {
  var contacts = new MapOfContacts();
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
  /*
  * Function to add nextdoor neighbor information along with addresses
  */
  $('#contactsLinks').on('click', 'li a', function(e) {
    var fullContact = contacts.findContact($(e.target).text());
    var blah = fullContact[0];
    $('#neighborFirstName').html(fullContact[0]);
    $('#neighborLastName').html(fullContact[1]);
    $('#neighborPhoneNumber').html(fullContact[2]);
    setAddresses(fullContact);
    e.preventDefault();
  });
  /*
  * Function to create a new contact
  */
  function createNewContact() {
    contacts.addContact($('#inputFirstName').val(), $('#inputLastName').val(), $('#inputPhoneNumber').val(),
    $('#inputStreet').val(), $('#inputCity').val(), $('#inputState').val());
  }
  /*
  * function to iterate and set the contact links
  */
  function setContactLinks() {
    $('#contactsLinks').html('');
    var names = contacts.iterateOverFirstLast();
    for (var i in names){
      $('#contactsLinks').append('<li><a>' + names[i] + '</a></li>');
    }
  }
  /*
  * Function to iterate and set the addresses
  */
  function setAddresses(list) {
    $('#neighborAddressList').html('');
    for (i = 3; i < list.length - 3 / 3; i += 3){
      $('#neighborAddressList').append('<li>' + list[i] + ', ' + list[i + 1] + ', ' + list[i + 2] +'</li>');
    }
  }
});
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
}
/*
* Contact object for map
*/
function Contact(firstName, lastName, phoneNumber, street, city, state) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.street = street;
  this.city = city;
  this.state = state;
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
* Map object
*/
function MapOfContacts() {
  this.contacts = new Map();
}
/*
* Function to addContact
*/
MapOfContacts.prototype.addContact = function(firstName, lastName, phoneNumber, street, city, state) {
  this.contacts.set((firstName.concat(' ' + lastName)), new Contact(firstName, lastName, phoneNumber, street, city, state));
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
  fullContact.push(temp.getStreet());
  fullContact.push(temp.getCity());
  fullContact.push(temp.getState());
  return fullContact;
};
