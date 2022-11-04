// Convert numbers into human-readable words.
const convertNumberToWords = number => {
    const parsedNumber = number > 20 ? Math.ceil(number / 10) * 10 : number;
    const dictionary = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        30: "thirty",
        40: "fourty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
        100: "hundred"
    };

    return dictionary[parsedNumber];
};

const calculateReadingTime = wordCount => {
    // Predefined words-per-minute rate.
    const wordsPerMinute = 225;
    const wordsPerSecond = wordsPerMinute / 60;

    // How many minutes?
    const minutes = Math.floor(wordCount / wordsPerMinute);

    // How many seconds (remainder)?
    const secondsRemainder = Math.floor(
        (wordCount % wordsPerMinute) / wordsPerSecond
    );

    // How many seconds (total)?
    const secondsTotal = Math.floor(wordCount / wordsPerSecond);

    return {
        seconds: secondsTotal,
        minutes,
        secondsRemainder: secondsRemainder
    };
};

const parseReadTime = seconds => {
    // String to store our output.
    let stringOutput = "";

    // How many minutes?
    const minuteCount = convertNumberToWords(Math.floor(seconds / 60));

    // How many seconds?
    const minuteRemainder = seconds % 60;

    // Specific responses for a range of times up to two minutes:
    if (seconds < 30) {
        stringOutput = "hardly any time at all.";
    } else if (seconds < 50) {
        stringOutput = "less than a minute.";
    } else if (seconds < 55) {
        stringOutput = "nearly a minute.";
    } else if (seconds < 65) {
        stringOutput = "one minute dead.";
    } else if (seconds < 85) {
        stringOutput = "a minute and a bit.";
    } else if (seconds < 95) {
        stringOutput = "roughly a minute and a half.";
    } else if (seconds < 120) {
        stringOutput = "less than two minutes.";

        // Dynamic responses for a variety of times over two minutes:
    } else if (minuteRemainder < 2 || minuteRemainder > 58) {
        // If we're within +/- 2 seconds of a minute:
        stringOutput = minuteCount + " minutes, on the nose.";
    } else if (minuteRemainder > 50) {
        // If we're within less than 10 seconds short of any minute:
        stringOutput = "just shy of " + minuteCount + " minutes.";
    } else if (minuteRemainder < 10) {
        // If we're within less than 10 seconds over any minute:
        stringOutput = "a little over " + minuteCount + " minutes.";
    } else if (minuteRemainder < 15 || minuteRemainder > 45) {
        // If we're within +/- 15 seconds of any minute:
        stringOutput = "about " + minuteCount + " minutes.";
    } else if (minuteRemainder > 20 && minuteRemainder < 40) {
        // If we're within +/- 10 seconds of any half-minute:
        stringOutput = minuteCount + " and a half minutes.";
    } else if (minuteRemainder < 10 || minuteRemainder > 50) {
        stringOutput = minuteCount + " minutes (ish).";
    } else {
        stringOutput = "something like " + minuteCount + " minutes.";
    }

    return stringOutput;
};

const countWords = words => words.split(" ").length;

export const readTime = content => {
    const wordcount = countWords(content);
    const time = calculateReadingTime(wordcount);
    const result = parseReadTime(time.seconds);
    return result;
};
