const Wrapper = ({ page = {}, site = {}, children }) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <title>Add React in One Minute</title>
        </head>
        <body>{children}</body>
    </html>
);

export default Wrapper;
