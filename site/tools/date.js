import moment from "moment";

export const date_sitemap = date =>
    moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

export const date = date => moment(date, "YYYY-MM-DD").format("MMM Y");

export const datefull = date =>
    moment(date, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm[:00Z]");

export const datemedium = date =>
    moment(date, "YYYY-MM-DD").format("Do MMM, YYYY");
