# Canine Assistants 🐶

## Overview

Canine Assistants is a nonprofit dedicated to educating people and dogs so they may enhance the lives of one another. They specialize in placing service dogs with people who have difficulty with mobility, epilepsy/seizure disorders, or Type 1 Diabetes as well as dogs in pediatric hospitals and similar facilities.

## Repo Walkthrough

Find a full explanation of this repo [here](https://www.notion.so/gtbitsofgood/Repo-Walkthrough-491ed6b3b4a24052a6b6e331a4307f66?pvs=4).

## Onboarding

### MongoDB

Install [MongoDB Community Server](https://www.mongodb.com/docs/manual/administration/install-community/) to host a local instance of MongoDB. It may also be helpful to download [MongoDB Compass](https://www.mongodb.com/try/download/compass#compass) to view the state of your database.

### Dependencies

Make sure you have [Node.js 18](https://nodejs.org/en) installed. Check by running `node -v`. If your Node version is less than 18, either reinstall Node from the prior link or manage _multiple_ versions of Node with a tool like [nvm](https://github.com/nvm-sh/nvm).

In the root directory of the project, run:

```sh
npm install
```

This command should have installed all necessary dependencies for the app to run.

### Environment Variables

In the root directory, run one of these commands based on your OS:

```sh
npm run secrets:linux # mac / linux
npm run secrets:windows # windows
```

You should be prompted for a master password. Ask your Engineering leadership to continue. Once the password has been verified, your `.env.development.local` file should have been created automatically for you.

If you are unable to use the commands to retrieve the `.env` file, you can download or visit [Bitwarden](https://bitwarden.com/) and login using `product@bitsofgood.org` and the master password. The `.env` file will be available within the vault.

### Development

To start the Next.js dev server, run:

```sh
npm run dev
```

Once authenticated, seed your local database by navigating to `http://localhost:3000/api/seed`.

### Code Formatting

Install and enable [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in VSCode. This repository is also configured with a pre-commit hook that automatically formats any code you commit to ensure formatting consistency throughout the codebase.

### Run With Docker

1.  Install [Docker](https://docs.docker.com/engine/install/)
2.  Obtain the Bitwarden password from your EM. Create a `bitwarden.env` file and fill it in with the following contents:
    ```
    BW_PASSWORD=<your bitwarden password>
    ```
    This only needs to be done on your first run. After that, you should delete the file from your repository to avoid pushing it to Github.
3.  Start the application with Docker Compose: `docker compose up`

If you make any changes to the packages, you may need to rebuild the images. To do this, append --build to the above docker compose up command.

The Dockerized application will have live-reloading of changes made on the host machine.

Note: On linux-based operating systems, if you come across an entrypoint permission error (i.e. `process: exec: "./entrypoint.sh": permission denied: unknown`), run `chmod +x ./entrypoint.sh` to make the shell file an executable.

Windows Users: If you come across this error `exec ./entrypoint.sh: no such file or directory` when running the docker compose command, please follow this [Stackoverflow thread](https://stackoverflow.com/questions/40452508/docker-error-on-an-entrypoint-script-no-such-file-or-directory) to fix it.
