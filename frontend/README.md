# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


#Project Concepts:

1) Creating & Nesting components:
_________________________________

* React apps are made out of components.
* A component is a piece of the UI where each component can have their own logic and appearance.
* A component can interact with another components to generate desired result.
* For ex: Component can be like buttons, or a div box or a entire page.

* We are deailing with Functional based components they return markup data.

So, now we will see how to create a component and nest it inside a component:

Creating a component:
_____________________

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default MyButton;


Now, nesting this MyButton component inside App component:
__________________________________________________________

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />  //component loaded
    </div>
  );
}

_______________________________________________________________________________________________________________________


Writing markup with JSX:
________________________

* JSX allows us to write HTML in react.
* JSX is more strictier than HTML tag as here we have to use self closing tag.
* A component can return only 1 JSX tag not multiple. And allowed tag can be like a parent tag:

<div>
 ...
</div>

or  using, Wrapper

<>
</>

Example:
________

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}


3) Adding styles:
_________________

* In react we specify class selector class as className which works similar to class in HTML

<img className="avatar" />


And, In CSS file:
_________________

.avatar {
  border-radius: 50%;
}



4) Displaying data:
___________________

* We know that JSX allows us t ouse HTML with JS.
* Also, we can make use of Curly braces {} to render js code like variable.

For example:
____________

At the top defined teh variable:

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};


return (
  <h1>
    {user.name}
  </h1>
);

We can also use it in as attribute value like:

return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);

_______________________________________________________________________________________________________________________

5) Conditional rendering:
_________________________

* There is no special way to write condition logic in React but same leagcy way as we do it in JS.

For example:
____________

let content;

if(isLoggedIn)
    content = <App1 />;
else
    content = <App2 />;

function App() {
    return <>
        {content}
    </>

}


Note: To compact the above code we can make use of Ternary operator.

Say, in the above code if we don't need else condition then we can go for,

<div>
  {isLoggedIn && <AdminPanel />}
</div>


_______________________________________________________________________________________________________________________

6) Rendering lists:
___________________

So say we are given with an array of objects like:

Array:
const fruits = [
    {id: 1, title: 'Apple'},
    {id: 2, title: 'Grapes'}
];

const fruitsList = fruits.map(fruit => 
<li key={fruits.id}>
    {fruits.title}
</li>)

function App() {

    return (
        <div>
        {fruitsList}
    </div>
    );
}


Note: In above code, fruit represents a individual element of the array.

_______________________________________________________________________________________________________________________

7) Responding to events:
________________________

* We can respond to events by using Event Handler functions.

function App(){

    function HandlingButton(){
        alert("You clicked on a button.");
    }

    return(
        <div>
            <button onClick = {HandlingButton}> //we don't have to call the function react will auto handle it
                Click me
            </button>
        </div>
    )

}

________________________________________________________________________________________________________________________

8) Updating the screen:
_______________________

* If we want that the component should remember information and display it like how many times a button is clicked.
* So, for this we can make use of useState.

To import use:
import {useState} from 'react';

* We will get 2 things from the useState:

1) cuurent state
2) The function that's let use update the current state.

function myButton(){

  const [count, setCount] = useState(0);
}

Note: The default value of the cuurent state will be 0 as we have passed 0 to the useState().
And, when we wan tto change this state we can make changes using the setCount() and pass new value to it.

Example:
________

const[count, setCount] = useState(0);

function handleClick(){
  setCount(count + 1);
}

function App(){
  return (
  <button onClick={handleClick}>
    Click me
  </button>
  );
}

Explanation:
____________

As the user click on the button, a event occurs names onClick it therefores triggers a function handleClick() now in this 
function we are updating the count value. So basically, when a user clicks the button it has to remember the previous state amnd increment it as the user click on button.

Note: React will call this component each time you clicked the button.

Important point:
________________

* If we render same component multiple times each will get it's own state.

Example:
________

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />  //own state for button
      <MyButton />  //own state for button
    </div>
 
_________________________________________________________________________________________________________________________

Using Hooks:
____________

* The word starting with use are called as Hooks. These Hooks are functions.
* Like useState is an built in Hook which is provided by React.
* We can also write our own Hooks by combining with existing ones.







