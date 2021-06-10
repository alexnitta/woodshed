// Note that we use the `import('...')` syntax here, to ensure that our global type has a
// reference to the types it needs from React. If you don't do this, TypeScript will silently treat
// the Dispatch and SetStateAction types as `any`, but your linter won't warn you about it.
type SetState<StateType> = import('react').Dispatch<
    import('react').SetStateAction<StateType>
>;
