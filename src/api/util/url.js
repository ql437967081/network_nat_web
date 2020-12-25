const baseUrl = '/nat';

const telnetUrl = `${baseUrl}/telnet`;
const exitUrl = `${baseUrl}/exit`;

const interfaceUrl = `${baseUrl}/interface`;

const hostnameUrl = `${baseUrl}/hostname`;

const natTranslationsUrl = `${baseUrl}/nat_translations`;

const pingUrl = `${baseUrl}/ping`;

const staticRouteUrl = `${baseUrl}/static_route`;

const staticNatUrl = `${baseUrl}/static_nat`;

const accessListUrl = `${baseUrl}/access_list`;

const dynamicNatUrl = `${baseUrl}/dynamic_nat`;

const patUrl = `${baseUrl}/pat`;

export {
    telnetUrl, exitUrl,
    interfaceUrl,
    hostnameUrl,
    natTranslationsUrl,
    pingUrl,
    staticRouteUrl,
    staticNatUrl,
    accessListUrl,
    dynamicNatUrl,
    patUrl
};
