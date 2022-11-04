const TweetForm = ({ url }) => {
    const twitterIcon = "";
    return `<div class="stack--small">
    <div class="tweek-link__intro">
        <p>
            <em>Thanks for reading! It would be great if you could share this post on Twitter, if you can spare the time. It really helps increase my reach, and helps me decide what sort of content to create in the future.</em>
        </p>
    </div>

    <form class="tweet-link-wrapper" id="tweet-form" action="https://twitter.com/intent/tweet?source=webclient">
        ${twitterIcon}
        <input type="textarea" name="text" value="This post by @thomashazledine was great! ${url}">
        <button id="tweet-form-submit" class="tweet-this button faux-button">Tweet</button>
    </form>
</div>`;
};

export default TweetForm;
