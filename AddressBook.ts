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
  console.log("Contacts..");
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

function addressBook(): void {
  console.log("Creating a new contact...");

  while (true) {
    const cases = readlineSync.question("Enter First Name (1-3): ");

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