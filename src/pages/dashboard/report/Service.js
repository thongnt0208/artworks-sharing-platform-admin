import { axiosPrivate } from '../../../hooks/use-axios';

export async function getReportData(reportEntity, pageNumber, pageSize) {
  try {
    const response = await axiosPrivate.get("/reports", {
      params: {
        reportEntity,
        pageNumber,
        pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Report data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting report data:', error);
    return error;
  }
}
