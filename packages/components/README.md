# @woodshed/components

*Shared, generic React components for use across multiple applications*

## Workflow

Generally speaking, you will create reusable React components in this package and then consume them in other packages.

You can use the Storybook app in `packages/docs` to develop components in isolation. For more on this, see `packages/docs/src/adding-documentation.story.mdx` and the [Storybook docs](https://storybook.js.org/docs/basics/introduction/).

## Styling

Keep components in this package as simple as possible with regard to styling. As much as possible, you should always use styles provided by [tailwind](https://tailwindcss.com/docs/installation), which will handle a broad variety of needs such as typography, colors, layout and positioning. A good example of when **not to use tailwind** would be for an icon or logo that should always be displayed at a particular size. Tailwind doesn't provide a way to explicitly size images by number of pixels. Also, you will need to set the `content: url(...)` property, which is not a something you can do with tailwind.

We do this so that we can consistently rely on the tailwind design system in our application code. Once you are familiar with tailwind, this will make it easier to quickly understand how the styling works for the feature you're working on.
