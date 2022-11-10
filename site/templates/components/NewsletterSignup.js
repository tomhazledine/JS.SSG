import { markdown } from "jsssg";

const NewsletterSignup = ({
    site,
    message
}) => `<script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
<div id="newsletter-signup" class="intro-note stack--small">
    ${
        message
            ? markdown(message)
            : `<h3>${site.newsletterTitle}</h3>
        <p>${site.newsletterIntro}</p>
    `
    }
    <form action="https://app.convertkit.com/forms/3039830/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="3039830" data-uid="b7d64123d3" data-format="inline" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;redirect&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;https://tomhazledine.com/newsletter/pending&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800">
        <div data-style="clean">
            <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
            <div data-element="fields" data-stacked="false" class="intro-note__form seva-fields formkit-fields">
                <div class="intro-note__form-field formkit-field"><input class="formkit-input" aria-label="What should I call you?" name="fields[first_name]" placeholder="What should I call you?" type="text"></div>
                <div class="intro-note__form-field formkit-field"><input class="formkit-input" name="email_address" aria-label="What's your email address?" placeholder="What's your email address?" required="" type="email" ></div>
                <button data-element="submit" class="button formkit-submit" >
                    <div class="formkit-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <span class="">Subscribe</span></button>
            </div>
        </div>
    </form>
</div>`;

export default NewsletterSignup;
