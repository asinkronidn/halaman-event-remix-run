import GhostAdminAPI from "@tryghost/admin-api";

const ghostAdminAPI = () => {
    console.log(process.env.GHOST_BASE_URL)
    return new GhostAdminAPI({
        url: process.env.GHOST_BASE_URL,
        key: process.env.GHOST_ADMIN_KEY,
        version: "v5.0",
    })
};

export { ghostAdminAPI };