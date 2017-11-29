# CodeClippy

Our mission is to make it easy for developers to find and reuse code. CodeClippy
is an Atom plugin that aims to act as a gateway for enabling this vision.

Initially, CodeClippy's goal is to provide access to SolutionLoft's querying engine
of indexed StackOverflow questions and answers, allowing the user to interact with StackOverflow Q/A without leaving the comfort of his or her editor.

## Getting Started

This section contains instructions for manually installing CodeClippy locally.
After the initial alpha test, CodeClippy will be made public on Atom's package
repository.

### Prerequisites

1. Please have the Atom editor installed locally. Visit [Atom.io](https://atom.io/)
to download the latest version.

2. Please have the `apm`, the Atom Package Manager, installed to your command line.
To do so, navigate to `Atom > Install Shell Commands` in the application menu. To check
that `apm` was installed, run `apm -v`.

### Installing

1. Clone the CodeClippy plugin.
2. Navigate inside the CodeClippy directory and run `apm link`. This will create
a symbolic link to your `~/.atom/packages` folder.
3. Reload the window. You can do this by pressing `CMD-Shift-P` and entering
`Window: Reload`. You will need to do this every time you make changes to the package.

To activate the plugin, press `CMD-Shift-H`. This will open up a right side panel.
The panel is resizable. To look up StackOverflow threads, enter a query in the
search bar and press enter. You can expand questions by clicking the `Expand` button
on the bottom right of each question. You can expand and collapse comments and answers
similarly.

## Running tests

## Built With

* [Atom](https://atom.io/docs)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/SolutionLoft/CodeClippy-Atom/blob/master/CONTRIBUTING.md) for details on our
code of conduct, and the process for submitting pull requests to us.

There you will soon find instructions for getting set up to develop locally.

## Versioning

## Authors

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
