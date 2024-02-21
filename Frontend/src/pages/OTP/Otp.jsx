import React, { useState } from "react";
import "./otp.css";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Otp = () => {
    const [response, setResponse] = useState("");
    const [otp, setOtp] = useState({
        val1: "",
        val2: "",
        val3: "",
        val4: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        setOtp({ ...otp, [input.name]: input.value });
    };

    const OTP = { otp: otp.val1 + otp.val2 + otp.val3 + otp.val4 };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(OTP);
            const res = await axios(`${url_api}/verify`, {
                method: "post",
                data: OTP,
            });
            setResponse(res.data);
            if (res.data.success == "true") {
                window.location = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="otp-container">
            <span className={`msg ${response.success}`}>{response.message}</span>
            <div className="section">
                <h2>OTP</h2>
                <svg
                    width="250"
                    height="200"
                    viewBox="0 0 292 208"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_1_45)">
                        <path
                            d="M152.106 208C201.536 208 241.606 167.93 241.606 118.5C241.606 69.0706 201.536 29 152.106 29C102.676 29 62.6058 69.0706 62.6058 118.5C62.6058 167.93 102.676 208 152.106 208Z"
                            fill="#C5FFFF"
                        />
                        <path
                            d="M117.144 64.4241C113.81 64.4241 111.108 67.1261 111.108 70.46V167.057C111.108 170.391 113.81 173.093 117.144 173.093H186.572C189.906 173.093 192.608 170.391 192.608 167.057V92.382L163.507 64.4241H117.144Z"
                            fill="#91E4FF"
                        />
                        <path
                            d="M192.608 92.382H169.544C166.21 92.382 163.508 89.68 163.508 86.3461V64.4241L192.608 92.382Z"
                            fill="#0CB4EA"
                        />
                        <path
                            d="M162.304 131.646C162.304 135.494 159.185 138.613 155.339 138.613H104.483C100.635 138.613 97.5186 135.494 97.5186 131.646V110.363C97.5186 106.515 100.635 103.397 104.483 103.397H155.339C159.185 103.397 162.304 106.515 162.304 110.363V131.646Z"
                            fill="#0CB4EA"
                        />
                        <path
                            d="M117.094 114.409C118.563 114.409 119.825 114.707 120.876 115.302C121.93 115.897 122.728 116.745 123.267 117.843C123.807 118.941 124.079 120.23 124.079 121.712C124.079 122.808 123.932 123.803 123.635 124.697C123.338 125.592 122.894 126.369 122.302 127.025C121.71 127.681 120.981 128.184 120.119 128.532C119.257 128.879 118.266 129.053 117.153 129.053C116.044 129.053 115.054 128.875 114.178 128.518C113.302 128.16 112.571 127.657 111.985 127.005C111.398 126.354 110.956 125.572 110.656 124.658C110.358 123.744 110.208 122.755 110.208 121.692C110.208 120.604 110.364 119.604 110.676 118.697C110.99 117.788 111.442 117.017 112.034 116.378C112.627 115.739 113.349 115.253 114.198 114.914C115.047 114.574 116.012 114.409 117.094 114.409ZM121.17 121.692C121.17 120.655 121.003 119.756 120.669 118.997C120.334 118.238 119.856 117.663 119.233 117.273C118.612 116.883 117.899 116.688 117.093 116.688C116.521 116.688 115.991 116.795 115.504 117.012C115.017 117.228 114.599 117.542 114.247 117.954C113.897 118.367 113.621 118.893 113.416 119.534C113.214 120.176 113.113 120.895 113.113 121.694C113.113 122.499 113.214 123.226 113.416 123.877C113.621 124.527 113.907 125.067 114.277 125.495C114.647 125.923 115.073 126.244 115.552 126.456C116.031 126.668 116.558 126.775 117.131 126.775C117.866 126.775 118.54 126.592 119.154 126.224C119.77 125.857 120.259 125.29 120.623 124.524C120.988 123.757 121.17 122.813 121.17 121.692Z"
                            fill="white"
                        />
                        <path
                            d="M134.976 117.018H131.846V127.306C131.846 127.898 131.713 128.338 131.45 128.625C131.187 128.912 130.844 129.054 130.425 129.054C130 129.054 129.654 128.909 129.388 128.619C129.121 128.33 128.987 127.892 128.987 127.305V117.017H125.856C125.366 117.017 125.003 116.909 124.765 116.693C124.528 116.477 124.408 116.192 124.408 115.838C124.408 115.47 124.532 115.181 124.779 114.969C125.028 114.757 125.387 114.649 125.858 114.649H134.977C135.473 114.649 135.842 114.76 136.082 114.977C136.326 115.196 136.446 115.483 136.446 115.836C136.446 116.189 136.323 116.475 136.078 116.691C135.834 116.907 135.466 117.018 134.976 117.018Z"
                            fill="white"
                        />
                        <path
                            d="M143.642 123.297H141.015V127.306C141.015 127.879 140.879 128.313 140.609 128.61C140.339 128.907 139.997 129.054 139.584 129.054C139.152 129.054 138.804 128.907 138.542 128.614C138.279 128.322 138.146 127.891 138.146 127.324V116.409C138.146 115.777 138.291 115.326 138.581 115.056C138.871 114.786 139.331 114.65 139.963 114.65H143.643C144.733 114.65 145.568 114.734 146.154 114.902C146.734 115.063 147.235 115.33 147.657 115.703C148.079 116.077 148.399 116.534 148.619 117.076C148.84 117.617 148.947 118.224 148.947 118.901C148.947 120.344 148.503 121.437 147.615 122.182C146.726 122.926 145.4 123.297 143.642 123.297ZM142.945 116.804H141.014V121.133H142.945C143.622 121.133 144.188 121.062 144.64 120.921C145.095 120.78 145.44 120.548 145.678 120.226C145.917 119.904 146.036 119.483 146.036 118.959C146.036 118.335 145.853 117.826 145.485 117.433C145.074 117.013 144.228 116.804 142.945 116.804Z"
                            fill="white"
                        />
                        <rect
                            x="233.582"
                            y="79"
                            width="10"
                            height="10"
                            rx="1"
                            transform="rotate(27.2727 233.582 79)"
                            fill="#91A3FF"
                        />
                        <circle cx="74" cy="139" r="5" fill="#FF91B9" />
                        <circle cx="79" cy="43" r="5" fill="#91E5FF" />
                        <circle cx="188" cy="203" r="5" fill="#FF9191" />
                    </g>
                    <circle cx="220" cy="15" r="5" fill="#FFC691" />
                    <circle cx="119.606" cy="5" r="5" fill="#91FFAF" />
                    <rect
                        x="250.606"
                        y="163"
                        width="10"
                        height="10"
                        rx="1"
                        fill="#E991FF"
                    />
                    <rect
                        x="274"
                        y="47.0925"
                        width="10"
                        height="10"
                        rx="1"
                        transform="rotate(-24.1576 274 47.0925)"
                        fill="#FF9191"
                    />
                    <rect
                        y="68.5666"
                        width="10"
                        height="10"
                        rx="1"
                        transform="rotate(-27.1716 0 68.5666)"
                        fill="#91A3FF"
                    />
                    <path
                        d="M33.0121 175.265L40.7499 180.821L32.0689 184.744L33.0121 175.265Z"
                        fill="#FF9191"
                    />
                    <path
                        d="M15.077 128.971L16.567 138.38L7.67356 134.966L15.077 128.971Z"
                        fill="#FD91FF"
                    />
                    <path
                        d="M286.447 120.204L287.505 129.672L278.777 125.854L286.447 120.204Z"
                        fill="#FF91BF"
                    />
                    <defs>
                        <clipPath id="clip0_1_45">
                            <rect
                                width="179"
                                height="179"
                                fill="white"
                                transform="translate(62.6058 29)"
                            />
                        </clipPath>
                    </defs>
                </svg>{" "}
                <p>Key in your verification code to regester successfully</p>
                <form onSubmit={() => handleSubmit(event)}>
                    <div id="inputs">
                        <input
                            name="val1"
                            type="text"
                            maxLength="1"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="val2"
                            type="text"
                            maxLength="1"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="val3"
                            type="text"
                            maxLength="1"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="val4"
                            type="text"
                            maxLength="1"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value="Verify" />
                </form>
            </div>
        </div>
    );
};

export default Otp;
