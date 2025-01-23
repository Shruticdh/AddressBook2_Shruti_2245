"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
console.log("Welcome to Address Book");
const contacts = [];
function createContact() {
    const firstName = readline_sync_1.default.question("Enter First Name: ");
    const lastName = readline_sync_1.default.question("Enter Last Name: ");
    const address = readline_sync_1.default.question("Enter Address: ");
    const city = readline_sync_1.default.question("Enter City: ");
    const state = readline_sync_1.default.question("Enter State: ");
    const zip = readline_sync_1.default.question("Enter ZIP Code: ");
    const phoneNumber = readline_sync_1.default.question("Enter Phone Number: ");
    const email = readline_sync_1.default.question("Enter Email: ");
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
function addNewContact() {
    const addContact = createContact();
    contacts.push(addContact);
}
function listContacts() {
    console.log("Contacts:-");
    if (contacts.length === 0) {
        console.log("Empty");
    }
    else {
        contacts.forEach((contact) => {
            console.log(`       Name: ${contact.firstName} ${contact.lastName}
        Address: ${contact.address}
        City: ${contact.city}
        State: ${contact.state}
        Zip: ${contact.zip}
        Phone: ${contact.phoneNumber}
        Email: ${contact.email}`);
        });
    }
}
function editContact() {
    const firstName = readline_sync_1.default.question("Enter First Name of the contact to edit: ");
    const lastName = readline_sync_1.default.question("Enter Last Name of the contact to edit: ");
    const contact = contacts.find((c) => c.firstName.toLowerCase() === firstName.toLowerCase() && c.lastName.toLowerCase() === lastName.toLowerCase());
    if (!contact) {
        console.log("Contact not found!");
        return;
    }
    console.log("\nEditing Contact...");
    contact.address = readline_sync_1.default.question(`Enter Address [${contact.address}]: `, { defaultInput: contact.address });
    contact.city = readline_sync_1.default.question(`Enter City [${contact.city}]: `, { defaultInput: contact.city });
    contact.state = readline_sync_1.default.question(`Enter State [${contact.state}]: `, { defaultInput: contact.state });
    contact.zip = readline_sync_1.default.question(`Enter ZIP Code [${contact.zip}]: `, { defaultInput: contact.zip });
    contact.phoneNumber = readline_sync_1.default.question(`Enter Phone Number [${contact.phoneNumber}]: `, { defaultInput: contact.phoneNumber, });
    contact.email = readline_sync_1.default.question(`Enter Email [${contact.email}]: `, { defaultInput: contact.email });
    console.log("Contact updated successfully!");
}
function deleteContact() {
    const firstName = readline_sync_1.default.question("Enter First Name of the contact to delete: ");
    const lastName = readline_sync_1.default.question("Enter Last Name of the contact to delete: ");
    const filteredContacts = contacts.filter((c) => !(c.firstName.toLowerCase() === firstName.toLowerCase() && c.lastName.toLowerCase() === lastName.toLowerCase()));
    console.log(filteredContacts);
    console.log(filteredContacts.length);
    if (filteredContacts.length === contacts.length) {
        console.log("Contact not found!");
    }
    else {
        console.log("Contact deleted successfully!");
        contacts.length = 0; // Clear the original array
        contacts.push(...filteredContacts); // Add the remaining contacts back
    }
}
function addressBook() {
    console.log("Creating a new contact:-");
    while (true) {
        const cases = readline_sync_1.default.question("Enter Input (1-4): ");
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
                console.log("Exit");
                return;
            default:
                console.log("No Contacts");
        }
    }
}
addressBook();
