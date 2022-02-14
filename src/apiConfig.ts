import { Onfido, Region } from "@onfido/api";

export const SANDBOX_KEY = "";

export const onfido = new Onfido({
    apiToken: SANDBOX_KEY,
    region: Region.EU
});