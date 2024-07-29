import { test, expect } from "@playwright/test";

test.describe.parallel("Airports", () => {
    const BASE_URL = "https://airportgap.com/api";

    type ResponseDataItem = {
        attributes: {
            altitude: string;
            city: string;
            country: string;
            iata: string;
            icao: string;
            latitude: string;
            longitude: string;
            name: string;
            timezone: string;
        };
        id: string;
        type: string;
    };

    test("GET Request - Fetch airports", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/airports`);
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
});
