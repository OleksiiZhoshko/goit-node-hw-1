const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("nanoid");
const chalk = require("chalk");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      console.log(chalk.red("contact not found!!!"));
      return;
    }

    console.log(chalk.bgBlue("Contact found:"), contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filterContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === filterContacts.length) {
      console.log(chalk.red("Not found"));
      return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(filterContacts), "utf-8");
    console.log(chalk.green("Deleted!"));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const addContact = { id: nanoid(), name, email, phone };
    contacts.push(addContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    console.log(chalk.green("Contact added:"), addContact);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
