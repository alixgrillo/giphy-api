# giphy-api
Links to Giphy API to display gifs that can be animated or still

Return randoms GIFs of your favorite animals. A few animals have been started for you, but feel free
to add as many as you want. You can even delete animal search term!

Please access the site at https://alixgrillo.github.io/giphy-api/.


## Table of Contents
* [About](#about)
* [Functionality](#functionality)
* [Technical Features](#technical-features)
* [Requirements](#requirements)
* [Build Tools](#build-tools)
* [Acknowledgements](#acknowledgements)


## About
The animal GIF page allows the user to see 10 randoms GIFs (hard-G) of their favorite animals. The search
is based on the text on the buttons. When the page loads, there will be 8 buttons to start, and the user can 
click any of the button to render the GIFs. Note - if you want to see more GIFs, hit the same animal more
than once! Each time you chose an animal, 10 more GIFs will produce than the last time.

<img src="/assets/images/giphy-game.gif">

## Functionality
Once the GIFs load, they will all be still images. To animate the images, click on any of images, and they 
will animate. By click on the image again, it will return to the still state. Go ahead and animate all of the
images at once!

<img src="/assets/images/giphy-pics.gif">

Add a new word by using the form and clicking the Add! button. A new button will appears and it will pull in 
GIFs for the new search term.

<img src="/assets/images/giphy-newWord.gif">

If you don't like any of the search terms, you can delete a button by hovering over the button and clicking
the black X close button that generates. Take note that the parent button with the search term will not 
activate the GIFs when the close button is clicked. 

<img src="/assets/images/giphy-deleteWord.gif">

## Technical Features
* Buttons are dynamically created using an array of items and generating the button through JQuery.
* JQuery `$.ajax` function is used to call the GIPHY API to generate the specified number of GIFs.
* HTML element `data` attribute utilized to store animated and still URLs for GIF to allow GIF to switch based
on a click.
* Leveraged `.slice()` function to allow the user to delete a button.

## Requirements
There are no requirements for this game.

## Build Tools
* HTML/CSS
* Bootstrap 4.0.0
* JQuery
* Google Font
* GIPHY API (https://developers.giphy.com/)

## Acknowledgements
* Thanks to Google fonts for all the variations of fonts available.
* Thanks to GIPHY API for making excellent GIFs available with a well documented API!