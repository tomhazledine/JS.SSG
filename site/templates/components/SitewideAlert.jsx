import { markdown } from "jsssg";

const SiteWideAlert = ({ alert }) =>
    alert ? (
        <div className="alert alert--banner">
            <div
                className="alert__inner"
                dangerouslySetInnerHTML={{ __html: markdown(alert) }}
            ></div>
        </div>
    ) : (
        ""
    );

export default SiteWideAlert;
