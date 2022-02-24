import { Onfido, Region } from "@onfido/api";
import { Service } from "typedi";

@Service()
export class OnfidoApi {
    private SANDBOX_KEY = "api_sandbox.syGM0VuloOg._sr0GAyd0YpIILQyIAq9PSL7ZxgIQq5r";

    onfido = new Onfido({
        apiToken: this.SANDBOX_KEY,
        region: Region.EU
    });
}
