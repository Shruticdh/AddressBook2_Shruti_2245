import { log } from "console";
import readlineSync from "readline-sync";

console.log("Welcome to Address Book");

interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  email: string;
}
const contacts: Contact[] = [];

function createContact(): Contact {
  const firstName = readlineSync.question("Enter First Name: ");
  const lastName = readlineSync.question("Enter Last Name: ");
  const address = readlineSync.question("Enter Address: ");
  const city = readlineSync.question("Enter City: ");
  const state = readlineSync.question("Enter State: ");
  const zip = readlineSync.question("Enter ZIP Code: ");
  const phoneNumber = readlineSync.question("Enter Phone Number: ");
  const email = readlineSync.question("Enter Email: ");

  return {
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phoneNumber,
    email,
  };
}

// add new contact
function addNewContact(): void {
  const addContact = createContact();
  contacts.push(addContact);
}

function listContacts(): void {
  console.log("Contacts:-");
  if (contacts.length === 0) {
    console.log("Empty");
  } else {
    contacts.forEach((contact) => {
      console.log(
        `       Name: ${contact.firstName} ${contact.lastName}
        Address: ${contact.address}
        City: ${contact.city}
        State: ${contact.state}
        Zip: ${contact.zip}
        Phone: ${contact.phoneNumber}
        Email: ${contact.email}`
      );
    });
  }
}

function editContact(): void {
    const firstName = readlineSync.question("Enter First Name of the contact to edit: ");
    const lastName = readlineSync.question("Enter Last Name of the contact to edit: ");
  
    const contact = contacts.find(
      (c) => c.firstName.toLowerCase() === firstName.toLowerCase() && c.lastName.toLowerCase() === lastName.toLowerCase()
    );
  
    if (!contact) {
      console.log("Contact not found!");
      return;
    }
  
    console.log("\nEditing Contact...");
    contact.address = readlineSync.question(`Enter Address [${contact.address}]: `, { defaultInput: contact.address });
    contact.city = readlineSync.question(`Enter City [${contact.city}]: `, { defaultInput: contact.city });
    contact.state = readlineSync.question(`Enter State [${contact.state}]: `, { defaultInput: contact.state });
    contact.zip = readlineSync.question(`Enter ZIP Code [${contact.zip}]: `, { defaultInput: contact.zip });
    contact.phoneNumber = readlineSync.question(`Enter Phone Number [${contact.phoneNumber}]: `, {defaultInput: contact.phoneNumber,});
    contact.email = readlineSync.question(`Enter Email [${contact.email}]: `, { defaultInput: contact.email });

    console.log("Contact updated successfully!");
}


function deleteContact(): void {
    const firstName = readlineSync.question("Enter First Name of the contact to delete: ");
    const lastName = readlineSync.question("Enter Last Name of the contact to delete: ");
  
    const filteredContacts = contacts.filter(
      (c) => !(c.firstName.toLowerCase() === firstName.toLowerCase() && c.lastName.toLowerCase() === lastName.toLowerCase())
    );
    console.log(filteredContacts);
    console.log(filteredContacts.length);
  
    if (filteredContacts.length === contacts.length) {
      console.log("Contact not found!");
    } else {
      console.log("Contact deleted successfully!");
      contacts.length = 0; // Clear the original array
      contacts.push(...filteredContacts); // Add the remaining contacts back
    }
}

function addNewMultipleContacts(): void {
    const numOfContacts = parseInt(
      readlineSync.question("How many contacts would you like to add? "),
      10
    );
  
    if (numOfContacts <= 0) {
      console.log("Please enter a valid positive number.");
      return;
    }
  
    for (let i = 0; i < numOfContacts; i++) {
      console.log(`\nAdding Contact ${i + 1}:`);
      const newContact = createContact();
      contacts.push(newContact);
    }
  
    console.log(`${numOfContacts} contact(s) added successfully!`);
  }
  
  
function addressBook(): void {
  console.log("Creating a new contact:-");

  while (true) {
    const cases = readlineSync.question("Enter Input (1-6): ");

    switch (cases) {
      case "1":
        addNewContact();
        break;

      case "2":
        listContacts();
        break;

      case "3":
        editContact();
        break;

      case "4":
        deleteContact();
        break;

      case "5":
        addNewMultipleContacts();
        break;  

      case "6":
        console.log("Exit");
        return;  

      default:
        console.log("No Contacts");
    }
  }
}
addressBook();