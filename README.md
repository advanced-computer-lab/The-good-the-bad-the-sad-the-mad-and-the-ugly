# Airline Reservation System

This project is the main part of **CSEN 704 Advanced Computer Lab** course. The theme of the project, is to create a complete Airline Reservation System. An Airline
Reservation System is a web application through which individuals can reserve and pay
for flights in order to travel to different countries and sometimes domestic cities. Each
airline usually has its own website through which reservations (bookings) can be made.
Such websites include EgyptAir.com, Emirates.com, Lufthansa.com and AirCanada.com.

## Table of Contents
- [Motivation](#motivation)
- [Tools and Frameworks](#tools-and-frameworks)
- [Coding Style](#coding-style)
- [Features](#features)
- [API References](#api-references)
  * [Register](#register)
  * [Login](#login)
  * [Flight](#flight)
  * [Reseravtion](#reservation)
  * [User Profile](#user-profile)
  * [Email](#email)

  


## Motivation
The following are the objectives of this project:
- Master working with **MERN Stack**.
- Work using the Agile Methodology to plan out a project and develop the software.
- Learn how to work together as a team on GitHub.
- Learn the process of following a given set of System Requirements to develop a software. 

## Tools and Frameworks
![MERN Stack](https://user-images.githubusercontent.com/60584447/146457684-e9f0bb67-605f-48ae-908e-590405719e85.png)
This project is fully implemented using the **MERN Stack**. *MERN* stands for *MongoDB*, *Express*, *React*, *Node*, after the four key technologies that make up the stack.
- *MongoDB* is an open source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.
- *Express* is a Node. js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.
- *ReactJS* is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components.
- *NodeJS* is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

## Coding Style
This project is divided into two main parts, frontend and backend. Our backend 

## Features

## API References
Our backend is divided into the following routes, each route has a set of *APIs* with different functionalities.


### Register
1. ***Registering new user***
 - Route `/register/`
 - Request Type `POST`
 - Request Body 
``` 
{
   username: 'toxin',
  firstName: 'Ahmed',
  lastName: 'Hossam',
  email: 'ahmedHosssam@hotmail.com',
  mobileNumber: '+268768768',
  homeAddress: 'Cairo',
  country: 'Egypt',
  passportNumber: 'af6435434as'
}
```
 - Response Body
``` 
{   
    success: false,
    message: "Your account could not be saved. Error : ", 
    err
}
or 
{   
    success:  true,
    message: "Your account has been saved"
}
```
2. ***Get All usernames***
 This API get all the usernames in the database in order to avoid having two users with the same username
  - Route `/register/usernames`
  - Request type `GET`
  - Response Body 
  ```
  {
   {
        "_id": "61aa0d35045140ad2b40654c",
        "username": "Moamen"
    },
    {
        "_id": "61abcae7d71d27e6af883bed",
        "username": "toxin"
    },
    {
        "_id": "61bb2cf1abe020dd466c9d97",
        "username": "MohamedA"
    }
  }
  ```
  
### Login
### Flight
1- ***Show all the available flights***
 - Route `flight/showAllFlights`
 - Request type `GET`
 - Response Body
```
{
   {
        "availableSeats": {
            "economy": 47,
            "business": 25,
            "first": 29
        },
        "maxSeats": {
            "economy": 50,
            "business": 29,
            "first": 29
        },
        "price": {
            "economy": {
                "adult": 3000,
                "child": 2700
            },
            "business": {
                "adult": 5000,
                "child": 4500
            },
            "first": {
                "adult": 7000,
                "child": 6000
            }
        },
        "_id": "618814bd746c8cd22374a747",
        "flightNumber": "1234",
        "departureAirport": "Cairo",
        "arrivalAirport": "DMT",
        "from": "Cairo",
        "to": "Rome",
        "departure": "2021-11-16T10:00:46.000Z",
        "arrival": "2021-11-17T10:00:52.000Z",
        "__v": 0,
        "arrivalTerminal": 2,
        "baggageAllowance": 30,
        "departureTerminal": 3
    },
   // All the available flights in the database
}
```
2- ***Show flights using search criteria***
 - Route `/flight/showFlights`
 - Request Type `POST`
 - Request Body
 ```
 {
    {
            flightNumber: 'A53',
            departureAirport: 'CAI',
            arrivalAirport: 'POI',
            from: "Egypt",
            to: "Italy",
            departure1: //Departure date 1 ,
            departure2: //Departure date 2,
            arrival1: // Arrival Date 1 ,
            arrival2: // Arrival Date 2,
            availableSeats: {
                economy: #of seats,
                business: #of seats ,
                first: #of seats,
            }
     }
 }
 // Note: All the fields are optional. i.e. Any field can be null.
 ```
 - Response Body
 ```
{
   {    "_id": "618814bd746c8cd22374a747",
        "flightNumber": "1234",
        "availableSeats": {
            "economy": 47,
            "business": 25,
            "first": 29
        },
        "maxSeats": {
            "economy": 50,
            "business": 29,
            "first": 29
        },
        "price": {
            "economy": {
                "adult": 3000,
                "child": 2700
            },
            "business": {
                "adult": 5000,
                "child": 4500
            },
            "first": {
                "adult": 7000,
                "child": 6000
            }
        },
        "departureAirport": "Cairo",
        "arrivalAirport": "DMT",
        "from": "Cairo",
        "to": "Rome",
        "departure": "2021-11-16T10:00:46.000Z",
        "arrival": "2021-11-17T10:00:52.000Z",
        "__v": 0,
        "arrivalTerminal": 2,
        "baggageAllowance": 30,
        "departureTerminal": 3
    },
   // All the available flights with the provided search criteria in the request
}
```
3- ***User show flights***

4- ***Delete Flight using its id***
 - Route `flight/getFlightById/:id`
 - Request Type `DELETE`
 - Parameters: `id`, The id of a flight
 - Response Body
 ```
 {
   //the data of the deleted flight
   or
    {
      error: 'Unable to get flight data'
    }
 }
 ```
 5- ***Update Flight using its id***
 - Route `flight/updateFlight/:id`
 - Request Type `PUT`
 - Parameters: `id`, The id of a flight
 - Request Body
 ```
 {
    {
            flightNumber: 'A53',
            departureAirport: 'CAI',
            arrivalAirport: 'POI',
            from: "Egypt",
            to: "Italy",
            departure1: //Departure date 1 ,
            departure2: //Departure date 2,
            arrival1: // Arrival Date 1 ,
            arrival2: // Arrival Date 2,
            availableSeats: {
                economy: #of seats,
                business: #of seats ,
                first: #of seats,
            }
     }
 }
 // Note: All the fields are optional. i.e. Any field can be null.
 ```
 - Response Body
 ```
 {
   msg: 'Updated successfully!'
   
   //or
   
   error: 'Unable to update the Database'
 }
 ```
6- ***Create flight***
- Route `/flight/`
- Request Type `POST`
- Request Body
 ```
 {
    {
            flightNumber: 'A53',
            departureAirport: 'CAI',
            arrivalAirport: 'POI',
            from: "Egypt",
            to: "Italy",
            departure1: //Departure date 1 ,
            departure2: //Departure date 2,
            arrival1: // Arrival Date 1 ,
            arrival2: // Arrival Date 2,
            availableSeats: {
                economy: #of seats,
                business: #of seats ,
                first: #of seats,
            }
     }
 }
 // Note: All the fields are required.
 ```
- Response Body
```
{
  msg: 'Flight added successfully'
  
  //or
  
  error: 'Unable to add this flight'
}
```
7- ***Get flight by id***
- Route `/getFlightById/:id`
- Request Type `GET`
- Parameters: `id`, Id of a specific flight
- Response Body
 ```
 {
   //the data of the flight
   or
    
   error: 'Unable to get flight data'
    
 }
```
### Reservation
1- ***Create Reservation***
 - Route `/reservation/createReservation`
 - Request Type `POST`
 - Request Body
 ```
{
       departureFlightId: 'A556',
       returnFlightId: '5ALD',
       noOfAdults: // Number of Adults in the reservation,
       noOfChildren: // Number of Adults in the reservation,
       cabinClass: // Economy, Business or First,
       departureSeats: [List of the selected seats in the departure],
       returnSeats: [List of the selected seats in the return],
       timestamp: // The time the reservvation took place,
       totalPrice: // The total Price of the reservation in EGP
 }
 ```
 - Response Body
```
{
   {msg: 'Reservation added successfully', reservationId: reservation._id}
   
   or 
   
   {error: 'Unable to add this reservation'}
}
```
2- ***Show All reservations***
 - Route `/reservation/showAllReservations`
 - Request Type `GET`
 - Response Body
```
{
   {
        "_id": "61ad2d97ff1733537acb3a94",
        "userId": "61a896121b1252c35c475680",
        "departureFlightId": "618814bd746c8cd22374a747",
        "returnFlightId": "61a7e58487d5e59b88a5a736",
        "noOfAdults": 1,
        "noOfChildren": 0,
        "cabinClass": "economy",
        "departureSeats": [
            "C3"
        ],
        "returnSeats": [
            "B1"
        ],
        "confirmed": true,
        "timestamp": "2021-12-05T21:22:30.129Z",
        "totalPrice": 4000,
        "__v": 0
    },
    
    // List of All reservations in the Database
}
```
3- ***Get the reservations of a specific user using user's ID***
 - Route `reservation/getUserReservations/:userId`
 - Request Type `GET`
 - Parameters: userId, the ID of the user.
 - Response Body
```
{
   {
        "_id": "61ad2d97ff1733537acb3a94",
        "userId": "61a896121b1252c35c475680",
        "departureFlightId": "618814bd746c8cd22374a747",
        "returnFlightId": "61a7e58487d5e59b88a5a736",
        "noOfAdults": 1,
        "noOfChildren": 0,
        "cabinClass": "economy",
        "departureSeats": [
            "C3"
        ],
        "returnSeats": [
            "B1"
        ],
        "confirmed": true,
        "timestamp": "2021-12-05T21:22:30.129Z",
        "totalPrice": 4000,
        "__v": 0
    },
    
    // List of All reservations in the Database
}
```
4- ***Get a specific reservation by its ID***
- Route `/reservation/getReservationById/:id`
- Request Type `GET`
- Parameters: id, the id of the reservation we want to retrieve.
- Response Body
```
// For Example
{
   {
        "_id": "61ad2d97ff1733537acb3a94",
        "userId": "61a896121b1252c35c475680",
        "departureFlightId": "618814bd746c8cd22374a747",
        "returnFlightId": "61a7e58487d5e59b88a5a736",
        "noOfAdults": 1,
        "noOfChildren": 0,
        "cabinClass": "economy",
        "departureSeats": [
            "C3",
            // List of reserved Seats
        ],
        "returnSeats": [
            "B1",
            // List of reserved Seats
        ],
        "confirmed": true,
        "timestamp": "2021-12-05T21:22:30.129Z",
        "totalPrice": 4000,
        "__v": 0
    }
}
```
5- ***Get a reservation by session ID***
6- ***Get the reserved seats in a flight***
 - Route `/reservation/getReservedSeatsInFlight/:flightId/:cabinClass`
 - Request Type `GET`
 - 
7- ***Update Reservation***
 - Route `/reservation/updateReservation/:id`
 - Request Type `PUT`
 - Parameters: id, ID of the reservation to be updated.
 - Request Body
 ```
{
       departureFlightId: 'A556',
       returnFlightId: '5ALD',
       noOfAdults: // Number of Adults in the reservation,
       noOfChildren: // Number of Adults in the reservation,
       cabinClass: // Economy, Business or First,
       departureSeats: [List of the selected seats in the departure],
       returnSeats: [List of the selected seats in the return],
       timestamp: // The time the reservvation took place,
       totalPrice: // The total Price of the reservation in EGP
 }
 ```
 - Response Body
```
{
  success: true
}
```

8- ***Delete reservarion***
- Route `/reservation/delete/:id`
- Request Type `Delete`
- Parameters: id, ID of the reservation to be updated.
- Response Body
```
{
  //Data of the deleted Reservation
  
  or 
  
  error: 'No such Reservation'
}
```

### User Profile
1- ***Edit User Profile***
 - Route `/profile/editProfile`
 - Request Type `POST`
 - Request Body 
 ```
 {
        email: 'toxin@hotmail.com' ,
        firstName:'Ahmed',
        lastName: 'Hossam',
        country: 'UK',
        passportNumber: 'A65DG69DD',
        homeAddress: 'London',
        mobileNumber: '+28484613',
        
        // All Parameters are optional
 }
 ```
 2- ***Get the User Info***
 - Route `/profile`
 - Request Type `GET`
 - Response Body
```

  {success: false, message: 'Not logged in'}, //if user is not logged in
  
  //or
  
  {
     success: true,
     {
       email: 'toxin@hotmail.com' ,
       firstName:'Ahmed',
       lastName: 'Hossam',
       country: 'UK',
       passportNumber: 'A65DG69DD',
       homeAddress: 'London',
       mobileNumber: '+28484613',
     }  
  }
```

### Email
1- ***Sending Email***
 - Route `/email/sendEmail`
 - Request Type `POST`
 - Request Body
```
   {
     userEmail: 'toxin@hotmail.com',
     mailSubject: 'Hello, World!',
     mailContent: //Some Lengthy Text
   }
```


