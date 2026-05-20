/**
 * Utility to send events to Facebook Conversions API via our internal API route.
 */
export async function sendFacebookEvent(eventName: string, userData: any = {}, customData: any = {}) {
    try {
        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: "website",
                    user_data: {
                        // Facebook recommends hashing emails/phones if they aren't already
                        ...userData,
                    },
                    custom_data: {
                        ...customData,
                    },
                },
            ],
        };

        const response = await fetch('/api/fb-capi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return await response.json();
    } catch (error) {
        console.error('Error sending Facebook event:', error);
        throw error;
    }
}
