# Monster Chat Frontend

1. Clone create-react-app npx create-react-app monster-chat-frontend
2. Run npm run start to check if app is working directly
3. Change file/folder structure.

Inside "src" folder:

- Create "components" folder
- Create "app" folder inside "components"
- Move App.js and App.test.js into "app" folder
- Update dependency imports

4. Create Header component and Header.module.css file inside "components" folder and render a div with any text
5. Remove content from App component
6. Import Header component and add it to the render method.
7. Go to Material Ui Website (https://material-ui.com/components/app-bar/) copy and paste the Simple App Bar to the header component
8. In Header component, convert makeStyles to withStyles
9. Style App bar as you wish
10. Remove the icon button from the Header component
11. Name Typography, add alognment to left, add Sign Up button
12. Create Landing page component which displays an image or text, add it to App component
13. Create Login and Signup components which render some text, import it to App component
14. Add React Router switch to App component
15. Add link to login and signup button in Header component
16. Implement form in Sign up component which consists of a title, email and password text (input) field and a button.
17. Make input fields controlled by connecting them to state
18. Add submit click handler to submit form values to /api/users/signup route

- Install axios
- Implement request

19. Duplicate Sign Up component and replace Sign Up with Login. Also rename signup inside the component with or login.
20. Change title and implement request to /api/users/login route
21. In App component, create state value auth and define a setState function setUser
22. In App component, pass state value auth to the Header component

23. In Header component, implement conditional rendering.

- If auth, then show icon button with Profile and Logout menu
- If not auth, then show Login and Logout button

25. Pass setUser function to Login component and call it with argument "true" after successful login.
26. Implement redirect to /dashboard after successful login
27. Implement /logout
28. Implement profile form

- Store images on file system
- Add image path to DB

a. Adding new profile component
b. Extend routing
c. On Profile page display title, name, avatar and file upload input fields
d. Add submit button
e. Add submit logic. Use FormData library to append input fields to submit them to API PUT /profile
f. Add lifecycle method to fetch profile data on profile access and page reload
g. Implement fetch profile logic to fetch profile data from API GET /profile


29. Implement logic to save or update profile form
30. Display users on chat page
31. Implement logic to fetch all available users
32. Implement chat message window
33. Implement logic to fetch messages
34. Implement input to enter chat message
35. Implement logic to send message (Socket.io)

36. Done!

