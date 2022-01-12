import React from "react";
import hcbgImage from "./Pages/img1.png";

function App() {
    return (
        <div
            class="bg_image"
            style={{
                backgroundImage: 'url('+hcbgImage+')',
                backgroundSize: "cover",
                height: "100vh",
                color: "#f5f5f5"

            }}

        ><br></br>
            <br></br>
            <h1>-------------------------------------Welcome to the Auction House "Antiquetion" !!!---------------------------------------
            <ul >
                <li><a href="/log"><p align="center"> Welcome user </p></a></li>

            </ul>
            </h1>
        </div>
    );
}

export default App;