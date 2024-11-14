## Docker
You can use Docker to access the projects on your browser locally and also develop for them.
Make sure docker is already running and do the following:
```
docker-compose up
```

Then, in your browser, to access a project, you should be able to see the projects.
React + Vite projects use the following ports:
* http://localhost:5173/
* http://localhost:5174/

Webpack projects use the following ports:
* http://localhost:3001/
* http://localhost:3002/

Static or plain html/css and javascript projects use the following ports (8080 to 8089):
* http://localhost:8080/
* http://localhost:8081/
* http://localhost:8082/
* http://localhost:8083/
* ...

## Projects

1. Landing page

- the 4 boxes of images was not correct ie was not spaced correctly
- Below is the result with boxes outlined. The final result does not have these boxes/borders.
    ![website result](landingpage/result.gif)

2. Rock Paper Scissors game

- to practice JS, nothing special (just an exercise)
- Below is the result
    ![website result](rockpaperscissors/result.png)

3. Etch-a-Sketch

- could be better styling and layout, only did the bare minimum
- Below is the result
    ![website result](etch-a-sketch/result.gif)

4. Calculator

- Decided not to do calculator game -> figured not worth and I won't play it after I am done with it
- Instead made a receipt calculator and made the project public (check it out since my thoughts/summary is in that repo)
- Also made a functional calculator
- Below are results:

    ![website result](calculator-game/result0.png)

    ![receipt result](calculator-game/result1.png)
- You can check the live version [here](https://hkhaung.github.io).

5. Sign-up form (not connected to backend, done for practice)

6. Dashboard (no backend, done for practice but design used for portfolio website)
- problem: responsiveness (items in grid go out of the grid when window size becomes smaller)
- problem: text in flexbox (can't put a lot otherwise will push buttons outside the textbox)
- basically had to hardcode which is not good and website only looks good at 1980x1080
- Below is the result
    ![website result](dashboard/result.png)

7. Library
- no frontend, just JS, this project is to practice OOP
- might come back to add more to this

8. Tic Tac Toe
- no frontend, just JS, this project is also to practice OOP
- used prototypes instead of classes
- might come back to add more to this

9. Restaurant Page
- to practice using Webpack, a module bundler
- uses tabbed browsing ie each tab shows corresponding content
    - done by using webpack and imports/exports of functions
- the menu, about, and order online content are not implemented
- still don't know how to make websites responsive so website only looks right at certain sizes. See below:
    ![website result](restaurant-page/result.png)

10. Todo List
- animations on some components would make this look better
- currently uses local storage -> would be better to have a backend
- TODO: add result picture

11. Spotify API
- (will come back to this later)
- the plan is to somehow use the api, go through playlists that user owns and specifies, and then reorganize the songs in it to playlists matching its genre/vibe

12. Simple Memory Game
- done in ReactJS + Vite
- Took longer than expected due to horrible planning -> imo, you can't just dive right into it even for a simple project like this
- A lot of problems with showing the game board and not showing the game board and making sure the board stays consistent during the game and changes when the game is over
- Most of the problems were solved by using separate components ie two boards, one for the game and one for the loading screen
![website result](simple-memory-game/result.gif)

## Datastructures and algos:
I already have a good understanding of datastructures and algorithms but rewrote some datastructures in JS for practice. It's also good review!

Datastructures implemented:
- linkedlist
- hashmap
- balanced binary search tree

## Unit Tests
- Made unit tests using Jest

## Credits:
- fonts are from Google Fonts
- images are from unsplash, freepik, and others are saved from google search
