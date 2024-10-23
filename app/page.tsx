'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link' 
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Calendar, Building2, FolderOpen, User, Search, ChevronRight, ChevronLeft, Loader2 } from "lucide-react"
import { DocsProps, PromoterProps, IdentifierLawType, InitiativeResultType, GruposType, GruposPaginationState } from '@/components/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import fetchDocs from '@/components//DocsFetch'
import fetchPromoter from '@/components/PromoterFetch'
import fetchGrupos from '@/components/GruposFetch'
import { ScrollArea } from '@/components/ui/scroll-area'
import SimplifiedDescription from '@/components/simplified-description'

const IniciativaCard: React.FC<{ iniciativa: InitiativeResultType }> = ({ iniciativa }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [doc, setDoc] = useState<DocsProps>()
  const [promoter, setPromoter] = useState<PromoterProps>()
  const identifier: IdentifierLawType = {
    page: 1,
    id: iniciativa.id,
    periodoId: 0
  }
 
  const handleFetch = async () => {
    setLoading(true)
    const [document, proponentes] = await Promise.all([
      fetchDocs(identifier),
      fetchPromoter(identifier)
    ])
    setDoc(document)
    setPromoter(proponentes)
    setLoading(false)
  } 

  return (
    <Dialog onOpenChange={() => handleFetch()}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2"><SimplifiedDescription fullDescription={iniciativa.descripcion} /></h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <FileText className="w-4 h-4 mr-2" />
            <span>{iniciativa.tipo} - {iniciativa.numero}</span>
          </div>
          <div className="flex flex-wrap items-center text-xs text-muted-foreground">
            <span className="flex items-center mr-4 mb-1">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(iniciativa.fechaDeposito).toLocaleDateString()}
            </span>
            <span className="flex items-center mr-4 mb-1">
              <Building2 className="w-3 h-3 mr-1" />
              {iniciativa.origen}
            </span>
            <span className="flex items-center mb-1">
              <FolderOpen className="w-3 h-3 mr-1" />
              {iniciativa.materia}
            </span>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogClose />
        <h2 className="text-2xl font-bold mb-4"><SimplifiedDescription fullDescription={iniciativa.descripcion} /></h2>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="promoters">Proponentes</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="font-medium text-muted-foreground">Tipo</dt>
                      <dd>{iniciativa.tipo}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Número</dt>
                      <dd>{iniciativa.numero}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Fecha de Depósito</dt>
                      <dd>{new Date(iniciativa.fechaDeposito).toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Origen</dt>
                      <dd>{iniciativa.origen}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Materia</dt>
                      <dd>{iniciativa.materia}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Estado</dt>
                      <dd>{iniciativa.estado}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="promoters">
            <ScrollArea>
              <div className="grid gap-4">
                    {promoter?.results.map(p => (
                    <Card key={p.legisladorId} className='mb-2'>
                        <CardHeader className="pb-2">
                            <CardTitle>{p.nombres} {p.apellidos}</CardTitle>
                            <CardDescription>{p.representacion?.funcion || 'Sin Función'}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`https://www.diputadosrd.gob.do/sil/api/legislador/getfoto/${p.legisladorId}?periodoId=0`} />
                                <AvatarFallback>{p.nombres[0]}{p.apellidos[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                <User className="inline-block w-4 h-4 mr-1" />
                                {p.representacion?.periodo || '2020-2024'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    ))}
              </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="documents">
              <Accordion type="single" collapsible className="mx-5">
                {doc?.results.map(d => (
                  <AccordionItem key={d.id} value={d.id.toString()}>
                    <AccordionTrigger>
                      <div className='flex items-center text-lg'>
                        <FileText className="w-5 h-5 mr-2" />
                        {d.documento}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-wrap items-center justify-between text-sm text-muted-foreground'>
                        <p className='font-medium'>{d.descripcion}</p>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(d.cargado).toLocaleDateString()}
                        </span>
                        <Link href={`https://s-sil.camaradediputados.gob.do:8095/ReportesGenerales/VerDocumento?documentoId=${d.id}`} target='_blank'>
                          <Button variant="outline" size="sm">
                            Ver Documento
                          </Button>
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function EnhancedLegislativeBrowser() {
    const [grupos, setGrupos] = useState<GruposType[]>([])
    const [tipo, setTipo] = useState<boolean>(false)
    const [activeGrupo, setActiveGrupo] = useState<number | null>(null)
    const [iniciativas, setIniciativas] = useState<InitiativeResultType[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMorePages, setHasMorePages] = useState(true)
  
    const ITEMS_PER_PAGE = 10
    const MAX_PAGES_TO_FETCH = 20
  
    useEffect(() => {
      const param: GruposPaginationState = { periodoId: 0 }
      const handleFetchGrupos = async () => {
        const data = await fetchGrupos(param)
        setGrupos(data)
      }
      handleFetchGrupos()
    }, [])
  
    const fetchIniciativas = useCallback(async (page: number, isLoadingMore: boolean = false) => {
      if (isLoadingMore) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }
  
      try {
        const response = await fetch(`/api/iniciativas?page=${page}&grupo=${activeGrupo}&tipo=${tipo}&perimidas=false&keyword=${searchTerm}&periodoId=0`)
        const data = await response.json()
        
        if (isLoadingMore) {
          setIniciativas(prev => [...prev, ...data.results])
        } else {
          setIniciativas(data.results)
        }
        
        const totalPages = Math.ceil(data.total / data.pageSize)
        setTotalPages(totalPages)
        setHasMorePages(page < totalPages && page < MAX_PAGES_TO_FETCH)
      } catch (error) {
        console.error("Failed to fetch iniciativas:", error)
      } finally {
        if (isLoadingMore) {
          setIsLoadingMore(false)
        } else {
          setIsLoading(false)
        }
      }
    }, [activeGrupo, tipo, searchTerm])
  
    useEffect(() => {
      if (activeGrupo !== null) {
        setCurrentPage(1)
        fetchIniciativas(1)
      }
    }, [activeGrupo, tipo, searchTerm, fetchIniciativas])
  
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage)
      if (newPage * ITEMS_PER_PAGE > iniciativas.length && hasMorePages) {
        fetchIniciativas(Math.ceil(iniciativas.length / ITEMS_PER_PAGE) + 1, true)
      }
    }
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      setCurrentPage(1)
      fetchIniciativas(1)
    }
  
    const paginatedIniciativas = iniciativas?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Iniciativas Legislativas</h1>
  
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tipo de Iniciativa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant={!tipo ? "default" : "outline"}
                      onClick={() => {
                        setTipo(false)
                        setCurrentPage(1)
                        fetchIniciativas(1)
                      }}
                      className="justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Resolución
                    </Button>
                    <Button
                      variant={tipo ? "default" : "outline"}
                      onClick={() => {
                        setTipo(true)
                        setCurrentPage(1)
                        fetchIniciativas(1)
                      }}
                      className="justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Proyecto de Ley
                    </Button>
                  </div>
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>Grupos</CardTitle>
                </CardHeader>
                <ScrollArea className="h-[400px]">
                  <CardContent>
                    {grupos.map(grupo => ( 
                      <Button 
                        key={grupo.id} 
                        variant="ghost"
                        className={`w-full justify-start mb-2 ${activeGrupo === grupo.id ? 'bg-accent' : ''}`}
                        onClick={() => {
                          setActiveGrupo(grupo.id)
                          setCurrentPage(1)
                          fetchIniciativas(1)
                        }}
                      >   
                        {grupo.descripcion}
                      </Button> 
                    ))} 
                  </CardContent>
                </ScrollArea>
              </Card>
            </div>
          </div>
  
          <div className="lg:w-2/3">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar iniciativas..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
  
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <AnimatePresence>
                    {paginatedIniciativas?.map((iniciativa, index) => (
                      <motion.div
                        key={iniciativa.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <IniciativaCard iniciativa={iniciativa} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
  
                {iniciativas?.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                      No se encontraron iniciativas que coincidan con la búsqueda.
                    </CardContent>
                  </Card>
                )}
  
                {iniciativas?.length > 0 && (
                  <div className="mt-6 flex justify-center items-center space-x-2">
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Página {currentPage} de {Math.min(Math.ceil(iniciativas.length / ITEMS_PER_PAGE), totalPages)}
                    </span>
                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === Math.min(Math.ceil(iniciativas.length / ITEMS_PER_PAGE), totalPages) && !hasMorePages}
                      variant="outline"
                    >
                      {isLoadingMore ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Siguiente
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }