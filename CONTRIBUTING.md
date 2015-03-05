# Contributing to React Admin

### Running the demo

You can checkout and run the demo with:

    git clone git@github.com:rande/react-admin.git
    make demo
    http-server demo/dist

Once you want to test your change just rerun the ``make demo`` command. If you only change some assets from the demo, you can run the gulp command : ``gulp demo`` to only update the demo.

### `master` is unsafe

We will do our best to keep `master` in good shape, with tests passing at all times. But in order to move fast, we will make API changes that your application might not be compatible with. We will do our best to communicate these changes and always version appropriately so you can lock into a specific version if need be.

### Pull Requests

*Before* submitting a pull request, please make sure the following is done…

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`npm test`).

## Bugs

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. jsFiddle, jsBin, and other sites provide a way to give live examples.

## How to Get in Touch

* Using github
* StackOverflow

## Coding Style

* Use semicolons;
* Commas last,
* 2 spaces for indentation (no tabs)
* Prefer `'` over `"`
* `'use strict';`
* "Attractive"

## License

By contributing to React Admin, you agree that your contributions will be licensed under its MIT license.
