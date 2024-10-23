import { NextResponse } from 'next/server'
import axios from 'axios'
import { InitiativeType, InitiativeResultType } from '@/components/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const keyword = searchParams.get('keyword') || ''
  const periodoId = searchParams.get('periodoId') || '0'

  const allIniciativas: InitiativeResultType[] = []
  let totalResults = 0

  for (let grupo = 1; grupo <= 15; grupo++) {
    for (const tipo of [true, false]) {
      try {
        const response = await axios.get<InitiativeType>('http://localhost:3000/api/iniciativas', {
          params: {
            page: 1,
            grupo,
            tipo,
            perimidas: false,
            keyword,
            periodoId
          }
        })

        allIniciativas.push(...response.data.results)
        totalResults += response.data.total
      } catch (error) {
        console.error(`Error fetching data for grupo ${grupo}, tipo ${tipo}:`, error)
      }
    }
  }

  // Sort the iniciativas by fechaDeposito (most recent first)
  allIniciativas.sort((a, b) => new Date(b.fechaDeposito).getTime() - new Date(a.fechaDeposito).getTime())

  // Implement pagination
  const itemsPerPage = 20
  const pageNumber = parseInt(page, 10)
  const startIndex = (pageNumber - 1) * itemsPerPage
  const paginatedIniciativas = allIniciativas.slice(startIndex, startIndex + itemsPerPage)

  return NextResponse.json({
    results: paginatedIniciativas,
    page: pageNumber,
    pageSize: itemsPerPage,
    total: totalResults
  })
}