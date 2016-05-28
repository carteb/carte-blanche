# Frontend

## Structure

Generally, the view is structured like this:

+---------------------------------------------------+
|          +-------------------------------------+  |
|  Client  |            ReactPlugin              |  |
|          |                                     |  |
|          |                                     |  |
|          |  <PlaygroundList />                 |  |
|          |                                     |  |
|          | +---------------------------------+ |  |
|          | |                                 | |  |
|          | |  <Playground />                 | |  |
|          | |                                 | |  |
|          | +---------------------------------+ |  |
|          |                                     |  |
|          | +---------------------------------+ |  |
|          | |                                 | |  |
|          | |  <Playground />                 | |  |
|          | |                                 | |  |
|          | +---------------------------------+ |  |
|          |                                     |  |
|          | +---------------------------------+ |  |
|          | |                                 | |  |
|          | |  <Playground />                 | |  |
|          | |                                 | |  |
|          | +---------------------------------+ |  |
|          +-------------------------------------+  |
+---------------------------------------------------+

The `PlaygroundList` component handles all the data fetching and sending, and rendering of the main components. The `utils/` folder contains a variety of utility functions, which are explained in the files themselves and in the [`utils/` README](./utils/README.md)!

### The `components/` folder

- `common/`: Contains common, reusable components like `<Input />`, `<Card />`, etc.

- `controls/`: Controls are the inputs that are rendered when editing a variation or the metadata of a component. They consist of inputs for all `propTypes` and flow types. There's also advanced, special controls for specific data formats, e.g. `<NameControl />`.

- `CustomMetadataForm`: This is the form that's rendered when you edit a components prop types.

- `Playground`: Renders a users component in an iFrame.

- `PropForm`: This is the form that's rendered when you edit a variation.
