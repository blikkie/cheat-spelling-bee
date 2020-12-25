# New York Times Spelling Bee Cheat Toy

This is a small (overly complex) tool that helps you cheat with the NYTimes spelling bee.

## Installation And Setup
Clone this repo, run `yarn install`

This tool assumes that you have some sort of words list. For my prototype I just dumped a word list from aspell like so: `aspell dump master > ./words.txt`. There are probably better sources of words, let me know if you find one!

Once this is done, we make this into a dictionary object using the command `yarn run compile-dictionary -i words.txt`

## Usage
Now you can enter the puzzle of the day by running the command `yarn run find-words -q etnyhuc`. Note that the first character is assumed to be the middle character.

## Ideas for future improvement
There are a couple things you could do to improve the performance of the solver:
* Add a command to add words to the dictionary from yesterday's puzzle
* Add a command to remove words from the dictionary that the puzzle rejected
* Improved error handling
