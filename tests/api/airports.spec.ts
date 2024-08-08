import { test, expect } from "@playwright/test";
import { ResponseDataItem } from "../../types";

test.describe.parallel("Airports", () => {
    const BASE_URL = "https://airportgap.com/api/airports";

    test("GET Request - Fetch airports", async ({ request }) => {
        const response = await request.get(`${BASE_URL}`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);

        expect(responseBody.data).toBeTruthy();

        responseBody.data.forEach((responseDataItem: ResponseDataItem) => {
            expect(responseDataItem).toBeTruthy();
            expect(responseDataItem.id).toBeTruthy();
            expect(responseDataItem.type).toBeTruthy();

            const responseDataItemAttributes = responseDataItem.attributes;
            expect(responseDataItemAttributes).toBeTruthy();
            expect(responseDataItemAttributes.altitude).toBeTruthy();
            expect(responseDataItemAttributes.city).toBeTruthy();
            expect(responseDataItemAttributes.country).toBeTruthy();
            expect(responseDataItemAttributes.iata).toBeTruthy();
            expect(responseDataItemAttributes.icao).toBeTruthy();
            expect(responseDataItemAttributes.latitude).toBeTruthy();
            expect(responseDataItemAttributes.longitude).toBeTruthy();
            expect(responseDataItemAttributes.name).toBeTruthy();
            expect(responseDataItemAttributes.timezone).toBeTruthy();
        });

        const responseBodyLinks = responseBody.links;
        expect(responseBodyLinks).toBeTruthy();
        expect(responseBodyLinks.first).toBeTruthy();
        expect(responseBodyLinks.last).toBeTruthy();
        expect(responseBodyLinks.next).toBeTruthy();
        expect(responseBodyLinks.prev).toBeTruthy();
        expect(responseBodyLinks.self).toBeTruthy();
    });

    test("GET Request - Get Airport by ID", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/KIX`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);

        expect(responseBody.data).toBeTruthy();

        const responseDataItemAttributes = responseBody.data.attributes;
        expect(responseDataItemAttributes).toBeTruthy();
        expect(responseDataItemAttributes.altitude).toBeTruthy();
        expect(responseDataItemAttributes.city).toBeTruthy();
        expect(responseDataItemAttributes.country).toBeTruthy();
        expect(responseDataItemAttributes.iata).toBeTruthy();
        expect(responseDataItemAttributes.icao).toBeTruthy();
        expect(responseDataItemAttributes.latitude).toBeTruthy();
        expect(responseDataItemAttributes.longitude).toBeTruthy();
        expect(responseDataItemAttributes.name).toBeTruthy();
        expect(responseDataItemAttributes.timezone).toBeTruthy();

        expect(responseBody.data.id).toBe("KIX");
        expect(responseBody.data.type).toBe("airport");
    });

    test("GET Request - No airport found", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/NON_EXISTING`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(404);

        expect(responseBody.errors).toBeTruthy();

        const responseBodyErrors = responseBody.errors[0];

        expect(responseBodyErrors.status).toBe("404");
        expect(responseBodyErrors.title).toBe("Not Found");
        expect(responseBodyErrors.detail).toBe(
            "The page you requested could not be found"
        );
    });

    test("POST Request - Calculate distances between airports", async ({
        request,
    }) => {
        const response = await request.post(`${BASE_URL}/distance`, {
            data: {
                from: "KIX",
                to: "NRT",
            },
        });
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);

        expect(responseBody.data).toBeTruthy();

        const responseDataItemAttributes = responseBody.data.attributes;

        expect(responseDataItemAttributes.from_airport).toBeTruthy();
        expect(responseDataItemAttributes.kilometers).toBeTruthy();
        expect(responseDataItemAttributes.miles).toBeTruthy();
        expect(responseDataItemAttributes.nautical_miles).toBeTruthy();
        expect(responseDataItemAttributes.to_airport).toBeTruthy();

        expect(responseBody.data.id).toBe("KIX-NRT");
        expect(responseBody.data.type).toBe("airport_distance");
    });
});
