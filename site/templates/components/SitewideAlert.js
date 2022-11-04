import { markdown } from "jsssg";

const SiteWideAlert = alert =>
    alert
        ? `<div class="alert alert--banner">
            <div class="alert__inner">${markdown(alert)}</div>
        </div>`
        : "";

export default SiteWideAlert;
