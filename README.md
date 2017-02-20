# DevNexus 2017 Advanced TypeScript Breakout
This repository contains the source code for the Advanced TypeScript breakout session at DevNexus 2017.

The repository is organized into steps for transitioning a Node.js application from vanilla JavaScript to TypeScript with Mocha unit tests.  Finally, dependency injection is added to the project to facilitate alternating repositories.  

Each folder contains the previous step's completed code.  In other words, the code in each folder is what your code should look like once the necessary changes from the _previous step_ have been made.  For example, the `Step 2` folder contains all of the code changes outlined in `Step 1` (`Step 2` is a _completed version_ of `Step 1's` instructions).

## Objectives
The objective(s) of each folder are outlined below.

### Starter
The starter folder contains a basic Node.js express server that serves a simple Angular 2 application. The Angular 2 application queries data from an API exposed by the Node.js application; the data returned by the API is hard-coded.  The objective of this folder is to simply get familiar with the application.

### Step 1. Add Unit Tests to _server.js_
In this step, we add unit tests to the express application to begin our server-side testing.

### Step 2. Add Unit Tests to the API and Data Repository
The purpose of this step is to add Mocha unit tests to the Node.js API and the data repository.

### Step 3. A Little House Cleaning
Before we begin our conversion from JavaScript to TypeScript, let's clean up our project a bit.

### Step 4. Convert _server.js_ to TypeScript and Update Unit Tests
Now that unit tests have been added to the Node.js application, we'll begin coverting the application to TypeScript and update the corresponding unit tests.  The first refactoring is the express application.

### Step 5. Convert API and Data Repository to TypeScript
The purpose of this step is to finish our Node.js vanilla Javascript-to-TypeScript conversion.  Additionally, we will move the hard-coded data to an external JSON file to 'mimic' an external repository.

### Step 6. Create Second Repository (XML) and Add Unit Tests
We'll start by properly creating our unit tests to test a secondary repository.  We will then create the secondary 'repository' that contains the data in an XML file to mimic a different repository type.  

### Step 7. Add Dependency Injection and Refactor
To this point, we've converted the entire application from JavaScript to TypeScript and have added unit tests.  We will now decouple the data layer and the service layer by introducing dependency injection.  By adding dependency injection, we can easily switch between our two repositories while requiring _very_ minimal refactoring.

### Step 8. Bonus: Add Named Dependencies
As a bonus, we'll add the capability to _dynamically_ switch between repositories via the URL.
