import axios from 'axios'
import { IDocument } from '../types/documents.types'
import { BASE_URL } from './base.api'

const url = BASE_URL + 'documents/'

export async function getDocuments(): Promise<IDocument[]> {
    const { data } = await axios.get(url)
    return data
}

export async function getDocument(id: number): Promise<IDocument> {
    const { data } = await axios.get(url + id)
    return data
}

export async function createDocument(document: Partial<IDocument>): Promise<void> {
    const { data } = await axios.post(url, document)
    return data
}

export async function updateDocument(id: number, document: Partial<IDocument>): Promise<IDocument> {
    const { data } = await axios.put(url + id, document)
    return data
}

export async function deleteDocument(id: number): Promise<void> {
    const { data } = await axios.delete(url + id)
    return data
}

