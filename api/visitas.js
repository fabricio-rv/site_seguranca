import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async function handler(req, res) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    });

    const propertyId = "properties/502968108";

    // Consulta visitas totais
    const [response] = await analyticsDataClient.runReport({
      property: propertyId,
      dateRanges: [{ startDate: "2025-01-01", endDate: "today" }],
      metrics: [{ name: "screenPageViews" }],
    });

    let visitas = parseInt(response.rows[0].metricValues[0].value || "0", 10);

    visitas += 5751;

    res.status(200).json({ visitas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar visitas" });
  }
}
