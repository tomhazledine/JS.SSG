import { markdown } from "jsssg";
import moment from "moment";
import Header from "./Header.js";

const DynamicBlock = ({ text }) => {
    const date = date => moment(date, "YYYY-MM-DD").format("MMM Y");

    return (
        <>
            <Header title="using header inside another component" />
            <div
                className="markdown-stuff"
                dangerouslySetInnerHTML={{ __html: markdown(text) }}
            />
            <div className="date-stuff">{date("2022-03-23")}</div>
        </>
    );
};

export default DynamicBlock;
