const siteUrl = 'https://www.stormgatetactics.com'

const nextSiteMap = {
    siteUrl: siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/sitemap.xml`,
            `${siteUrl}/builds-sitemap.xml`,
        ]
    },
    exclude: [
        "/account", 
        "/auth/admin",
        "/auth/reset",
        "/server-sitemap.xml" 
    ],
}

module.exports = nextSiteMap