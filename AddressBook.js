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
    console.log("Contacts..");
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
function addressBook() {
    console.log("Creating a new contact...");
    while (true) {
        const cases = readline_sync_1.default.question("Enter First Name (1-3): ");
        switch (cases) {
            case "1":
                addNewContact();
                break;
            case "2":
                listContacts();
                break;
            case "3":
                console.log("Exit");
                return;
            default:
                console.log("No Contacts");
        }
    }
}
addressBook();
