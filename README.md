# 100% AI written taboo app

A progressive web app for the [taboo game](https://en.wikipedia.org/wiki/Taboo_(game)) generated entirely with AI.

Contributing Rules:

- never change code manually
- to modify the code, use ONLY AI tools like:
  - [gpt-engineer](https://github.com/gpt-engineer-org/gpt-engineer)
  - copilot chat (NOT the normal copilot autocomplete as it is too manual)
  - chatgpt (haven't really needed it yet)
- Exception: you are allowed to change values of variables, but not to modify any logic

## Run the project

```shellSession
./run.sh
```

## Dev environment

To get a dev shell with tools to work on this project:

1. [install nix](https://determinate.systems/posts/determinate-nix-installer)

1. create .env file setting your OPENAI_API_KEY

    ```shellSession
    cp .env.template .env && $EDITOR .env
    ```

1. enter the dev shell

    ```shellSession
    nix develop .
    ```

1. use gpt-engineer to modify the code

    ```shellSession
    gpte --help
    ```

## GPT-Engineer workflow

The GPT Engineer tool (gpte) created this project by an initial prompt as seen in ``./promt.initial``. This file is not needed anymore but it is kept for historical purposes.

To modify the code with gpte, follow this workflow:

### 1. create a promt

Delete the contents of `./promt` and replace it with new instructions for the AI to modify the project, like for example `add a button near X that does Y`. The more precise the instructions, the better.

### 2. Select files

Ensure that all files which might be modified by the prompt are listed inside `.gpteng/file_list.txt`. gpte can only see and modify exactly these files.

### 3. Invoke gpte

```shellSession
gpte --improve .
```

Now gpte will interact with the AI API to to modify the selected files according to your requests in `./promt`

### 4. Reject running the code (avoid bug)

After the modifications are computed, gpte will ask you if it should execute the now code for you. Reject this, as this seems to trigger a bug where your changes are not properly applied.

## Other methods

For smaller or trivial changes it is often quicker to use copilot chat. It is not as smart as gpte and can only ever look at a single file, but it is fast and cheap.

For use in vscode:

1. install the copilot extension
1. select all the code lines you want to modify by the AI
1. Execute the `Inline Chat: Start Inline Chat` command (`Ctrl + i` by default)
1. Enter your prompt
