import { test, expect } from "@playwright/test";

test.describe("Favorites", () => {
    const BASE_URL = "https://airportgap.com/api/favorites";
    const token = process.env.AUTH_TOKEN as string;

    test("POST Request - Save an airport as favorite", async ({ request }) => {
        const response = await request.post(`${BASE_URL}`, {
            data: {
                airport_id: "HND",
            },
            headers: {
                Authorization: `Bearer token=${token}`,
            },
        });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);

        expect(response.status()).toBe(201);

        expect(responseBody.data).toBeTruthy();

        const responseDataItemAirportAttributes =
            responseBody.data.attributes.airport;
        expect(responseDataItemAirportAttributes.iata).toBe("HND");

        expect(responseBody.data.id).toBeTruthy();
        expect(responseBody.data.type).toBe("favorite");
    });
});
