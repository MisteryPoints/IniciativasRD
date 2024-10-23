// File: app/api/docs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const id = searchParams.get('id'); 
  const periodoId = searchParams.get('periodoId');

  const API_URL = 'https://www.diputadosrd.gob.do/sil/api/iniciativa/documentos';

  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        id,
        periodoId
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching iniciativas:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return NextResponse.json(
          { message: 'Error from external API', error: axiosError.response.data },
          { status: axiosError.response.status }
        );
      } else if (axiosError.request) {
        return NextResponse.json(
          { message: 'No response from external API' },
          { status: 503 }
        );
      } else {
        return NextResponse.json(
          { message: 'Error setting up the request' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}