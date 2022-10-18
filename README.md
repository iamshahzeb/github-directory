# Github Search 📘

**_Github Search which enables different users to search against users and repositories._**

## General Information

- Github search which helps users to search through different users and repositories.

## Features

- Searching implemented for users and repositories.
- User lists and Repository Lists are added.
- Added InfiniteScroll to scroll through different search results.
- Built in and ready to use translation feature added.
- Using "Next js" powerful react framework.
- Project is configured with "Husky" pre-commit and pre-push hooks
  Following hooks are intergrated:
  1. Pre commit hook for linting.
  2. Pre commit hook which enforces convential commits guideline.
  3. Pre push hook which makes sure that project is being build successfully.
  4. Netlify deployment CI/CD
- Using "MUI" for UI styling.
- Using "React-query" for manuplating queries.
- Using Axios Interceptors to catch and response data.
- Using Toastify to show toast messages.
- CI/CD is intergated in project using github flows
  Following actions are being performed:
  1. PR title lint check
  2. PR linting check
  3. PR build check
  4. Netlify deployment CI/CD

## Live Demo

🔗 Github Search Demo](https://github-search-demo1.netlify.app/

## Setup

Following instructions will get you a copy of the project up and running on your local machine for development purpose.

1. Install following on your local machine
   - [Git](https://git-scm.com)
   - [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))
2. Clone the repository by running this following command
   ```bash
   git clone https://github.com/iamshahzeb/github-search.git
   ```
3. Start project by running following commands

   ```bash
   cd github-search/
   yarn install

   # once node_modules gets install, run next command
   yarn dev
   ```

4. Once your app is running, you can access it on the following address in your browser
   [http://localhost:3000](http://localhost:3000)

## Versions

Following versions are being used while creating this guide.

```
node@v16.14.2 or higher
npm@8.5.0 or higher
```

## Branches

Current branches and their purposes are as follow.

```
main -> contains latest changes
production -> reserved for production only
release/1.0.0 -> contains changes which are ready for production
```

# Room For Improvement

## Improvements

- Add unit test, integration and E2E test casess.
- Integrate Sentry to track traffic and errors.
- Add SonarQube to analyze code quality and code security.

## About Me

_Hi, I'm Syed Shahzeb Hasan a BS(CE) graduate working as software developer in the industory for about 4 years, I am an experienced developer skilled in Javascript and its frameworks._
