import { markdown } from "jsssg";

const NewsletterSignup = ({ newsletterTitle, newsletterIntro, message }) => (
    <>
        <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
        <div id="newsletter-signup" className="intro-note stack--small">
            {message ? (
                <div dangerouslySetInnerHTML={{ __html: markdown(message) }} />
            ) : (
                <>
                    <h3>{newsletterTitle}</h3>
                    <p>{newsletterIntro}</p>
                </>
            )}
            <form
                action="https://app.convertkit.com/forms/3039830/subscriptions"
                className="seva-form formkit-form"
                method="post"
                data-sv-form="3039830"
                data-uid="b7d64123d3"
                data-format="inline"
                data-version="5"
                data-options='{"settings":{"after_subscribe":{"action":"redirect","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":"https://tomhazledine.com/newsletter/pending"},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
                min-width="400 500 600 700 800"
            >
                <div data-style="clean">
                    <ul
                        className="formkit-alert formkit-alert-error"
                        data-element="errors"
                        data-group="alert"
                    ></ul>
                    <div
                        data-element="fields"
                        data-stacked="false"
                        className="intro-note__form seva-fields formkit-fields"
                    >
                        <div className="intro-note__form-field formkit-field">
                            <input
                                className="formkit-input"
                                aria-label="What should I call you?"
                                name="fields[first_name]"
                                placeholder="What should I call you?"
                                type="text"
                            />
                        </div>
                        <div className="intro-note__form-field formkit-field">
                            <input
                                className="formkit-input"
                                name="email_address"
                                aria-label="What's your email address?"
                                placeholder="What's your email address?"
                                required=""
                                type="email"
                            />
                        </div>
                        <button
                            data-element="submit"
                            className="button formkit-submit"
                        >
                            <div className="formkit-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <span className="">Subscribe</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
);

export default NewsletterSignup;
