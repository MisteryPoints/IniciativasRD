import React, { useState } from 'react'
import Link from 'next/link';
import { FileDownIcon } from "lucide-react"
import { FadeLoader, HashLoader } from 'react-spinners';
import { DocsProps, PromoterProps, IdentifierLawType, InitiativeResultType } from './types'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"; 
import fetchDocs from './DocsFetch';
import fetchPromoter from './PromoterFetch';
import Image from 'next/image';

interface InitiativeCardProps {
    iniciativa: InitiativeResultType;
}

    
const IniciativaCard: React.FC<InitiativeCardProps> = ({ iniciativa }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(true)
  const [doc, setDoc] = useState<DocsProps>()
  const [promoter, setPromoter] = useState<PromoterProps>()
  const identifier: IdentifierLawType = {
    page: 1,
    id: iniciativa.id,
    periodoId: 0
  }
 
  const handleFetch = async () => {
    setLoading(true);
    const document = await fetchDocs(identifier); 
    const proponentes = await fetchPromoter(identifier); 
    setDoc(document);
    setPromoter(proponentes);
    setLoading(false);
  } 

  const showImage = () => {
    setShow(false);
  }

  return (
    <Dialog key={iniciativa.id} onOpenChange={() => handleFetch()}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">{iniciativa.tipo}</h2>
              <p className="text-sm text-gray-600 mt-1">{iniciativa.numero}</p>
            </div>
            
            <p className="text-gray-700 mb-6">{iniciativa.descripcion}</p>
            
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2 md:mb-0">
                <span className="mr-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {iniciativa.fechaDeposito}
                </span>
                <span className="mr-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  {iniciativa.origen}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                  {iniciativa.materia}
                </span>
              </div>
              
              <div className="flex flex-wrap">
                <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mr-2 mb-2 md:mb-0">
                  {iniciativa.condicion}
                </span>
                <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  {iniciativa.estado}
                </span>
              </div>
            </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogClose /> 
        {loading ? (
          <div className='w-full flex justify-center items-center'>
            <HashLoader
              color="#00BFFF"
              cssOverride={{}}
              loading
              size={50}
              speedMultiplier={1.2}
            />
          </div>
        ) : (
          <Accordion type="single" collapsible>
            {promoter?.results.map(p => (
              <AccordionItem key={p.legisladorId} value={p.legisladorId.toString()} >
                <AccordionTrigger>
                  <div className='flex flex-wrap items-center justify-between text-lg'>
                    <h1>Propuesto por: {p.nombres.split(' ')[0] + " " + `${p.apellidos.split(' ').length > 2 ? p.apellidos: p.apellidos.split(' ')[0]}`}</h1>   
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='w-full flex items-center justify-center rounded-lg max-h-[200px]'>
                    {show &&  
                      <div className='absolute'> 
                        <FadeLoader
                          color="#F2C464"
                          speedMultiplier={1.2} 
                        />  
                      </div>
                    }
                    <Image alt={p.legisladorId.toString()} width={300} height={100} src={`https://www.diputadosrd.gob.do/sil/api/legislador/getfoto/${p.legisladorId}?periodoId=0`}
                      className='mt-[50px]' onLoad={showImage} onLoadStart={() => setShow(true)} />
                  </div>
                  <div className='flex flex-wrap justify-center gap-24 text-sm text-gray-600 pointer-events-none'>
                    <h2 className='text-sm text-gray-700 font-bold rounded-lg p-2 bg-white opacity-75'>{p.representacion?.funcion ? p.representacion?.funcion : 'Sin Función'}</h2>  
                    <span className="ml-4 flex items-center rounded-lg p-2 bg-white opacity-75">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {p.representacion?.periodo ? p.representacion?.periodo : '2020-2024'}  
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {doc?.results.map(d => (
              <AccordionItem key={d.id} value={d.id.toString()}>
                <AccordionTrigger>
                  <div className='flex flex-wrap items-center justify-between text-lg'>
                    <h1>Documento: {d.documento}</h1>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
                    <h2 className='text-sm text-gray-700 font-bold'>{d.descripcion}</h2>
                    <span className="mr-4 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {d.cargado}
                    </span>
                    <Link href={`https://s-sil.camaradediputados.gob.do:8095/ReportesGenerales/VerDocumento?documentoId=${d.id}`} target='_blank'>
                      <Button variant="outline" size="icon">
                        <FileDownIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      )} 
      </DialogContent>
    </Dialog>
  )
}

export default IniciativaCard