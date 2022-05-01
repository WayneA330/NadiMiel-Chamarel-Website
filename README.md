# Steps to be able to run this website locally:

# 1. Install Homebrew
1. For Mac users, you will need to install homebrew to be able to install Node.js. Use this command in your terminal: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js
1. For mac users, you can now use this command in your terminal to install node.js: brew install node
2. For windows and linux users got to the node.js website to install node: https://nodejs.org/en/

# 3. Installing all the packages needed
1. After downloading node.js, navigate to your folder using the terminal.
2. Then type npm install and press Enter. This will download all the necessary packages to be able to run the website.
# 4. Run the server
1. After installing the packages, run this command in your terminal: npm start
2. The website will be running using nodemon.

# 5. View website
1. Now, go to your browser and type: localhost:5001
2. This will run the website

# 6. Errors
1. If you are having errors when trying to run the website, go to the server.js file and scroll completely to the bottom.
2. Change the port to 3000, 5000, 5001, or 5002. Then go to your terminal, press control + c press Enter, then press npm start.