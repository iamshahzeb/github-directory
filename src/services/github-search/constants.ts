
export const githubConstantsService = (function () {
    const SEARCH_MODES = {
        users: {
            key: 'users',
            displayText: 'Users'
        },
        repositories: {
            key: 'repositories',
            displayText: 'Repositories'
        }
    }

    const DEFAULT_QUERY_LIMIT = 10

    return {
        SEARCH_MODES,
        DEFAULT_QUERY_LIMIT
    };
})();
