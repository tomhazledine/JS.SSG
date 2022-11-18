export default Data = () => (
    <svg
        className="pages-icon pages-icon--rugby"
        width="65"
        height="41"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <defs>
            <path
                d="M38.79 23.313c6.232-6.233 8.725-13.845 5.568-17.002-3.158-3.158-10.77-.665-17.003 5.568-6.232 6.232-8.725 13.845-5.568 17.002 3.158 3.158 10.77.665 17.003-5.568z"
                id="b"
            />
            <filter
                x="-17.8%"
                y="-17.8%"
                width="135.7%"
                height="135.7%"
                filterUnits="objectBoundingBox"
                id="a"
            >
                <feMorphology
                    radius="2.5"
                    operator="dilate"
                    in="SourceAlpha"
                    result="shadowSpreadOuter1"
                />
                <feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
                <feMorphology
                    radius="3"
                    in="SourceAlpha"
                    result="shadowInner"
                />
                <feOffset in="shadowInner" result="shadowInner" />
                <feComposite
                    in="shadowOffsetOuter1"
                    in2="shadowInner"
                    operator="out"
                    result="shadowOffsetOuter1"
                />
                <feColorMatrix
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                    in="shadowOffsetOuter1"
                />
            </filter>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <path
                className="pages-icon--stroke"
                d="M2.995 30.363l10.267-13.86 4.877 4.106 5.134-5.903 9.754 7.7 5.39-7.7 9.497 3.337L59.208 5.465"
            />
            <path
                className="pages-icon--stroke"
                d="M2.995 34.598V3.711M2.995 37.532v-2.977M61.005 37.532v-2.977M46.502 37.532v-2.977M17.498 37.532v-2.977M32 37.532v-2.977M3.038 34.598h57.967"
                stroke-linecap="square"
            />
            <use className="pages-icon--fill" filter="url(#a)" xlinkHref="#b" />
            <use className="pages-icon--stroke" xlinkHref="#b" />
            <path
                className="pages-icon--fill"
                d="M61.766 2.401l-2.079 8.7-6.128-5.143z"
            />
        </g>
    </svg>
);
