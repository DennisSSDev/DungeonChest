# DungeonChest
## A 3D dungeon chest opener for all adventurers to explore and loot 

[Final Stable Build Website (Version 1.02)](https://people.rit.edu/dxs4043/igme230/finalproject/Project/)

![alt text](https://github.com/DennisSSDev/DungeonChest/blob/master/Plans-Mocks/Mock.jpg)

## !!! Before you download the repository !!!

Make sure you have a dedicated local host server (Ex: Python server, node.js, VS Code extension, etc) as THREE.js requires a host machine to run the js files. 

In case your computer wasn't able to handle the Graphics Simulation, please report that in the issues tab on github :).

## Controls

Use only your mouse + left and right click for interacting with the project. Do not use the keyboard as currently the project has shortcuts for stopping/pausing the simulation, displaying vital performance information, wireframes, etc.

## What is this and how it's going to work?

The idea of this project is the visitor would get to experience the satisfaction of opening and exploring a chest, but what exactly will the user find inside that chest is left for him to find out. 
The interaction will happen in three main scenes: 

### - The Chest introduction

<p align="center">
  <img width="720" height="405" src="https://github.com/DennisSSDev/DungeonChest/blob/master/Plans-Mocks/Mock_Scene_1.jpg">
</p>

In this scene the user is shown a dungeon with a chest right in the middle which will probably be highlightable on hover. The user will be able to look around, but there won't be much in the room to interact with, other than the chest. By hovering over the chest it starts glowing, encouraging the user to press it. Once the user interacts, he transition to the second scene.

### - The Insides

<p align="center">
  <img width="720" height="405" src="https://github.com/DennisSSDev/DungeonChest/blob/master/Plans-Mocks/Mock_Scene_2.jpg">
</p>

The camera rapidly switches into darkness and from that darkness emerges the bottom of a treasure chest, with three items scattered around the bottom. The user gets the option to hover over them and each of them would glow once the user tries to inspect them. Once the user decides to click on the item, the scene swiches to the final scene.

### - The inspection

<p align="center">
  <img width="720" height="405" src="https://github.com/DennisSSDev/DungeonChest/blob/master/Plans-Mocks/Mock_Scene_3.jpg">
</p>


Based on the user's choice he will get to inspect an item from the chest more closely, by rotating it around. The user will always be able to go back and take a look at other items within the chest, so the inspection can be done with all of the objects.


## What will I use?
- Currently the main framework I'm most likely going to be using is THREE.js, as it is used for 3D web development, which utilizes WebGL and is very well compatible with the majority of browsers
- For creatinng 3D objects I'm planning to use Maya as my main source for 3D Designs
- I'm also going to be using dat.GUI.js which will help me adjust parameters of javascript objects on the fly
- OrbitControls.js will also come in handy as it will help understand what's going around in the scene view
- JQuery UI isalso a good option for developing fast UI elements
- Sound js for simple sound effects

## Plan of Action
- Finish learning THREE.js
- Start Making sketches of the environment for the 3 scenes
- Craft 3D models necessary for the project
- Create the scenes uisng the THREE.js
- Place models into levels
- Create scripts for interactivity like selecting items, hovering, clicking, rotating
- Polish scenes

## Future Additions
- It would be nice to have the user be able to leave his own mark on the items, hence none of them will ever leave the chest. The feature would be to have the user paint a part of the item and have the changes saved to the overall item, thus the next user would be able to see the changes and to the exact same thing.
- Another idea would be to add randomized items inside the chest, so there would be more excitement in the item the user can recieve from the chest 

## Notes
I'm going to be using a couple of tutorials to get myself up and running with WEBGL and three.js:
- [Learning 3D Graphics on the Web with Three.js](https://www.lynda.com/JavaScript-tutorials/Learning-3D-Graphics-Web-Three-js/586668-2.html?org=rit.edu)
- [Getting Started with Three.js](https://aerotwist.com/tutorials/getting-started-with-three-js/)
- [Importing models with JSON](https://www.youtube.com/watch?v=9MUTzn86XXQ&t=637s)

