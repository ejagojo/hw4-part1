/*
Name: Eljohn(EJ) Agojo
Date: 11/26/2024
File: script.js

GUI Assignment:
    This assignment is about creating a web app that dynamically creates a multiplication table based on user input.
    This assignment served as a way to implement JavaScript basics and error handling. Now adding to the table generation
    We implemented jQuery for more powerful error handling and used jQuery UI plugin for implementing a slider for our input
    values

Eljohn Agojo, UMass Lowell Computer Science, eljohn_agojo@student.uml.edu
Copyright (c) 2024 by Eljohn. All rights reserved. May be freely copied or 
excerpted for educational purposes with credit to the author.
*/

$(document).ready(function () {
    console.log("Document is ready, setting up validation...");

    // Initialize jQuery Validation on the form
    $("#form-container").validate({
        // Define validation rules for each input field
        rules: {
            minimum_col_value: {
                required: true, // Field must not be empty
                number: true,   // Field must contain a valid number
                range: [-50, 50] // Field value must be between -50 and 50
            },
            max_col_value: {
                required: true,
                number: true,
                greaterThanOrEqual: "#min_col_value",  // Custom rule: max_col_value >= min_col_value
                range: [-50, 50]
            },
            min_row_value: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            max_row_value: {
                required: true,
                number: true,
                greaterThanOrEqual: "#min_row_value",  // Custom rule: max_row_value >= min_row_value
                range: [-50, 50]
            }
        },
        // Custom error messages for each validation rule
        messages: {
            minimum_col_value: {
                required: "Minimum Column Value is required", // Displayed if field is empty
                number: "Please enter a valid number"         // Displayed if value is not numeric
            },
            max_col_value: {
                required: "Maximum Column Value is required",
                number: "Please enter a valid number",
                greaterThanOrEqual: "Maximum Column Value cannot be less than Minimum Column Value" 
            },
            min_row_value: {
                required: "Minimum Row Value is required",
                number: "Please enter a valid number"
            },
            max_row_value: {
                required: "Maximum Row Value is required",
                number: "Please enter a valid number",
                greaterThanOrEqual: "Maximum Row Value cannot be less than Minimum Row Value"
            }
        },
        // Custom placement for error messages
        errorPlacement: function (error, element) {
            console.log("Error message generated for:", element.attr("id"));
            error.addClass("error-message"); // Add styling class for error messages
            error.insertAfter(element.parent()); // Insert error message after the input's parent element
        },
        // Function executed when validation is successful
        submitHandler: function () {
            console.log("Submit Handler Triggered - Validation Passed");
            generateTable(); // Generate the multiplication table
        }
    });

    // Add a custom validation method to check if a value is greater than or equal to another field's value
    $.validator.addMethod("greaterThanOrEqual", function(value, element, param) {
        // Compare the input value with the value of the field specified in param
        return parseFloat(value) >= parseFloat($(param).val());
    }, "Value must be greater than or equal to {0}");

    // Function to generate the multiplication table
    function generateTable() {
        // Retrieve user inputs from the form fields
        const minCol = parseInt($("#min_col_value").val());
        const maxCol = parseInt($("#max_col_value").val());
        const minRow = parseInt($("#min_row_value").val());
        const maxRow = parseInt($("#max_row_value").val());

        console.log("Inputs:", { minCol, maxCol, minRow, maxRow });

        const tableContainer = $("#table-container"); // Table container element
        tableContainer.empty(); // Clear any existing table before generating a new one

        // Create the table element
        const table = $("<table>").attr("id", "multiplication-table");

        // Create the header row
        const headerRow = $("<tr>");
        headerRow.append($("<th>")); 
        for (let col = minCol; col <= maxCol; col++) {
            // Add column headers (values from minCol to maxCol)
            headerRow.append($("<th>").text(col));
        }
        table.append(headerRow); // Append header row to the table

        let rowCount = 0; // Counter for rows (used for animation delays)
        const animationDelay = 100; // Delay between row animations (in milliseconds)

        // Generate each row of the table
        for (let row = minRow; row <= maxRow; row++) {
            // Create a closure for the current row to preserve its value
            (function (currentRow) {
                setTimeout(() => {
                    const tableRow = $("<tr>"); // Create a new row element
                    tableRow.append($("<th>").text(currentRow)); // Add row header (currentRow)

                    for (let col = minCol; col <= maxCol; col++) {
                        // Add a cell with the product of the current row and column
                        tableRow.append($("<td>").text(currentRow * col));
                    }

                    // Add fade-in animation to the row
                    tableRow.css("opacity", 0); // Set initial opacity to 0 (invisible)
                    table.append(tableRow); // Append the row to the table
                    tableRow.animate({ opacity: 1 }, 500); // Animate opacity to 1 (visible)
                }, animationDelay * rowCount); // Apply delay based on row count
                rowCount++; // Increment row count for the next iteration
            })(row);
        }
        tableContainer.append(table); // Append the complete table to the container
    }
});
