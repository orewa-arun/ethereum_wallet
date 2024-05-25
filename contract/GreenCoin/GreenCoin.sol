// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract GreenCoin{

    uint256 public coinId;

    // Constructor to initialize the coin ID
    constructor(uint256 _coinId) {
        coinId = _coinId;
    }

    // Define a struct for Validation
    struct Validation{
        address validator;
        bytes32 data_hash;
    }

    // An array to store all validations
    Validation[] public validations;

    // A variable to keep track of the validation score
    uint256 public validation_score = 0; 

    // Function to add a new validation
    function addValidation(bytes32 _hash) public{
        // Create a new Validation struct instance and push it to the validations array
        Validation memory validation = Validation(msg.sender, _hash);
        validations.push(validation);

        // Increment the validation score
        validation_score = validation_score + 1;
    }
    
}
