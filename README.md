# CST4550_ScriptingProject

This project is for the CST4550 - Penetration Testing and Digital Forensics course at Middlesex University.
The purpose of this project is to serve a CTF platform in a simple and streamlined fashion. 
The platform and related CTFs are spun up by utilising Docker and Docker Compose.
CTFs and the CTF platform is described in this README.

# Platform

The platform is spun up by running the docker-compose in the root folder of the project. 
The compose file defines Highscores/Frontend as the frontend of the platform, and Highscores/Backend as the backend. 
In the .env file, definitions of the flags of the CTFs are made. This includes the flag itself, the score of the flag, a description of the flag, and the acces port of the flag.

## Webpage

The webpage is written with a frontend in Svelte, and a backend written in Go. The website shows a highscore list, showing all registered users with their points next to them.
Underneath, there is a list of all the flags that are hosted on the platform. 
If the user is logged in, there will be an input-field for submitting flags, and for listed flags there will be a status field showing whether the user has captured that specific flag.

## Adding CTFs

All the variables in the .env file can be parsed all the way down to the individual CTF.
Taking a look at CTFs/BufferOverflow, this folder contains a Dockerfile. This it what is run by the docker-compose.
In the Dockerfile of the BufferOverflow CTF, the ARG "FLAG" is parsed. I can be seen, that this value is written to /root/flag.txt of the CTF, and is the actual flag that has to be captured.
This value has been parsed down from the docker-compose, which, in turn, inheirits it from the "CTF1_FLAG" value from the .env file.
Looking at the docker-compose at the ctf1 section -- which is the BufferOverflow CTF -- the "CTF1_ACCESS" is used to define which public facing port the internal port 22 (ssh) is bound to.

To conclude, to add a new CTF the following values must be defined in the .env:


- CTF1_FLAG: The flag for the CTF
- CTF1_SCORE: The score for capturing the flag
- CTF1_ACCESS: The access port for the CTF
- CTF1_DESCRIPTION: A short description on the CTF

These values are automatically parsed to the CTF platform and each create a row in the list of running CTFs.
The values can then be used in the docker-compose, where they again can be parsed down to the CTF Dockerfile.

# CTFs

Following CTFs are currently hosted by this platform.

## Buffer Overflow 

A simple Buffer Overflow challenge. This program reads the content of "/root/flag.txt" if a buffer is overflown by setting up a signal handler for segmentation faults.
The original idea was to create a more challenging buffer-overflow CTF, however, trying to disable ASLR proved to be rather difficult. WIP.

## Strings 

A simple password-checking program written in C. The flag can be found by utilising `strings`.

## Vulnerable PRNG

The `random` library in Python when seeded with something non-random will no longer produce truly random numbers. By looking at the creation date of the file, the encryption can be reversed by seeding with the same seed.
The output will be a b64-encoded image. The image contains coordinates to a place called Batman in Turkey, where the SSID of a nearby WiFi will be the flag.

## SQLi

This code uses simple php and MySQL for creating a simple web application login form.
It is a basic PHP code which we have used for creating a user registration form which uses the MySQLi extension to interact with the MySQL database.
The project contains 5 php files.
Config.php, register.php, login.php, logout.php and welcome.php
The code starts by including the "config.php" file, which contains the database configuration details used to connect to the MYSQL database server.
In registration, register.php file has been scripted in such a way that errors will be generated if any user tries to submit the form with out any value such as username and password, or if the user already exists in the database.
The login page, login.php ; we have created a login form page for username and password.
Whenever username and password has been submitted, these inputs will be checked against the credentials stored in database. If username and password matches, access will be granted if not login attempt will fail.
The Welcome.php code is where the user is redirected after entering the correct credentials.
 
We are using the following query in the backend 

`$sql = "SELECT id, username FROM users WHERE username = '$username' and password = md5('$password')";`

When we use sql inection ' or 1 = 1 -- '
 The following query would be run in the back end 
SELECT id, username, password FROM users WHERE username = '' or 1 = 1 -- '' and password = md5('123')
The username field has null value but there is one condition which says 1=1 which is always true.
After the or condition there is (--) symbols which will ignore the rest of the sql.

# Future work

- [ ] Disable ASLR in BufferOverflow CTF
- [ ] Add more CTFs
- [ ] Add status check for flags
- [x] Fix bug when submitting non-valid flags
- [ ] Add error messages to frontend
- [ ] Parse errors properly by backend
- [ ] Implement token-based authentication
- [ ] Hash the password lol
