# Holidaze

Holidaze is a venue booking platform where users can browse, book, and manage venues. It also includes functionality for venue managers to create and manage their own listings.

[Deployed on Netlify](https://holidaze-as.netlify.app/)
[Figma](https://www.figma.com/design/qro0mYvXWzb2EZL9V0HKxE/Holidaze?node-id=39-166&p=f&t=pG7TxYyICgQGKWpe-0)


## Features

### User

- Register and log in using a @stud.noroff.no email

- Browse venues and view details

- Book venues

- Create, update and delete bookings

- View and manage bookings on a user dashboard

### Venue Manager

- Register as a venue manager

- Book venues

- Create, update and delete bookings

- Create, update, and delete venues

- View upcoming bookings for owned venues

- View and manage bookings

- Access a specialized dashboard

## Technologies

- React with TypeScript

- React Router

- Tailwind CSS for styling

- LocalStorage for auth token management

- Figma

## Enviroment Setup

1. Clone the repository

```Bash
git clone https://github.com/AnnaSkudsveen/PE2-Holidaze
cd PE2-Holidaze
```

2. Install the dependencies

```Bash
npm install
```

3. Start the dev server

```Bash
npm run dev
```

### Environment Variables
Create a .env file in the root of your project:
````Bash
VITE_X_NOROFF_API_KEY=your-api-key-here
````

## Requirements

All users:

- [x] May view a list of Venues.
- [x] May search for a specific Venue.
- [x] May view a specific Venue page by id.
- [x] May register as a customer with a stud.noroff.no email address and password.
- [x] May register as a Venue Manager with a stud.noroff.no email address and password.
- [x] May view a calendar with available dates for a Venue. Should dates be booked this must be indicated within the calendar.

Customers:

- [x] May login and log out once registered.
- [x] May create a booking at a Venue.
- [x] May view their upcoming bookings.
- [x] May update their avatar/profile picture (a placeholder avatar/profile picture may be provided as a default until the customer updates it).

Venue Managers:

- [x] May login and log out once registered.
- [x] May create a Venue.
- [x] May edit/update a Venue they manage.
- [x] May delete a Venue they manage.
- [x] May view upcoming bookings made at a Venue they manage.
- [x] May update their avatar/profile picture (a placeholder avatar/profile picture may be provided as a default until the Venue Manager updates it).

## Improvements

- Currently only supports one image per venue

## Licence

MIT License. This project was built as part of the Noroff Front-End Development curriculum.
