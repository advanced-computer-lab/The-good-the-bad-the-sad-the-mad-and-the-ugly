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
Route `/register`
#### Registering new user
* Route `/`
* Request Body 
* Request Type `POST`
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
* Response Body
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
### Login
### Flight
### Reservation
### User Profile
### Email
