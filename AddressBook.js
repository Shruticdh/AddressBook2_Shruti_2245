"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const fs_1 = __importDefault(require("fs"));
console.log("Welcome to the Address Book System");
const FILE_NAME = "addressBooks.json";
let addressBooks = [];
// Load data from file
function loadAddressBooks() {
    if (fs_1.default.existsSync(FILE_NAME)) {
        const data = fs_1.default.readFileSync(FILE_NAME, "utf-8");
        addressBooks = JSON.parse(data);
        console.log("Address Books loaded successfully!");
    }
}
// Save data to file
function saveAddressBooks() {
    fs_1.default.writeFileSync(FILE_NAME, JSON.stringify(addressBooks, null, 2), "utf-8");
    console.log("Address Books saved successfully!");
}
// Create a new contact
function createContact() {
    return {
        firstName: readline_sync_1.default.question("Enter First Name: "),
        lastName: readline_sync_1.default.question("Enter Last Name: "),
        address: readline_sync_1.default.question("Enter Address: "),
        city: readline_sync_1.default.question("Enter City: "),
        state: readline_sync_1.default.question("Enter State: "),
        zip: readline_sync_1.default.question("Enter ZIP Code: "),
        phoneNumber: readline_sync_1.default.question("Enter Phone Number: "),
        email: readline_sync_1.default.question("Enter Email: "),
    };
}
// Add a new contact to an address book
function addNewContact(book) {
    const newContact = createContact();
    // Check for duplicate entry
    if (book.contacts.some((c) => c.firstName.toLowerCase() === newContact.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === newContact.lastName.toLowerCase())) {
        console.log("Error: Contact with the same name already exists.");
        return;
    }
    book.contacts.push(newContact);
    saveAddressBooks();
    console.log("Contact added successfully!");
}
// List all contacts in an address book
function listContacts(book) {
    console.log(`\nContacts in Address Book "${book.name}":`);
    if (book.contacts.length === 0) {
        console.log("No contacts found.");
    }
    else {
        book.contacts.forEach((c, i) => {
            console.log(`\nContact ${i + 1}:
         Name: ${c.firstName} ${c.lastName}
         Address: ${c.address}
         City: ${c.city}
         State: ${c.state}
         Zip: ${c.zip}
         Phone: ${c.phoneNumber}
         Email: ${c.email}`);
        });
    }
}
// Edit an existing contact
function editContact(book) {
    const firstName = readline_sync_1.default.question("Enter First Name of the contact to edit: ");
    const lastName = readline_sync_1.default.question("Enter Last Name of the contact to edit: ");
    const contact = book.contacts.find((c) => c.firstName.toLowerCase() === firstName.toLowerCase() &&
        c.lastName.toLowerCase() === lastName.toLowerCase());
    if (!contact) {
        console.log("Contact not found!");
        return;
    }
    console.log("Editing Contact...");
    contact.address = readline_sync_1.default.question(`Enter Address [${contact.address}]: `, { defaultInput: contact.address });
    contact.city = readline_sync_1.default.question(`Enter City [${contact.city}]: `, { defaultInput: contact.city });
    contact.state = readline_sync_1.default.question(`Enter State [${contact.state}]: `, { defaultInput: contact.state });
    contact.zip = readline_sync_1.default.question(`Enter ZIP [${contact.zip}]: `, { defaultInput: contact.zip });
    contact.phoneNumber = readline_sync_1.default.question(`Enter Phone [${contact.phoneNumber}]: `, { defaultInput: contact.phoneNumber });
    contact.email = readline_sync_1.default.question(`Enter Email [${contact.email}]: `, { defaultInput: contact.email });
    saveAddressBooks();
    console.log("Contact updated successfully!");
}
// Delete a contact
function deleteContact(book) {
    const firstName = readline_sync_1.default.question("Enter First Name of the contact to delete: ");
    const lastName = readline_sync_1.default.question("Enter Last Name of the contact to delete: ");
    const initialLength = book.contacts.length;
    book.contacts = book.contacts.filter((c) => c.firstName.toLowerCase() !== firstName.toLowerCase() ||
        c.lastName.toLowerCase() !== lastName.toLowerCase());
    if (book.contacts.length === initialLength) {
        console.log("Contact not found!");
    }
    else {
        saveAddressBooks();
        console.log("Contact deleted successfully!");
    }
}
// Add a new address book
function addNewAddressBook() {
    const name = readline_sync_1.default.question("Enter a unique name for the Address Book: ");
    if (addressBooks.some((book) => book.name === name)) {
        console.log("Address Book with this name already exists.");
    }
    else {
        addressBooks.push({ name, contacts: [] });
        saveAddressBooks();
        console.log(`Address Book "${name}" created successfully!`);
    }
}
// Select an existing address book
function selectAddressBook() {
    if (addressBooks.length === 0) {
        console.log("No Address Books available.");
        return null;
    }
    console.log("\nAvailable Address Books:");
    addressBooks.forEach((book, i) => console.log(`${i + 1}. ${book.name}`));
    const index = parseInt(readline_sync_1.default.question("Select Address Book by number: "), 10) - 1;
    if (index < 0 || index >= addressBooks.length) {
        console.log("Invalid selection.");
        return null;
    }
    return addressBooks[index];
}
// Manage an address book
function manageAddressBook() {
    const book = selectAddressBook();
    if (!book)
        return;
    while (true) {
        console.log(`\nManaging Address Book "${book.name}":`);
        console.log("1. Add Contact");
        console.log("2. List Contacts");
        console.log("3. Edit Contact");
        console.log("4. Delete Contact");
        console.log("5. Back");
        const choice = readline_sync_1.default.question("Enter your choice: ");
        switch (choice) {
            case "1":
                addNewContact(book);
                break;
            case "2":
                listContacts(book);
                break;
            case "3":
                editContact(book);
                break;
            case "4":
                deleteContact(book);
                break;
            case "5":
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}
// Main menu
function main() {
    loadAddressBooks(); // Load data at startup
    while (true) {
        console.log("\nMain Menu:");
        console.log("1. Add Address Book");
        console.log("2. Manage Address Book");
        console.log("3. Exit");
        const choice = readline_sync_1.default.question("Enter your choice: ");
        switch (choice) {
            case "1":
                addNewAddressBook();
                break;
            case "2":
                manageAddressBook();
                break;
            case "3":
                saveAddressBooks(); // Save before exiting
                console.log("Goodbye!");
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}
main();
