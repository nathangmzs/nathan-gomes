import { FIRST_KEY, FIRST_NAME } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    async function getData() {
        const credentials = btoa(`${FIRST_NAME}:${FIRST_KEY}`);

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${credentials}`);
        myHeaders.append("If-Modified-Since", "");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };

        try {
            const response = await fetch(
                "https://frc-api.firstinspires.org/v3.0/2024/schedule/BRBR?tournamentLevel=Qual",
                requestOptions
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            const data = result.Schedule;

            return { data: data };
        } catch (error) {
            console.error("Fetch error:", error);
            return { data: [] };
        }
    }

    return await getData();
};
