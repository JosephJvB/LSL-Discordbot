# LSL-discordbot

## Notice
This is a discord bot specifically written for the Lucio Surf League discord. 
The code in this project will most likely not be usefull for anything else.

## Implemented:
- Commands:
  - `!help` sends an overview of the available commands.
  - `!help [command]` sends a detailed information about the given command.
  - `!submit` submits a run to the google Form corresponding to the given season.
  - `!delete` deletes a run from the google Spreadsheet corresponding to the given season.
  - `!wr` sends the current wr corresponding to the given parameters.
  - `!pb` sends the current pb corresponding to the given parameters.

- Updates:
  - Bot automatically sends updates when a new run is submitted (either through !submit, or the google Forms).
  - Bot automatically sends a seperate, more detailed, update when the submitted run is a new word record.

- Caching:
  - Bot caches world records for `!wr`, so spreadsheet requests are kept to a minimum.
  - Bot caches personal bests for `!pb`, so spreadsheet requests are kept to a minimun.


## Todo:
- Role updates when a run is submitted or deleted.
- add a `!incomplete` command to show every map the user still hasn't submitted a run for.
- send a message when a run gets deleted.
- maybe redo `!delete` so a user can pick from every run submitted to the given map.


## Warning:
- This is my first time using JavaScript, so the code in here is not optimal in any way or form.
- When a user deletes a message that is still getting processed the bot will throw an error.
- Runs that get submitted while the bot is down or can't recive the submit data will not be annouced at any time in the future.