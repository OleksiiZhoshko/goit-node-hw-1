const fs = require("fs/promises");
const path = require('path');

const contactsPath = require("./contacts.json");

function listContacts() {
  
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports =  {listContacts, getContactById, removeContact, addContact}