"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
console.log("Welcome to the Address Book System");
const addressBooks = [];
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
function countContactsByCityOrState() {
    const searchType = readline_sync_1.default.question("Count contacts by (1) City or (2) State? Enter 1 or 2: ");
    const searchValue = readline_sync_1.default.question(`Enter the ${searchType === "1" ? "City" : "State"} to count: `);
    let count = 0;
    addressBooks.forEach((book) => {
        book.contacts.forEach((contact) => {
            if ((searchType === "1" && contact.city.toLowerCase() === searchValue.toLowerCase()) ||
                (searchType === "2" && contact.state.toLowerCase() === searchValue.toLowerCase())) {
                count++;
            }
        });
    });
    console.log(`\nNumber of contacts in ${searchValue}: ${count}`);
}
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
function manageAddressBook() {
    const book = selectAddressBook();
    if (!book)
        return;
    while (true) {
        console.log(`\nManaging Address Book "${book.name}":`);
        console.log("1. Add Contact");
        console.log("2. List Contacts");
        console.log("3. Back");
        const choice = readline_sync_1.default.question("Enter your choice: ");
        switch (choice) {
            case "1":
                addNewContact(book);
                break;
            case "2":
                listContacts(book);
                break;
            case "3":
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}
function main() {
    while (true) {
        console.log("\nMain Menu:");
        console.log("1. Add Address Book");
        console.log("2. Manage Address Book");
        console.log("3. Count Contacts by City or State");
        console.log("4. Exit");
        const choice = readline_sync_1.default.question("Enter your choice: ");
        switch (choice) {
            case "1":
                addNewAddressBook();
                break;
            case "2":
                manageAddressBook();
                break;
            case "3":
                countContactsByCityOrState();
                break;
            case "4":
                console.log("Goodbye!");
                return;
            default:
                console.log("Invalid choice.");
        }
    }
}
main();
