# Plain JS Refactoring

This repository is an example repository about refactoring a piece of plain JS into a structured and testable system of files and components.

## Initial

The `initial` folder contains the file that is then refactored.

## Step 0

The `step_0` folder contains a simple split of the file into logical blocks.

## Step 1

The `step_1` folder contains a "pseudo OOP" implementation of the blocks. It's structured, but it isn't testable almost at all as the constructors of the methods contain side effects.

## Step 2 (Functional)

The `step_2_func` folder contains a functional implementation of the same page with tests and properly structured functional modules. Testing it is pain because of the way NodeJS exposes the contents of the module. Even the exposed function aren't that easily mocked and spied. Therefore, testing is possible, but to a very limited extent.

## Step 2 (OOP)

The `step_2_oop` folder contains a object-oriented implementation of the same page with tests and properly structured class modules. Tests are also included. In this case the methods are easily mockable and testable. ALL of them. Therefore, this option seems to be preferable if you want to get a nice test coverage.

## Google Slides for the code samples

https://docs.google.com/presentation/d/1F2amkdfm-jUkxFNGVW16vpRgXi_ZPTT3xjTihc4Mplo/edit?usp=sharing