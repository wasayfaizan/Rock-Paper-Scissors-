// Import Chai assertion library
import { assert } from 'chai';

// Import functions from client script
import { getComputerChoice, getResult } from '../client/script.mjs';

// Test cases
describe('Rock Paper Scissors Game', function() {
    describe('getComputerChoice()', function() {
        it('should return a valid choice', function() {
            const choices = ['rock', 'paper', 'scissors'];
            const computerChoice = getComputerChoice();
            assert.include(choices, computerChoice);
        });
    });

    describe('getResult()', function() {
        it('should return "win" if player wins', function() {
            assert.equal(getResult('rock', 'scissors'), 'win');
            assert.equal(getResult('paper', 'rock'), 'win');
            assert.equal(getResult('scissors', 'paper'), 'win');
        });

        it('should return "lose" if player loses', function() {
            assert.equal(getResult('rock', 'paper'), 'lose');
            assert.equal(getResult('paper', 'scissors'), 'lose');
            assert.equal(getResult('scissors', 'rock'), 'lose');
        });

        it('should return "draw" if it\'s a draw', function() {
            assert.equal(getResult('rock', 'rock'), 'draw');
            assert.equal(getResult('paper', 'paper'), 'draw');
            assert.equal(getResult('scissors', 'scissors'), 'draw');
        });
    });
});
