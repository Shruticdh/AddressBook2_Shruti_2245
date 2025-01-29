"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
console.log("Welcome to the Address Book System");
const addressBooks = [];
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
// Add a new contact to the selected address book
function addNewContact(book) {
    const newContact = createContact();
    const isDuplicate = book.contacts.some((c) => c.firstName.toLowerCase() === newContact.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === newContact.lastName.toLowerCase());
    if (isDuplicate) {
        console.log(`A contact with the name "${newContact.firstName} ${newContact.lastName}" already exists in this Address Book.`);
        return;
    }
    book.contacts.push(newContact);
    console.log("Contact added successfully!");
}
// List all contacts in the selected address book
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
// Sort contacts alphabetically by name
function sortContacts(book) {
    if (book.contacts.length === 0) {
        console.log("No contacts to sort.");
        return;
    }
    book.contacts.sort((a, b) => {
        const nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
        const nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    console.log(`\nContacts in the Address Book have been sorted alphabetically by name.`);
    listContacts(book);
}
// Add a new address book
function addNewAddressBook() {
    const name = readline_sync_1.default.question("Enter a unique name for the Address Book: ");
    if (addressBooks.some((book) => book.name === name)) {
        console.log("Address Book with this name already exists.");
    }
    else {
        addressBooks.push({ name, contacts: [] });
        console.log(`Address Book "${name}" created successfully!`);
    }
}
// Select an address book from the list
function selectAddressBook() {
    if (addressBooks.length === 0) {
        console.log("No Address Books available.");
        return null;
    }
    console.log("\nAvailable Address Books:");
    addressBooks.forEach((book, i) => console.log(`${i + 1}. ${book.name}`));
    const index = parseInt(readline_sync_1.default.question("Select Address Book by number: "), 10) - 1;
    if (index < 0 || index >= addressBooks.length || isNaN(index)) {
        console.log("Invalid selection.");
        return null;
    }
    return addressBooks[index];
}
// Manage the selected address book
function manageAddressBook() {
    const book = selectAddressBook();
    if (!book) {
        console.log("No Address Book selected.");
        return;
    }
    while (true) {
        console.log(`\nManaging Address Book "${book.name}":`);
        console.log("1. Add Contact");
        console.log("2. List Contacts");
        console.log("3. Sort Contacts Alphabetically");
        console.log("4. Back");
        const choice = readline_sync_1.default.question("Enter your choice: ");
        switch (choice) {
            case "1":
                addNewContact(book);
                break;
            case "2":
                if (book.contacts.length === 0) {
                    console.log("No contacts found.");
                }
                else {
                    listContacts(book); // This will now run safely.
                }
                break;
            case "3":
                sortContacts(book);
                break;
            case "4":
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}
// Main function
function main() {
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
                console.log("Goodbye!");
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}
main();
