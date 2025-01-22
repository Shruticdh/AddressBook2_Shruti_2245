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
// Create the contact
const contact = createContact();
console.log("\nContact Created:");
console.log(`   Name: ${contact.firstName} ${contact.lastName}
   Address: ${contact.address}
   City: ${contact.city}
   State: ${contact.state}
   Zip: ${contact.zip}
   Phone: ${contact.phoneNumber}
   Email: ${contact.email}`);
