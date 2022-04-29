
export const links = [
    {
        label: `Home`,
        url: '/home',
        isDropdown: false
    },
    {
        label: `About Us`,
        url: "/about",
        isDropdown: false
    },
    {
        label: `Types of Care`,
        url: "/typeofcare",
        isDropdown: true,
        getDropdownOptions: () => [
            {
                label: 'jobs',
                url: "/job"
            },
            {
                label: 'customers',
                url: "/customers"
            }
        ]
    },
    // knowledgecenter: {
    //     label: `Knowledge Center`,
    //     url: "/knowledgecenter",
    //     isDropdown: false
    // },
    {
        label: `Contact`,
        url: "/contact",
        isDropdown: false
    },
    {
        label: `Get E Card`,
        url: "/e-card",
        isDropdown: false,
        props: {
            classes: 'btn-warning'
        }
    }
];

export default links;
// export const linkKeys = Object.keys(links)
