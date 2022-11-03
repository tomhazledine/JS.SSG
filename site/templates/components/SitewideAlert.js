// import { render } from "../../../src/markdown.js";

// const SitewideAlert = alert =>
//     alert
//         ? `<div class="alert alert--banner">
//             <div class="alert__inner">${render(alert)}</div>
//         </div>`
//         : "";
const SitewideAlert = alert =>
    alert
        ? `<div class="alert alert--banner">
            <div class="alert__inner">${alert}</div>
        </div>`
        : "";

export default SitewideAlert;
