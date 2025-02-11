import readlineSync from "readline-sync";

console.log("Welcome to the Address Book System");

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

const addressBooks: { name: string; contacts: Contact[] }[] = [];

// Create a new contact
function createContact(): Contact {
  return {
    firstName: readlineSync.question("Enter First Name: "),
    lastName: readlineSync.question("Enter Last Name: "),
    address: readlineSync.question("Enter Address: "),
    city: readlineSync.question("Enter City: "),
    state: readlineSync.question("Enter State: "),
    zip: readlineSync.question("Enter ZIP Code: "),
    phoneNumber: readlineSync.question("Enter Phone Number: "),
    email: readlineSync.question("Enter Email: "),
  };
}

// Add a new contact to an address book
function addNewContact(book: { contacts: Contact[] }): void {
  const newContact = createContact();

  // Check for duplicate entry
  if (
    book.contacts.some(
      (c) =>
        c.firstName.toLowerCase() === newContact.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === newContact.lastName.toLowerCase()
    )
  ) {
    console.log("Error: Contact with the same name already exists.");
    return;
  }

  book.contacts.push(newContact);
  console.log("Contact added successfully!");
}

// List all contacts in an address book
function listContacts(book: { name: string; contacts: Contact[] }): void {
  console.log(`\nContacts in Address Book "${book.name}":`);
  if (book.contacts.length === 0) {
    console.log("No contacts found.");
  } else {
    book.contacts.forEach((c, i) => {
      console.log(
        `\nContact ${i + 1}:
         Name: ${c.firstName} ${c.lastName}
         Address: ${c.address}
         City: ${c.city}
         State: ${c.state}
         Zip: ${c.zip}
         Phone: ${c.phoneNumber}
         Email: ${c.email}`
      );
    });
  }
}

// Edit an existing contact
function editContact(book: { contacts: Contact[] }): void {
  const firstName = readlineSync.question("Enter First Name of the contact to edit: ");
  const lastName = readlineSync.question("Enter Last Name of the contact to edit: ");
  const contact = book.contacts.find(
    (c) =>
      c.firstName.toLowerCase() === firstName.toLowerCase() &&
      c.lastName.toLowerCase() === lastName.toLowerCase()
  );

  if (!contact) {
    console.log("Contact not found!");
    return;
  }

  console.log("Editing Contact...");
  contact.address = readlineSync.question(`Enter Address [${contact.address}]: `, { defaultInput: contact.address });
  contact.city = readlineSync.question(`Enter City [${contact.city}]: `, { defaultInput: contact.city });
  contact.state = readlineSync.question(`Enter State [${contact.state}]: `, { defaultInput: contact.state });
  contact.zip = readlineSync.question(`Enter ZIP [${contact.zip}]: `, { defaultInput: contact.zip });
  contact.phoneNumber = readlineSync.question(`Enter Phone [${contact.phoneNumber}]: `, { defaultInput: contact.phoneNumber });
  contact.email = readlineSync.question(`Enter Email [${contact.email}]: `, { defaultInput: contact.email });

  console.log("Contact updated successfully!");
}

// Delete a contact
function deleteContact(book: { contacts: Contact[] }): void {
  const firstName = readlineSync.question("Enter First Name of the contact to delete: ");
  const lastName = readlineSync.question("Enter Last Name of the contact to delete: ");
  const initialLength = book.contacts.length;

  book.contacts = book.contacts.filter(
    (c) =>
      c.firstName.toLowerCase() !== firstName.toLowerCase() ||
      c.lastName.toLowerCase() !== lastName.toLowerCase()
  );

  if (book.contacts.length === initialLength) {
    console.log("Contact not found!");
  } else {
    console.log("Contact deleted successfully!");
  }
}

// Function to sort contacts
function sortContacts(book: { name: string; contacts: Contact[] }): void {
  if (book.contacts.length === 0) {
    console.log(`No contacts in Address Book "${book.name}" to sort.`);
    return;
  }

  console.log("\nSort contacts by:");
  console.log("1. First Name");
  console.log("2. City");
  console.log("3. State");
  console.log("4. ZIP Code");

  const choice = readlineSync.question("Enter your choice: ");

  switch (choice) {
    case "1":
      book.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
      console.log("Contacts sorted by First Name.");
      break;
    case "2":
      book.contacts.sort((a, b) => a.city.localeCompare(b.city));
      console.log("Contacts sorted by City.");
      break;
    case "3":
      book.contacts.sort((a, b) => a.state.localeCompare(b.state));
      console.log("Contacts sorted by State.");
      break;
    case "4":
      book.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
      console.log("Contacts sorted by ZIP Code.");
      break;
    default:
      console.log("Invalid choice.");
      return;
  }

  listContacts(book); // Display sorted contacts
}

// Add a new address book
function addNewAddressBook(): void {
  const name = readlineSync.question("Enter a unique name for the Address Book: ");
  if (addressBooks.some((book) => book.name === name)) {
    console.log("Address Book with this name already exists.");
  } else {
    addressBooks.push({ name, contacts: [] });
    console.log(`Address Book "${name}" created successfully!`);
  }
}

// Select an existing address book
function selectAddressBook(): { name: string; contacts: Contact[] } | null {
  if (addressBooks.length === 0) {
    console.log("No Address Books available.");
    return null;
  }

  console.log("\nAvailable Address Books:");
  addressBooks.forEach((book, i) => console.log(`${i + 1}. ${book.name}`));
  const index = parseInt(readlineSync.question("Select Address Book by number: "), 10) - 1;

  if (index < 0 || index >= addressBooks.length) {
    console.log("Invalid selection.");
    return null;
  }

  return addressBooks[index];
}

// Manage an address book
function manageAddressBook(): void {
  const book = selectAddressBook();
  if (!book) return;

  while (true) {
    console.log(`\nManaging Address Book "${book.name}":`);
    console.log("1. Add Contact");
    console.log("2. List Contacts");
    console.log("3. Edit Contact");
    console.log("4. Delete Contact");
    console.log("5. Sort Contacts");
    console.log("6. Back");

    const choice = readlineSync.question("Enter your choice: ");
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
        sortContacts(book);
        break;
      case "6":
        return;
      default:
        console.log("Invalid choice.");
    }
  }
}

// Main menu
function main(): void {
  while (true) {
    console.log("\nMain Menu:");
    console.log("1. Add Address Book");
    console.log("2. Manage Address Book");
    console.log("3. Exit");

    const choice = readlineSync.question("Enter your choice: ");
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
