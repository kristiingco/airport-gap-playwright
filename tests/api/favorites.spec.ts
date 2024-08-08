import { test, expect } from "@playwright/test";
import { ResponseDataItem } from "../../types";

test.describe("Favorites", () => {
    const BASE_URL = "https://airportgap.com/api/favorites";
    const token = process.env.AUTH_TOKEN as string;

    test.skip("POST Request - Save an airport as favorite", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}`, {
            data: {
                airport_id: "SFO",
            },
            headers: {
                Authorization: `Bearer token=${token}`,
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(201);

        expect(responseBody.data).toBeTruthy();

        const responseDataItemAirportAttributes =
            responseBody.data.attributes.airport;
        expect(responseDataItemAirportAttributes.iata).toBe("SFO");

        expect(responseBody.data.id).toBeTruthy();
        expect(responseBody.data.type).toBe("favorite");
    });

    test("POST Request - Airport already saved as favorite", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}`, {
            data: {
                airport_id: "NRT",
            },
            headers: {
                Authorization: `Bearer token=${token}`,
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(422);

        expect(responseBody.errors).toBeTruthy();

        const responseBodyErrors = responseBody.errors[0];

        expect(responseBodyErrors.status).toBe("422");
        expect(responseBodyErrors.title).toBe("Unable to process request");
        expect(responseBodyErrors.detail).toBe(
            "Airport This airport is already in your favorites"
        );
    });

    test("GET Request - Get favorites", async ({ request }) => {
        const response = await request.get(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer token=${token}`,
            },
        });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);

        expect(response.status()).toBe(200);

        expect(responseBody.data).toBeTruthy();

        responseBody.data.forEach((responseDataItem: ResponseDataItem) => {
            expect(responseDataItem).toBeTruthy();
            expect(responseDataItem.id).toBeTruthy();
            expect(responseDataItem.type).toBe("favorite");

            const responseDataItemAttributes = responseDataItem.attributes;
            expect(responseDataItemAttributes).toBeTruthy();
        });

        const responseBodyLinks = responseBody.links;
        expect(responseBodyLinks).toBeTruthy();
        expect(responseBodyLinks.first).toBeTruthy();
        expect(responseBodyLinks.last).toBeTruthy();
        expect(responseBodyLinks.next).toBeTruthy();
        expect(responseBodyLinks.prev).toBeTruthy();
        expect(responseBodyLinks.self).toBeTruthy();
    });
});
